import i18n from "../../../../i18n/config";
import { Player } from "../../../player";
import { APLAction, APLListItem } from "../../../proto/apl";
import { EventID } from "../../../typed_event";
import { Component } from "../../component";
import { Input } from "../../input";
import { ListItemPickerConfig, ListPicker } from "../../pickers/list_picker";
import { TooltipButton } from "../../tooltip_button";
import { APLActionPicker } from "../apl_actions";
import { APLHidePicker } from "./hide_picker";

export class APLPriorityListPicker extends Component{
	constructor(container: HTMLElement, player: Player<any>) {
		super(container, 'apl-priority-list-picker');

		const header = this.rootElem.appendChild(<h6>{i18n.t('rotation.apl.priorityList.header')}</h6>) as HTMLElement;
		new TooltipButton(header, i18n.t('rotation.apl.priorityList.tooltip'), ['ms-2']);

		new ListPicker<Player<any>, APLListItem>(this.rootElem, player, {
			extraCssClasses: ['apl-list-item-picker'],
			itemLabel: i18n.t('rotation.apl.priorityList.name'),
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

class APLListItemPicker extends Input<Player<any>, APLListItem> {
	private readonly player: Player<any>;
	private readonly hidePicker: Input<Player<any>, boolean>;
	private readonly actionPicker: APLActionPicker;

	private getItem(): APLListItem {
		return (
			this.getSourceValue() ||
			APLListItem.create({
				action: {},
			})
		);
	}

	constructor(parent: HTMLElement, player: Player<any>, config: ListItemPickerConfig<Player<any>, APLListItem>, index: number) {
		config.enableWhen = () => !this.getItem().hide;
		super(parent, 'apl-list-item-picker-root', player, config);
		this.player = player;

		const itemHeaderElem = ListPicker.getItemHeaderElem(this);
		ListPicker.makeListItemValidations(itemHeaderElem, player, player => player.getCurrentStats().rotationStats?.priorityList[index]?.validations || []);

		this.hidePicker = new APLHidePicker(itemHeaderElem, player, {
			changedEvent: () => this.player.rotationChangeEmitter,
			getValue: () => this.getItem().hide,
			setValue: (eventID: EventID, player: Player<any>, newValue: boolean) => {
				this.getItem().hide = newValue;
				this.player.rotationChangeEmitter.emit(eventID);
			},
		});

		this.actionPicker = new APLActionPicker(this.rootElem, this.player, {
			changedEvent: () => this.player.rotationChangeEmitter,
			getValue: () => this.getItem().action!,
			setValue: (eventID: EventID, player: Player<any>, newValue: APLAction) => {
				this.getItem().action = newValue;
				this.player.rotationChangeEmitter.emit(eventID);
			},
		});
		this.init();
	}

	getInputElem(): HTMLElement | null {
		return this.rootElem;
	}

	getInputValue(): APLListItem {
		const item = APLListItem.create({
			hide: this.hidePicker.getInputValue(),
			action: this.actionPicker.getInputValue(),
		});
		return item;
	}

	setInputValue(newValue: APLListItem) {
		if (!newValue) {
			return;
		}
		this.hidePicker.setInputValue(newValue.hide);
		this.actionPicker.setInputValue(newValue.action || APLAction.create());
	}
}
