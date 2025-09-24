package affliction

import (
	"time"

	"github.com/wowsims/mop/sim/core"
	"github.com/wowsims/mop/sim/core/proto"
)

func (warlock *AfflictionWarlock) NewAPLValue(rot *core.APLRotation, config *proto.APLValue) core.APLValue {
	switch config.Value.(type) {
	case *proto.APLValue_WarlockHauntInFlight:
		return warlock.newValueWarlockHauntInFlight(rot, config.GetWarlockHauntInFlight())
	default:
		return warlock.Warlock.NewAPLValue(rot, config)
	}
}

type APLValueWarlockHauntInFlight struct {
	core.DefaultAPLValueImpl
	warlock *AfflictionWarlock
}

func (warlock *AfflictionWarlock) newValueWarlockHauntInFlight(_ *core.APLRotation, _ *proto.APLValueWarlockHauntInFlight) core.APLValue {
	return &APLValueWarlockHauntInFlight{
		warlock: warlock,
	}
}
func (value *APLValueWarlockHauntInFlight) Type() proto.APLValueType {
	return proto.APLValueType_ValueTypeBool
}
func (value *APLValueWarlockHauntInFlight) GetBool(sim *core.Simulation) bool {
	warlock := value.warlock
	return warlock.HauntImpactTime > 0 && sim.CurrentTime < warlock.HauntImpactTime
}
func (value *APLValueWarlockHauntInFlight) String() string {
	return "Warlock Haunt in Flight()"
}

func (warlock *AfflictionWarlock) NewAPLAction(rot *core.APLRotation, config *proto.APLAction) core.APLActionImpl {
	switch config.Action.(type) {
	case *proto.APLAction_WarlockNextExhaleTarget:
		return warlock.newActionNextExhaleTarget(config.GetWarlockNextExhaleTarget())
	default:
		return nil
	}
}

type APLActionNextExhaleTarget struct {
	warlock        *AfflictionWarlock
	lastExecutedAt time.Duration
}

// Execute implements core.APLActionImpl.
func (action *APLActionNextExhaleTarget) Execute(sim *core.Simulation) {
	action.lastExecutedAt = sim.CurrentTime
	if action.warlock.CurrentTarget != action.warlock.LastInhaleTarget {
		return
	}

	nextTarget := core.NewUnitReference(&proto.UnitReference{Type: proto.UnitReference_NextTarget}, &action.warlock.Unit).Get()
	if nextTarget == nil {
		return
	}

	if sim.Log != nil {
		action.warlock.Log(sim, "Changing target to %s", nextTarget.Label)
	}

	action.warlock.CurrentTarget = nextTarget
}

func (action *APLActionNextExhaleTarget) Finalize(*core.APLRotation)         {}
func (action *APLActionNextExhaleTarget) GetAPLValues() []core.APLValue      { return nil }
func (action *APLActionNextExhaleTarget) GetInnerActions() []*core.APLAction { return nil }
func (action *APLActionNextExhaleTarget) GetNextAction(sim *core.Simulation) *core.APLAction {
	return nil
}
func (action *APLActionNextExhaleTarget) PostFinalize(*core.APLRotation) {}
func (action *APLActionNextExhaleTarget) ReResolveVariableRefs(*core.APLRotation, map[string]*proto.APLValue) {
}

func (action *APLActionNextExhaleTarget) IsReady(sim *core.Simulation) bool {
	// Prevent infinite loops by only allowing this action to be performed once at each timestamp.
	return action.lastExecutedAt != sim.CurrentTime
}

// Reset implements core.APLActionImpl.
func (action *APLActionNextExhaleTarget) Reset(sim *core.Simulation) {
	action.lastExecutedAt = core.NeverExpires
}

// String implements core.APLActionImpl.
func (action *APLActionNextExhaleTarget) String() string {
	return "Changing to Next Exhale Target"
}

func (warlock *AfflictionWarlock) newActionNextExhaleTarget(config *proto.APLActionWarlockNextExhaleTarget) core.APLActionImpl {
	return &APLActionNextExhaleTarget{
		warlock:        warlock,
		lastExecutedAt: core.NeverExpires,
	}
}
