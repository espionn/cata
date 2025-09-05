package mop

import (
	"time"

	"github.com/wowsims/mop/sim/core"
	"github.com/wowsims/mop/sim/core/proto"
	"github.com/wowsims/mop/sim/core/stats"
)

func init() {
	// Keep these in order by item ID
	// Agile Primal Diamond
	core.NewItemEffect(76884, core.ApplyMetaGemCriticalDamageEffect)
	// Burning Primal Diamond
	core.NewItemEffect(76885, core.ApplyMetaGemCriticalDamageEffect)
	// Reverberating Primal Diamond
	core.NewItemEffect(76886, core.ApplyMetaGemCriticalDamageEffect)
	// Revitalizing Primal Diamond
	core.NewItemEffect(76888, core.ApplyMetaGemCriticalDamageEffect)

	// Austere Primal Diamond
	core.NewItemEffect(76895, func(agent core.Agent, _ proto.ItemLevelState) {
		character := agent.GetCharacter()
		character.ApplyEquipScaling(stats.Armor, 1.02)
	})

	// Capacitive Primal Diamond
	// Chance on striking with a melee or ranged attack to gain Capacitance.
	// When Capacitance reaches 0 charges, you will deal a Lightning Strike to your current target for 100 Nature damage.
	// (Approximately [19.27 + Haste] procs per minute)
	core.NewItemEffect(95346, func(agent core.Agent, _ proto.ItemLevelState) {
		character := agent.GetCharacter()
		var target *core.Unit

		lightningStrike := character.RegisterSpell(core.SpellConfig{
			ActionID:    core.ActionID{SpellID: 137597},
			SpellSchool: core.SpellSchoolNature,
			ProcMask:    core.ProcMaskEmpty,
			Flags:       core.SpellFlagNoOnCastComplete,

			DamageMultiplier: 1,
			CritMultiplier:   character.DefaultCritMultiplier(),
			ThreatMultiplier: 1,

			ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
				baseDamage := character.CalcAndRollDamageRange(sim, 0.13300000131, 0.15000000596)
				apDamage := 0.75 * core.Ternary(spell.IsRanged(), spell.RangedAttackPower(), spell.MeleeAttackPower())

				outcome := core.Ternary(spell.IsRanged(), spell.OutcomeRangedHitAndCritNoBlock, spell.OutcomeMeleeSpecialNoBlockDodgeParry)
				spell.CalcAndDealDamage(sim, target, baseDamage+apDamage, outcome)
			},
		})

		capacitanceAura := character.RegisterAura(core.Aura{
			Label:     "Capacitance",
			ActionID:  core.ActionID{SpellID: 137596},
			Duration:  time.Minute * 1,
			MaxStacks: 5,
			OnStacksChange: func(aura *core.Aura, sim *core.Simulation, oldStacks int32, newStacks int32) {
				if newStacks == aura.MaxStacks {
					lightningStrike.Cast(sim, target)
					aura.SetStacks(sim, 0)
				}
			},
		})

		core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
			Name:     "Lightning Strike Charges Trigger",
			ActionID: core.ActionID{ItemID: 137595},
			Harmful:  true,
			Callback: core.CallbackOnSpellHitDealt,
			Outcome:  core.OutcomeLanded,
			DPM: character.NewRPPMProcManager(95346, false, true, core.ProcMaskMeleeOrRanged|core.ProcMaskMeleeOrMeleeProc, core.RPPMConfig{
				PPM: 19.27000045776,
			}.WithHasteMod().
				// https://wago.tools/db2/SpellProcsPerMinuteMod?build=5.5.0.60548&filter%5BSpellProcsPerMinuteID%5D=51&filter%5BType%5D=4&page=1&sort%5BParam%5D=asc
				WithSpecMod(-0.40000000596, proto.Spec_SpecProtectionPaladin).
				WithSpecMod(0.29499998689, proto.Spec_SpecRetributionPaladin).
				WithSpecMod(0.33899998665, proto.Spec_SpecArmsWarrior).
				WithSpecMod(0.25699999928, proto.Spec_SpecFuryWarrior).
				WithSpecMod(-0.40000000596, proto.Spec_SpecProtectionWarrior).
				WithSpecMod(0.72100001574, proto.Spec_SpecFeralDruid).
				WithSpecMod(-0.40000000596, proto.Spec_SpecGuardianDruid).
				WithSpecMod(-0.40000000596, proto.Spec_SpecBloodDeathKnight).
				WithSpecMod(-0.53200000525, proto.Spec_SpecFrostDeathKnight).
				WithSpecMod(-0.16200000048, proto.Spec_SpecUnholyDeathKnight).
				WithSpecMod(-0.05000000075, proto.Spec_SpecBeastMasteryHunter).
				WithSpecMod(0.10700000077, proto.Spec_SpecMarksmanshipHunter).
				WithSpecMod(-0.05000000075, proto.Spec_SpecSurvivalHunter).
				WithSpecMod(0.78899997473, proto.Spec_SpecAssassinationRogue).
				WithSpecMod(0.13600000739, proto.Spec_SpecCombatRogue).
				WithSpecMod(0.11400000006, proto.Spec_SpecSubtletyRogue).
				WithSpecMod(-0.19099999964, proto.Spec_SpecEnhancementShaman).
				WithSpecMod(-0.40000000596, proto.Spec_SpecBrewmasterMonk).
				WithSpecMod(0.0869999975, proto.Spec_SpecWindwalkerMonk),
			),
			Handler: func(sim *core.Simulation, spell *core.Spell, result *core.SpellResult) {
				target = result.Target
				capacitanceAura.Activate(sim)
				capacitanceAura.AddStack(sim)
			},
		})
	})

	// Sinister Primal Diamond
	// Courageous Primal Diamond
}
