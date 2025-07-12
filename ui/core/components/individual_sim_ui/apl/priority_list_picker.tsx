import { Player } from "../../../player";
import { APLListItem } from "../../../proto/apl";
import { EventID } from "../../../typed_event";
import { Component } from "../../component";
import { ListItemPickerConfig, ListPicker } from "../../pickers/list_picker";
import { APLListItemPicker } from "./list_item_picker";

export class APLPriorityListPicker extends Component{
	constructor(container: HTMLElement, player: Player<any>) {
		super(container, 'apl-priority-list-picker');

		new ListPicker<Player<any>, APLListItem>(container, player, {
			extraCssClasses: ['apl-list-item-picker'],
			itemLabel: 'Action',
			changedEvent: (player: Player<any>) => player.rotationChangeEmitter,
			getValue: (player: Player<any>) => player.aplRotation.priorityList,
			setValue: (eventID: EventID, player: Player<any>, newValue: Array<APLListItem>) => {
				player.aplRotation.priorityList = newValue;
				player.rotationChangeEmitter.emit(eventID);
			},
			newItem: () =>
				APLListItem.create({
					action: {},
				}),
			copyItem: (oldItem: APLListItem) => APLListItem.clone(oldItem),
			newItemPicker: (
				parent: HTMLElement,
				_: ListPicker<Player<any>, APLListItem>,
				index: number,
				config: ListItemPickerConfig<Player<any>, APLListItem>,
			) => new APLListItemPicker(parent, player, config, index),
			allowedActions: ['create', 'copy', 'delete', 'move'],
			inlineMenuBar: true,
		});
	}
}
