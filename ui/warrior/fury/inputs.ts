// Configuration for spec-specific UI elements on the settings tab.
// These don't need to be in a separate file but it keeps things cleaner.

import * as InputHelpers from '../../core/components/input_helpers.js';
import { Profession, Spec, Stat } from '../../core/proto/common.js';
import { WarriorSyncType } from '../../core/proto/warrior';
import { Stats } from '../../core/proto_utils/stats';
import i18n from '../../i18n/config.js';

export const SyncTypeInput = InputHelpers.makeSpecOptionsEnumInput<Spec.SpecFuryWarrior, WarriorSyncType>({
	fieldName: 'syncType',
	label: i18n.t('settings.other.sync_type.label'),
	labelTooltip: i18n.t('settings.other.sync_type.tooltip'),
	values: [
		{ name: i18n.t('settings.other.sync_type.values.none'), value: WarriorSyncType.WarriorNoSync },
		{ name: i18n.t('settings.other.sync_type.values.perfect_sync'), value: WarriorSyncType.WarriorSyncMainhandOffhandSwings },
	],
});

export const AssumePrepullMasteryElixir = InputHelpers.makeSpecOptionsBooleanInput<Spec.SpecFuryWarrior>({
	fieldName: 'useItemSwapBonusStats',
	label: i18n.t('settings.other.assume_prepull_mastery_elixir.label'),
	labelTooltip: i18n.t('settings.other.assume_prepull_mastery_elixir.tooltip'),
	getValue: player => player.getSpecOptions().useItemSwapBonusStats,
	setValue: (eventID, player, newVal) => {
		const newMessage = player.getSpecOptions();
		newMessage.useItemSwapBonusStats = newVal;

		const bonusStats = newVal ? new Stats().withStat(Stat.StatMasteryRating, 225 + (player.hasProfession(Profession.Alchemy) ? 40 : 0)) : new Stats();
		player.itemSwapSettings.setBonusStats(eventID, bonusStats);
		player.setSpecOptions(eventID, newMessage);
	},
});
