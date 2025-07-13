import i18n from "../../../../i18n/config";
import { Player } from "../../../player";
import { APLGroup } from "../../../proto/apl";
import { EventID } from "../../../typed_event";
import { Component } from "../../component";
import { ListItemPickerConfig, ListPicker } from "../../pickers/list_picker";
import { APLGroupEditor } from "./apl_group_editor";

export class APLGroupListPicker extends Component {
	constructor(parent: HTMLElement, player: Player<any>) {
		super(parent, 'apl-group-list-picker');

		new ListPicker<Player<any>, APLGroup>(this.rootElem, player, {
			title: i18n.t('rotation.apl.actionGroups.header'),
			titleTooltip: i18n.t('rotation.apl.actionGroups.tooltips.overview'),
			extraCssClasses: ['apl-list-item-picker', 'apl-groups-picker'],
			itemLabel: i18n.t('rotation.apl.actionGroups.name'),
			changedEvent: (player: Player<any>) => player.rotationChangeEmitter,
			getValue: (player: Player<any>) => player.aplRotation.groups || [],
			setValue: (eventID: EventID, player: Player<any>, newValue: Array<APLGroup>) => {
				player.aplRotation.groups = newValue;
				player.rotationChangeEmitter.emit(eventID);
			},
			newItem: () =>
				APLGroup.create({
					name: i18n.t('rotation.apl.actionGroups.newGroupName'),
					actions: [],
					variables: [],
				}),
			copyItem: (oldItem: APLGroup) => APLGroup.clone(oldItem),
			newItemPicker: (
				parent: HTMLElement,
				_: ListPicker<Player<any>, APLGroup>,
				index: number,
				config: ListItemPickerConfig<Player<any>, APLGroup>,
			) => new APLGroupEditor(parent, player, config),
			allowedActions: ['create', 'copy', 'delete', 'move'],
			inlineMenuBar: true,
		});
	}
}
