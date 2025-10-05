package hunter

import (
	"time"

	"github.com/wowsims/mop/sim/core"
)

var YaungolSlayersBattlegear = core.NewItemSet(core.ItemSet{
	Name:                    "Yaungol Slayer Battlegear",
	ID:                      1129,
	DisabledInChallengeMode: true,
	Bonuses: map[int32]core.ApplySetBonus{
		2: func(agent core.Agent, setBonusAura *core.Aura) {
			setBonusAura.AttachSpellMod(core.SpellModConfig{
				Kind:       core.SpellMod_DamageDone_Pct,
				ClassMask:  HunterSpellExplosiveShot,
				FloatValue: 0.05,
			})
			setBonusAura.AttachSpellMod(core.SpellModConfig{
				Kind:              core.SpellMod_DamageDone_Pct,
				ClassMask:         HunterSpellKillCommand,
				ShouldApplyToPets: true,
				FloatValue:        0.15,
			})

			setBonusAura.AttachSpellMod(core.SpellModConfig{
				Kind:       core.SpellMod_DamageDone_Pct,
				ClassMask:  HunterSpellChimeraShot,
				FloatValue: 0.15,
			})
		},
		4: func(agent core.Agent, setBonusAura *core.Aura) {
			// Stub
		},
	},
})

var SaurokStalker = core.NewItemSet(core.ItemSet{
	Name:                    "Battlegear of the Saurok Stalker",
	ID:                      1157,
	DisabledInChallengeMode: true,
	Bonuses: map[int32]core.ApplySetBonus{
		2: func(agent core.Agent, setBonusAura *core.Aura) {
			// Your Steady Shot and Cobra Shot have a chance to summon a Thunderhawk to fight for you for the next 10 sec.
			// (Approximately 1.00 procs per minute)
			hunter := agent.(HunterAgent).GetHunter()

			summonThunderhawkSpell := hunter.RegisterSpell(core.SpellConfig{
				ActionID:    core.ActionID{SpellID: 138363},
				SpellSchool: core.SpellSchoolPhysical,
				Flags:       core.SpellFlagPassiveSpell,

				ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
					for _, thunderhawk := range hunter.Thunderhawks {
						if thunderhawk.IsActive() {
							continue
						}

						thunderhawk.EnableWithTimeout(sim, thunderhawk, time.Second*10)

						return
					}

					if sim.Log != nil {
						hunter.Log(sim, "No Thunderhawks available for the T15 2pc to proc, this is unreasonable.")
					}
				},
			})

			setBonusAura.AttachProcTrigger(core.ProcTrigger{
				Callback:       core.CallbackOnSpellHitDealt,
				ClassSpellMask: HunterSpellCobraShot | HunterSpellSteadyShot,
				DPM: hunter.NewSetBonusRPPMProcManager(138365,
					setBonusAura,
					core.ProcMaskRangedSpecial,
					core.RPPMConfig{
						PPM: 1.0,
					}.WithHasteMod(),
					// According to an old PTR forum post by Ghostcrawler, the following spec mods should be active
					// but it's not in the DB (not even in the 7.3.5 db).
					// Comment: https://www.wowhead.com/mop-classic/spell=138365/item-hunter-t15-2p-bonus#comments:id=1796629
					// PPM mods: https://wago.tools/db2/SpellProcsPerMinuteMod?build=5.5.1.63538&filter%5BSpellProcsPerMinuteID%5D=exact%3A57&page=1
					// WithSpecMod(0.7, proto.Spec_SpecBeastMasteryHunter).
					// WithSpecMod(1.2, proto.Spec_SpecSurvivalHunter),
				),
				ICD: time.Millisecond * 250,

				Handler: func(sim *core.Simulation, spell *core.Spell, result *core.SpellResult) {
					summonThunderhawkSpell.Cast(sim, result.Target)
				},
			}).ExposeToAPL(138365)
		},
		4: func(agent core.Agent, setBonusAura *core.Aura) {
			// Your Arcane Shot, Multi-Shot, and Aimed Shot have a chance to trigger a Lightning Arrow at the target, dealing 100% weapon damage as Nature.
			// (Approximately 3.00 procs per minute)
			hunter := agent.(HunterAgent).GetHunter()

			lightningArrowSpell := hunter.RegisterSpell(core.SpellConfig{
				ActionID:     core.ActionID{SpellID: 138366},
				SpellSchool:  core.SpellSchoolNature,
				ProcMask:     core.ProcMaskRangedProc,
				Flags:        core.SpellFlagMeleeMetrics | core.SpellFlagRanged | core.SpellFlagPassiveSpell,
				MissileSpeed: 45,

				DamageMultiplier: 1.0,
				CritMultiplier:   hunter.DefaultCritMultiplier(),
				ThreatMultiplier: 1.0,

				ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
					wepDmg := hunter.AutoAttacks.Ranged().CalculateNormalizedWeaponDamage(sim, spell.RangedAttackPower())
					result := spell.CalcDamage(sim, target, wepDmg, spell.OutcomeRangedHitAndCrit)
					spell.WaitTravelTime(sim, func(sim *core.Simulation) {
						spell.DealDamage(sim, result)
					})
				},
			})

			setBonusAura.AttachProcTrigger(core.ProcTrigger{
				Callback:       core.CallbackOnSpellHitDealt,
				ClassSpellMask: HunterSpellArcaneShot | HunterSpellMultiShot | HunterSpellAimedShot,
				DPM: hunter.NewSetBonusRPPMProcManager(138367,
					setBonusAura,
					core.ProcMaskRangedSpecial,
					core.RPPMConfig{
						PPM: 3.0,
					}.WithHasteMod(),
				),
				ICD: time.Millisecond * 250,

				Handler: func(sim *core.Simulation, spell *core.Spell, result *core.SpellResult) {
					lightningArrowSpell.Cast(sim, result.Target)
				},
			}).ExposeToAPL(138367)
		},
	},
})

var ItemSetGladiatorsPursuit = core.NewItemSet(core.ItemSet{
	ID:   1108,
	Name: "Gladiator's Pursuit",
	Bonuses: map[int32]core.ApplySetBonus{
		2: func(_ core.Agent, setBonusAura *core.Aura) {
		},
		4: func(_ core.Agent, setBonusAura *core.Aura) {
			// Multiply focus regen 25%
			focusRegenMultiplier := 1.25
			setBonusAura.ApplyOnGain(func(aura *core.Aura, sim *core.Simulation) {
				aura.Unit.MultiplyFocusRegenSpeed(sim, focusRegenMultiplier)
			})
			setBonusAura.ApplyOnExpire(func(aura *core.Aura, sim *core.Simulation) {
				aura.Unit.MultiplyFocusRegenSpeed(sim, 1/focusRegenMultiplier)
			})
		},
	},
})

func (hunter *Hunter) addBloodthirstyGloves() {
	hunter.RegisterPvPGloveMod(
		[]int32{64991, 64709, 60424, 65544, 70534, 70260, 70441, 72369, 73717, 73583, 93495, 98821, 102737, 84841, 94453, 84409, 91577, 85020, 103220, 91224, 91225, 99848, 100320, 100683, 102934, 103417, 100123},
		core.SpellModConfig{
			ClassMask: HunterSpellExplosiveTrap | HunterSpellBlackArrow,
			Kind:      core.SpellMod_Cooldown_Flat,
			TimeValue: -time.Second * 2,
		})
}
