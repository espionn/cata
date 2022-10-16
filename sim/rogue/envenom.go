package rogue

import (
	"time"

	"github.com/wowsims/wotlk/sim/core"
	"github.com/wowsims/wotlk/sim/core/stats"
)

func (rogue *Rogue) makeEnvenom(comboPoints int32) *core.Spell {
	baseDamage := 215.0
	apRatio := 0.09 * float64(comboPoints)

	chanceToRetainStacks := []float64{0, 0.33, 0.66, 1}[rogue.Talents.MasterPoisoner]

	cost := 35.0
	refundAmount := 0.4 * float64(rogue.Talents.QuickRecovery)

	// TODO Envenom can only be cast if the target is afflicted by Deadly Poison
	//  The current rotation code doesn't handle cast failures gracefully, so this is hard to
	//  work around at the moment
	return rogue.RegisterSpell(core.SpellConfig{
		ActionID:     core.ActionID{SpellID: 57993, Tag: comboPoints},
		SpellSchool:  core.SpellSchoolNature,
		ProcMask:     core.ProcMaskMeleeMHSpecial, // not core.ProcMaskSpellDamage
		Flags:        core.SpellFlagMeleeMetrics | rogue.finisherFlags(),
		ResourceType: stats.Energy,
		BaseCost:     cost,

		Cast: core.CastConfig{
			DefaultCast: core.Cast{
				Cost: cost,
				GCD:  time.Second,
			},
			ModifyCast: func(sim *core.Simulation, spell *core.Spell, cast *core.Cast) {
				// - the aura is active even if the attack fails to land
				// - the aura is applied before the hit effect
				// See: https://github.com/where-fore/rogue-wotlk/issues/32
				rogue.EnvenomAura.Duration = time.Second * time.Duration(1+comboPoints)
				rogue.EnvenomAura.Activate(sim)
				rogue.CastModifier(sim, spell, cast)
			},
			IgnoreHaste: true,
		},

		DamageMultiplier: 1 +
			0.02*float64(rogue.Talents.FindWeakness) +
			[]float64{0.0, 0.07, 0.14, 0.2}[rogue.Talents.VilePoisons],
		CritMultiplier:   rogue.MeleeCritMultiplier(true, false),
		ThreatMultiplier: 1,

		ApplyEffects: core.ApplyEffectFuncDirectDamage(core.SpellEffect{
			BaseDamage: core.BaseDamageConfig{
				Calculator: func(sim *core.Simulation, hitEffect *core.SpellEffect, spell *core.Spell) float64 {
					dp := rogue.deadlyPoisonDots[hitEffect.Target.Index]
					// - base damage is scaled by consumed doses (<= comboPoints)
					// - apRatio is independent of consumed doses (== comboPoints)
					consumed := core.MinInt32(dp.GetStacks(), comboPoints)
					return baseDamage*float64(consumed) + apRatio*spell.MeleeAttackPower()
				},
			},
			OutcomeApplier: rogue.OutcomeFuncMeleeSpecialHitAndCrit(),
			OnSpellHitDealt: func(sim *core.Simulation, spell *core.Spell, spellEffect *core.SpellEffect) {
				if spellEffect.Landed() {
					rogue.ApplyFinisher(sim, spell)
					rogue.ApplyCutToTheChase(sim)
					if !sim.Proc(chanceToRetainStacks, "Master Poisoner") {
						dp := rogue.deadlyPoisonDots[spellEffect.Target.Index]
						if newStacks := dp.GetStacks() - comboPoints; newStacks > 0 {
							dp.SetStacks(sim, newStacks)
						} else {
							dp.Cancel(sim)
						}
					}
				} else {
					if refundAmount > 0 {
						rogue.AddEnergy(sim, spell.CurCast.Cost*refundAmount, rogue.QuickRecoveryMetrics)
					}
				}
			},
		}),
	})
}

func (rogue *Rogue) registerEnvenom() {
	rogue.EnvenomAura = rogue.RegisterAura(core.Aura{
		Label:    "Envenom",
		ActionID: core.ActionID{SpellID: 57993},
		OnGain: func(aura *core.Aura, sim *core.Simulation) {
			rogue.deadlyPoisonProcChanceBonus += 0.15
			rogue.UpdateInstantPoisonPPM(0.75)
		},
		OnExpire: func(aura *core.Aura, sim *core.Simulation) {
			rogue.deadlyPoisonProcChanceBonus -= 0.15
			rogue.UpdateInstantPoisonPPM(0.0)
		},
	})
	rogue.Envenom = [6]*core.Spell{
		nil,
		rogue.makeEnvenom(1),
		rogue.makeEnvenom(2),
		rogue.makeEnvenom(3),
		rogue.makeEnvenom(4),
		rogue.makeEnvenom(5),
	}
}
