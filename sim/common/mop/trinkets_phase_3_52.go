package mop

import (
	"fmt"
	"time"

	"github.com/wowsims/mop/sim/common/shared"
	"github.com/wowsims/mop/sim/core"
	"github.com/wowsims/mop/sim/core/proto"
	"github.com/wowsims/mop/sim/core/stats"
)

func init() {
	// Renataki's Soul Charm
	// Your attacks  have a chance to grant Blades of Renataki, granting 1592 Agility every 1 sec for 10 sec.  (Approximately 1.21 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95625,
		shared.ItemVersionNormal:              94512,
		shared.ItemVersionHeroic:              96369,
		shared.ItemVersionThunderforged:       95997,
		shared.ItemVersionHeroicThunderforged: 96741,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Blades of Renataki"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			statValue := core.GetItemEffectScaling(itemID, 0.44999998808, state)

			statBuffAura, aura := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				AuraLabel:            fmt.Sprintf("%s %s", label, versionLabel),
				ActionID:             core.ActionID{SpellID: 138756},
				Duration:             time.Second * 10,
				MaxStacks:            10,
				TimePerStack:         time.Second * 1,
				BonusPerStack:        stats.Stats{stats.Agility: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138737},
				StackingAuraLabel:    fmt.Sprintf("Item - Proc Stacking Agility %s", versionLabel),
				TickImmediately:      true,
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				ICD:     time.Second * 10,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskDirect|core.ProcMaskProc, core.RPPMConfig{
					PPM: 1.21000003815,
				}),
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, statBuffAura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Horridon's Last Gasp
	// Your healing spells have a chance to grant 1375 mana per 2 sec over 10 sec.  (Approximately [0.96 + Haste] procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95641,
		shared.ItemVersionNormal:              94514,
		shared.ItemVersionHeroic:              96385,
		shared.ItemVersionThunderforged:       96013,
		shared.ItemVersionHeroicThunderforged: 96757,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Horridon's Last Gasp"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			manaValue := core.GetItemEffectScaling(itemID, 0.55900001526, state)
			manaMetrics := character.NewManaMetrics(core.ActionID{SpellID: 138856})

			stackingAura := character.RegisterAura(core.Aura{
				ActionID:  core.ActionID{SpellID: 138849},
				Label:     fmt.Sprintf("Item - Proc Mana Per Time %s", versionLabel),
				Duration:  time.Second * 10,
				MaxStacks: 5,
			})

			var pa *core.PendingAction

			aura := character.RegisterAura(core.Aura{
				Label:    fmt.Sprintf("%s %s", label, versionLabel),
				ActionID: core.ActionID{SpellID: 138856},
				Duration: time.Second * 10,
				OnGain: func(aura *core.Aura, sim *core.Simulation) {
					pa = core.StartPeriodicAction(sim, core.PeriodicActionOptions{
						Period:   time.Second * 2,
						NumTicks: 5,
						OnAction: func(sim *core.Simulation) {
							if character.HasManaBar() {
								character.AddMana(sim, manaValue*float64(stackingAura.GetStacks()), manaMetrics)
							}
						},
					})
				},
				OnExpire: func(aura *core.Aura, sim *core.Simulation) {
					pa.Cancel(sim)
				},
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				ICD:     time.Second * 3,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskSpellHealing, core.RPPMConfig{
					PPM: 0.95999997854,
				}.WithHasteMod()),
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnHealDealt | core.CallbackOnPeriodicHealDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					stackingAura.Activate(sim)
					stackingAura.AddStack(sim)
					//deactivate first to cancel the active periodic pa
					aura.Deactivate(sim)
					aura.Activate(sim)
				},
			})

			character.ItemSwap.RegisterProc(itemID, triggerAura)
		})
	})

	// Wushoolay's Final Choice
	// Your harmful spells have a chance to grant Wushoolay's Lightning, granting 1592 Intellect every 1 sec for 10 sec.  (Approximately 1.21 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95669,
		shared.ItemVersionNormal:              94513,
		shared.ItemVersionHeroic:              96413,
		shared.ItemVersionThunderforged:       96041,
		shared.ItemVersionHeroicThunderforged: 96785,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Wushoolay's Final Choice"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			statValue := core.GetItemEffectScaling(itemID, 0.44999998808, state)

			statBuffAura, aura := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				AuraLabel:            fmt.Sprintf("%s %s", label, versionLabel),
				ActionID:             core.ActionID{SpellID: 138790},
				Duration:             time.Second * 10,
				MaxStacks:            10,
				TimePerStack:         time.Second * 1,
				BonusPerStack:        stats.Stats{stats.Intellect: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138786},
				StackingAuraLabel:    fmt.Sprintf("Item - Proc Stacking Intellect %s", versionLabel),
				TickImmediately:      true,
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				ICD:     time.Second * 10,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskSpellOrSpellProc, core.RPPMConfig{
					PPM: 1.21000003815,
				}),
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitDealt | core.CallbackOnPeriodicDamageDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, statBuffAura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Fabled Feather of Ji-Kun
	// Your attacks have a chance to grant Feathers of Fury, granting 1505 Strength every 1 sec for 10 sec.  (Approximately 1.21 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95726,
		shared.ItemVersionNormal:              94515,
		shared.ItemVersionHeroic:              96470,
		shared.ItemVersionThunderforged:       96098,
		shared.ItemVersionHeroicThunderforged: 96842,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Fabled Feather of Ji-Kun"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			statValue := core.GetItemEffectScaling(itemID, 0.44999998808, state)

			statBuffAura, aura := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				AuraLabel:            fmt.Sprintf("%s %s", label, versionLabel),
				ActionID:             core.ActionID{SpellID: 138790},
				Duration:             time.Second * 10,
				MaxStacks:            10,
				TimePerStack:         time.Second * 1,
				BonusPerStack:        stats.Stats{stats.Strength: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138758},
				StackingAuraLabel:    fmt.Sprintf("Item - Proc Stacking Strength %s", versionLabel),
				TickImmediately:      true,
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				ICD:     time.Second * 10,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskSpellOrSpellProc, core.RPPMConfig{
					PPM: 1.21000003815,
				}),
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitDealt | core.CallbackOnPeriodicDamageDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, statBuffAura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Delicate Vial of the Sanguinaire
	// When you dodge, you have a 4% chance to gain 963 mastery for 20s. This effect can stack up to 3 times.
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95779,
		shared.ItemVersionNormal:              94518,
		shared.ItemVersionHeroic:              96523,
		shared.ItemVersionThunderforged:       96151,
		shared.ItemVersionHeroicThunderforged: 96895,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Delicate Vial of the Sanguinaire"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()
			statValue := core.GetItemEffectScaling(itemID, 2.97000002861, state)

			aura, _ := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				Duration:             time.Second * 20,
				MaxStacks:            3,
				BonusPerStack:        stats.Stats{stats.MasteryRating: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138864},
				StackingAuraLabel:    fmt.Sprintf("Blood of Power %s", versionLabel),
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:       label,
				ProcChance: 0.04,
				Outcome:    core.OutcomeDodge,
				Callback:   core.CallbackOnSpellHitTaken,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
					aura.AddStack(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, aura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Primordius' Talisman of Rage
	// Your attacks have a chance to grant you 963 Strength for 10s. This effect can stack up to 5 times. (Approximately
	// 3.50 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95757,
		shared.ItemVersionNormal:              94519,
		shared.ItemVersionHeroic:              96501,
		shared.ItemVersionThunderforged:       96129,
		shared.ItemVersionHeroicThunderforged: 96873,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Primordius' Talisman of Rage"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()
			statValue := core.GetItemEffectScaling(itemID, 0.5189999938, state)

			aura, _ := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				Duration:             time.Second * 10,
				MaxStacks:            5,
				BonusPerStack:        stats.Stats{stats.Strength: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138870},
				StackingAuraLabel:    fmt.Sprintf("Rampage %s", versionLabel),
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskDirect|core.ProcMaskProc, core.RPPMConfig{
					PPM: 3.5,
				}),
				ICD:      time.Second * 5,
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
					aura.AddStack(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, aura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Inscribed Bag of Hydra-Spawn
	// Your heals have a chance to grant the target a shield absorbing 33446 damage, lasting 15 sec. (Approximately [1.64 + Haste] procs per minute, 17 sec cooldown)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95712,
		shared.ItemVersionNormal:              94520,
		shared.ItemVersionHeroic:              96456,
		shared.ItemVersionThunderforged:       96084,
		shared.ItemVersionHeroicThunderforged: 96828,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Inscribed Bag of Hydra-Spawn"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			shieldValue := core.GetItemEffectScaling(itemID, 9.45600032806, state)

			// TODO: For now self-shield as there is no healing Sim
			shield := character.NewDamageAbsorptionAura(core.AbsorptionAuraConfig{
				Aura: core.Aura{
					Label:    fmt.Sprintf("%s %s", label, versionLabel),
					ActionID: core.ActionID{SpellID: 140380},
					Duration: time.Second * 15,
				},
				ShieldStrengthCalculator: func(_ *core.Unit) float64 {
					return shieldValue
				},
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				ICD:     time.Second * 17,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskSpellHealing, core.RPPMConfig{
					PPM: 1.63999998569,
				}.WithHasteMod()),
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnHealDealt | core.CallbackOnPeriodicHealDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					shield.Activate(sim)
				},
			})

			character.ItemSwap.RegisterProc(itemID, triggerAura)
		})
	})

	// Ji-Kun's Rising Winds
	// Melee attacks which reduce you below 35% health cause you to instantly heal for 33493.  Cannot occur more than once every 30 sec. (30s cooldown)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95727,
		shared.ItemVersionNormal:              94527,
		shared.ItemVersionHeroic:              96471,
		shared.ItemVersionThunderforged:       96099,
		shared.ItemVersionHeroicThunderforged: 96843,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Ji-Kun's Rising Winds"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			healValue := core.GetItemEffectScaling(itemID, 13.61499977112, state)

			spell := character.RegisterSpell(core.SpellConfig{
				ActionID:    core.ActionID{SpellID: 138973},
				SpellSchool: core.SpellSchoolPhysical,
				ProcMask:    core.ProcMaskEmpty,
				Flags:       core.SpellFlagPassiveSpell,

				CritMultiplier:   character.DefaultCritMultiplier(),
				DamageMultiplier: 1,

				ApplyEffects: func(sim *core.Simulation, target *core.Unit, spell *core.Spell) {
					spell.CalcAndDealHealing(sim, target, healValue, spell.OutcomeMagicHit)
				},
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:     label,
				Harmful:  true,
				ICD:      time.Second * 30,
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitTaken,
				ExtraCondition: func(sim *core.Simulation, _ *core.Spell, _ *core.SpellResult) bool {
					return character.CurrentHealth() < 0.35
				},
				Handler: func(sim *core.Simulation, _ *core.Spell, _ *core.SpellResult) {
					spell.Cast(sim, &character.Unit)
				},
			})

			character.ItemSwap.RegisterProc(itemID, triggerAura)
		})
	})

	// Talisman of Bloodlust
	// Your attacks have a chance to grant you 963 haste for 10s. This effect can stack up to 5 times. (Approximately
	// 3.50 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95748,
		shared.ItemVersionNormal:              94522,
		shared.ItemVersionHeroic:              96492,
		shared.ItemVersionThunderforged:       96120,
		shared.ItemVersionHeroicThunderforged: 96864,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Talisman of Bloodlust"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()
			statValue := core.GetItemEffectScaling(itemID, 0.5189999938, state)

			aura, _ := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				Duration:             time.Second * 10,
				MaxStacks:            5,
				BonusPerStack:        stats.Stats{stats.HasteRating: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 138895},
				StackingAuraLabel:    fmt.Sprintf("Frenzy %s", versionLabel),
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskDirect|core.ProcMaskProc, core.RPPMConfig{
					PPM: 3.5,
				}),
				ICD:      time.Second * 5,
				Outcome:  core.OutcomeLanded,
				Callback: core.CallbackOnSpellHitDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
					aura.AddStack(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, aura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Gaze of the Twins
	// Your critical attacks have a chance to grant you 963 Critical Strike for 20s. This effect can stack up
	// to 3 times. (Approximately 0.72 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95799,
		shared.ItemVersionNormal:              94529,
		shared.ItemVersionHeroic:              96543,
		shared.ItemVersionThunderforged:       96171,
		shared.ItemVersionHeroicThunderforged: 96915,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Gaze of the Twins"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()
			statValue := core.GetItemEffectScaling(itemID, 0.96799999475, state)

			aura, _ := character.NewTemporaryStatBuffWithStacks(core.TemporaryStatBuffWithStacksConfig{
				Duration:             time.Second * 20,
				MaxStacks:            3,
				BonusPerStack:        stats.Stats{stats.CritRating: statValue},
				StackingAuraActionID: core.ActionID{SpellID: 139170},
				StackingAuraLabel:    fmt.Sprintf("Eye of Brutality %s", versionLabel),
			})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskDirect|core.ProcMaskProc, core.RPPMConfig{
					PPM: 0.72000002861,
				}.WithCritMod()),
				ICD:      time.Second * 10,
				Outcome:  core.OutcomeCrit,
				Callback: core.CallbackOnSpellHitDealt | core.CallbackOnPeriodicDamageDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					aura.Activate(sim)
					aura.AddStack(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, aura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Unerring Vision of Lei Shen
	// Your damaging spells have a chance to grant 100% critical strike chance for 4 sec.  (Approximately 0.62 procs per minute)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95814,
		shared.ItemVersionNormal:              94524,
		shared.ItemVersionHeroic:              96558,
		shared.ItemVersionThunderforged:       96186,
		shared.ItemVersionHeroicThunderforged: 96930,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Unerring Vision of Lei Shen"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()

			statBuffAura := character.NewTemporaryStatsAura(
				fmt.Sprintf("%s %s", label, versionLabel),
				core.ActionID{SpellID: 138963},
				stats.Stats{stats.PhysicalCritPercent: 100, stats.SpellCritPercent: 100},
				time.Second*4,
			)

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskDirect|core.ProcMaskProc, core.RPPMConfig{
					PPM: 0.57999998331,
				}.WithApproximateIlvlMod(1.0, 528).
					WithClassMod(-0.40000000596, int(1<<proto.Class_ClassWarlock)).
					WithSpecMod(-0.34999999404, proto.Spec_SpecBalanceDruid),
				),
				ICD:      time.Second * 3,
				Callback: core.CallbackOnSpellHitDealt | core.CallbackOnPeriodicDamageDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					statBuffAura.Activate(sim)
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, statBuffAura, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})

	// Rune of Re-Origination
	// When your attacks hit you have a chance to trigger Re-Origination.
	// Re-Origination converts the lower two values of your Critical Strike, Haste, and Mastery
	// into twice as much of the highest of those three attributes for 10 sec.
	// (Approximately 1.17 procs per minute, 10 sec cooldown)
	shared.ItemVersionMap{
		shared.ItemVersionLFR:                 95802,
		shared.ItemVersionNormal:              94532,
		shared.ItemVersionHeroic:              96546,
		shared.ItemVersionThunderforged:       96174,
		shared.ItemVersionHeroicThunderforged: 96918,
	}.RegisterAll(func(version shared.ItemVersion, itemID int32, versionLabel string) {
		label := "Rune of Re-Origination"

		core.NewItemEffect(itemID, func(agent core.Agent, state proto.ItemLevelState) {
			character := agent.GetCharacter()
			// @TODO: Old posts say that only Agility users can proc this effect
			switch {
			case character.Class == proto.Class_ClassRogue,
				character.Class == proto.Class_ClassHunter,
				character.Spec == proto.Spec_SpecFeralDruid,
				character.Spec == proto.Spec_SpecGuardianDruid,
				character.Spec == proto.Spec_SpecEnhancementShaman,
				character.Spec == proto.Spec_SpecWindwalkerMonk,
				character.Spec == proto.Spec_SpecBrewmasterMonk:
				// Don't do anything
			default:
				return
			}

			duration := time.Second * 10
			masteryRaidBuffs := character.GetExclusiveEffectCategory("MasteryRatingBuff")
			buffStats := stats.Stats{stats.CritRating: 0, stats.HasteRating: 0, stats.MasteryRating: 0}

			createStatBuffAura := func(label string, actionID core.ActionID) *core.StatBuffAura {
				return &core.StatBuffAura{
					Aura: character.RegisterAura(core.Aura{
						Label:    label,
						ActionID: actionID,
						Duration: duration,
						OnGain: func(aura *core.Aura, sim *core.Simulation) {
							character.AddStatsDynamic(sim, buffStats)
						},
						OnExpire: func(aura *core.Aura, sim *core.Simulation) {
							character.AddStatsDynamic(sim, buffStats.Invert())
						},
					}),
					BuffedStatTypes: []stats.Stat{stats.CritRating, stats.HasteRating, stats.MasteryRating},
				}
			}

			crit := createStatBuffAura("Re-Origination - Crit", core.ActionID{SpellID: 139117})
			haste := createStatBuffAura("Re-Origination - Haste", core.ActionID{SpellID: 139121})
			mastery := createStatBuffAura("Re-Origination - Mastery", core.ActionID{SpellID: 139120})

			triggerAura := core.MakeProcTriggerAura(&character.Unit, core.ProcTrigger{
				Name:    label,
				Harmful: true,
				DPM: character.NewRPPMProcManager(itemID, false, core.ProcMaskMeleeOrMeleeProc|core.ProcMaskRangedOrRangedProc, core.RPPMConfig{
					PPM: 1.10000002384,
				}.WithApproximateIlvlMod(1.0, 528)),
				ICD:      duration,
				Callback: core.CallbackOnSpellHitDealt | core.CallbackOnPeriodicDamageDealt,
				Handler: func(sim *core.Simulation, spell *core.Spell, _ *core.SpellResult) {
					mastery.Deactivate(sim)
					crit.Deactivate(sim)
					haste.Deactivate(sim)

					hasMasteryRaidBuff := masteryRaidBuffs.GetActiveAura() != nil && masteryRaidBuffs.GetActiveAura().IsActive()
					critValue := character.GetStat(stats.CritRating)
					hasteValue := character.GetStat(stats.HasteRating)
					// TODO: Confirm this actually excludes Mastery raid buffs
					// At proc time, it checks how much crit, haste, and mastery you have (yes, this is a snapshot, and does NOT include the mastery raid buff).
					// Source: http://us.battle.net/wow/en/forum/topic/7811342046?page=81#1606
					masteryValue := character.GetStat(stats.MasteryRating) + core.TernaryFloat64(hasMasteryRaidBuff, -3000, 0)

					// Determine highestStat stat with tiebreakers: Crit > Haste > Mastery
					highestStat := stats.CritRating
					highestValue := critValue
					if hasteValue > highestValue {
						highestStat = stats.HasteRating
						highestValue = hasteValue
					}
					if masteryValue > highestValue {
						highestStat = stats.MasteryRating
						highestValue = masteryValue
					}

					switch highestStat {
					case stats.CritRating:
						buffStats = stats.Stats{
							stats.CritRating:    (hasteValue + masteryValue) * 2,
							stats.HasteRating:   -hasteValue,
							stats.MasteryRating: -masteryValue,
						}
					case stats.HasteRating:
						buffStats = stats.Stats{
							stats.CritRating:    -critValue,
							stats.HasteRating:   (critValue + masteryValue) * 2,
							stats.MasteryRating: -masteryValue,
						}
					case stats.MasteryRating:
						buffStats = stats.Stats{
							stats.CritRating:    -critValue,
							stats.HasteRating:   -hasteValue,
							stats.MasteryRating: (critValue + hasteValue) * 2,
						}
					}

					switch highestStat {
					case stats.CritRating:
						crit.Activate(sim)
					case stats.HasteRating:
						haste.Activate(sim)
					case stats.MasteryRating:
						mastery.Activate(sim)
					}
				},
			})

			eligibleSlots := character.ItemSwap.EligibleSlotsForItem(itemID)
			character.AddStatProcBuff(itemID, mastery, false, eligibleSlots)
			character.AddStatProcBuff(itemID, crit, false, eligibleSlots)
			character.AddStatProcBuff(itemID, haste, false, eligibleSlots)
			character.ItemSwap.RegisterProcWithSlots(itemID, triggerAura, eligibleSlots)
		})
	})
}
