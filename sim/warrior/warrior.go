package warrior

import (
	"time"

	"github.com/wowsims/cata/sim/core"
	"github.com/wowsims/cata/sim/core/proto"
	"github.com/wowsims/cata/sim/core/stats"
	"github.com/wowsims/cata/sim/core/talent_trees"
)

var TalentTreeSizes = [3]int{20, 21, 20}

type WarriorInputs struct {
	StanceSnapshot bool
}

const (
	SpellFlagWhirlwindOH = core.SpellFlagAgentReserved1
	ArmsTree             = 0
	FuryTree             = 1
	ProtTree             = 2
	EnableOverpowerTag   = "EnableOverpower"
)

const SpellMaskNone int64 = 0
const (
	SpellMaskCostsRage     int64 = 1 << iota
	SpellMaskSpecialAttack       = SpellMaskCostsRage | (1 << iota) // All special attacks have a rage cost

	// Baseline abilities that don't cost rage and aren't attacks
	SpellMaskBattleShout int64 = 1 << iota
	SpellMaskBerserkerRage
	SpellMaskCommandingShout
	SpellMaskRecklessness
	SpellMaskShieldWall

	// Baseline abilities that cost rage but aren't attacks
	SpellMaskDemoShout int64 = 1<<iota | SpellMaskCostsRage
	SpellMaskInnerRage
	SpellMaskShieldBlock

	// Baseline special attacks
	SpellMaskCleave int64 = 1<<iota | SpellMaskSpecialAttack
	SpellMaskColossusSmash
	SpellMaskExecute
	SpellMaskHeroicStrike
	SpellMaskOverpower
	SpellMaskRend
	SpellMaskRevenge
	SpellMaskShatteringThrow
	SpellMaskSlam
	SpellMaskSunderArmor
	SpellMaskThunderClap
	SpellMaskWhirlwind

	// Next available bit for spec implementations to start their own mask lists on
	SpellMaskSpecStartIndex int64 = iota
)

type Warrior struct {
	core.Character

	Talents *proto.WarriorTalents

	WarriorInputs

	// Current state
	Stance                 Stance
	EnrageEffectMultiplier float64
	CriticalBlockChance    float64 // Can be gained as non-prot via certain talents and spells
	SpecialAttackModList   int64
	RageAbilitiesList      int64

	BattleShout     *core.Spell
	CommandingShout *core.Spell
	BattleStance    *core.Spell
	DefensiveStance *core.Spell
	BerserkerStance *core.Spell

	BerserkerRage     *core.Spell
	DemoralizingShout *core.Spell
	Execute           *core.Spell
	Overpower         *core.Spell
	Rend              *core.Spell
	Revenge           *core.Spell
	ShieldBlock       *core.Spell
	Slam              *core.Spell
	SunderArmor       *core.Spell
	ThunderClap       *core.Spell
	Whirlwind         *core.Spell
	DeepWounds        *core.Spell

	hsCleaveCD   *core.Timer
	HeroicStrike *core.Spell
	Cleave       *core.Spell

	BattleStanceAura    *core.Aura
	DefensiveStanceAura *core.Aura
	BerserkerStanceAura *core.Aura

	BerserkerRageAura *core.Aura
	BloodsurgeAura    *core.Aura
	SuddenDeathAura   *core.Aura
	ShieldBlockAura   *core.Aura
	ThunderstruckAura *core.Aura
	InnerRageAura     *core.Aura

	DemoralizingShoutAuras core.AuraArray
	SunderArmorAuras       core.AuraArray
	ThunderClapAuras       core.AuraArray
	ColossusSmashAuras     core.AuraArray
}

func (warrior *Warrior) GetCharacter() *core.Character {
	return &warrior.Character
}

func (warrior *Warrior) AddRaidBuffs(raidBuffs *proto.RaidBuffs) {
	if warrior.Talents.Rampage {
		raidBuffs.Rampage = true
	}
}

func (warrior *Warrior) AddPartyBuffs(_ *proto.PartyBuffs) {
}

func (warrior *Warrior) Initialize() {
	warrior.registerStances()
	warrior.EnrageEffectMultiplier = 1.0
	warrior.hsCleaveCD = warrior.NewTimer()
	warrior.ReactionTime = time.Millisecond * 500

	warrior.RegisterBerserkerRageSpell()
	warrior.RegisterColossusSmash()
	warrior.RegisterDemoralizingShoutSpell()
	warrior.RegisterExecuteSpell()
	warrior.RegisterHeroicStrikeSpell()
	warrior.RegisterCleaveSpell()
	warrior.RegisterHeroicThrow()
	warrior.RegisterInnerRage()
	warrior.RegisterOverpowerSpell()
	warrior.RegisterRecklessnessCD()
	warrior.RegisterRendSpell()
	warrior.RegisterRevengeSpell()
	warrior.RegisterShatteringThrowCD()
	warrior.RegisterShieldBlockCD()
	warrior.RegisterShieldWallCD()
	warrior.RegisterShouts()
	warrior.RegisterSlamSpell()
	warrior.RegisterSunderArmor()
	warrior.RegisterThunderClapSpell()
	warrior.RegisterWhirlwindSpell()

	warrior.ApplyGlyphs()
}

func (warrior *Warrior) Reset(_ *core.Simulation) {
}

func NewWarrior(character *core.Character, talents string, inputs WarriorInputs) *Warrior {
	warrior := &Warrior{
		Character:     *character,
		Talents:       &proto.WarriorTalents{},
		WarriorInputs: inputs,
	}
	core.FillTalentsProto(warrior.Talents.ProtoReflect(), talents, TalentTreeSizes)
	warrior.FillTalentsData(talent_trees.WarriorTalentsConfig, talents)

	warrior.PseudoStats.CanParry = true

	warrior.AddStatDependency(stats.Agility, stats.MeleeCrit, core.CritPerAgiMaxLevel[character.Class]*core.CritRatingPerCritChance)
	warrior.AddStatDependency(stats.Agility, stats.Dodge, core.DodgeRatingPerDodgeChance/84.746)
	warrior.AddStatDependency(stats.Strength, stats.AttackPower, 2)
	warrior.AddStatDependency(stats.Strength, stats.BlockValue, .5) // 50% block from str
	warrior.AddStatDependency(stats.BonusArmor, stats.Armor, 1)

	// Base dodge unaffected by Diminishing Returns
	warrior.PseudoStats.BaseDodge += 0.03664
	warrior.PseudoStats.BaseParry += 0.05

	return warrior
}

func (warrior *Warrior) HasPrimeGlyph(glyph proto.WarriorPrimeGlyph) bool {
	return warrior.HasGlyph(int32(glyph))
}

func (warrior *Warrior) HasMajorGlyph(glyph proto.WarriorMajorGlyph) bool {
	return warrior.HasGlyph(int32(glyph))
}

func (warrior *Warrior) HasMinorGlyph(glyph proto.WarriorMinorGlyph) bool {
	return warrior.HasGlyph(int32(glyph))
}

func (warrior *Warrior) IntensifyRageCooldown(baseCd time.Duration) time.Duration {
	baseCd /= 100
	return []time.Duration{baseCd * 100, baseCd * 90, baseCd * 80}[warrior.Talents.IntensifyRage]
}

// Agent is a generic way to access underlying warrior on any of the agents.
type WarriorAgent interface {
	GetWarrior() *Warrior
}
