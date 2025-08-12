import * as InputHelpers from '../../core/components/input_helpers.js';
import { Spec } from '../../core/proto/common.js';
import { ShamanImbue, ShamanSyncType } from '../../core/proto/shaman.js';
import { ActionId } from '../../core/proto_utils/action_id.js';
import i18n from '../../i18n/config.js';

// Configuration for spec-specific UI elements on the settings tab.
// These don't need to be in a separate file but it keeps things cleaner.

export const ShamanImbueOH = InputHelpers.makeSpecOptionsEnumIconInput<Spec.SpecEnhancementShaman, ShamanImbue>({
	fieldName: 'imbueOh',
	values: [
		{ value: ShamanImbue.NoImbue, tooltip: 'No Off Hand Enchant' },
		{ actionId: ActionId.fromSpellId(8232), value: ShamanImbue.WindfuryWeapon },
		{ actionId: ActionId.fromSpellId(8024), value: ShamanImbue.FlametongueWeapon },
		{ actionId: ActionId.fromSpellId(8033), value: ShamanImbue.FrostbrandWeapon },
	],
});

export const SyncTypeInput = InputHelpers.makeSpecOptionsEnumInput<Spec.SpecEnhancementShaman, ShamanSyncType>({
	fieldName: 'syncType',
	label: i18n.t('settings.other.sync_type.label'),
	labelTooltip: i18n.t('settings.other.sync_type.tooltip'),
	values: [
		{ name: i18n.t('settings.other.sync_type.values.automatic'), value: ShamanSyncType.Auto },
		{ name: i18n.t('settings.other.sync_type.values.none'), value: ShamanSyncType.NoSync },
		{ name: i18n.t('settings.other.sync_type.values.perfect_sync'), value: ShamanSyncType.SyncMainhandOffhandSwings },
		{ name: i18n.t('settings.other.sync_type.values.delayed_offhand'), value: ShamanSyncType.DelayOffhandSwings },
	],
});
