import i18n from "../../../../i18n/config";
import { Player } from "../../../player";
import { APLValueVariable } from "../../../proto/apl";
import { EventID } from "../../../typed_event";
import { randomUUID } from "../../../utils";
import { Component } from "../../component";
import { Input } from "../../input";
import { ListItemPickerConfig, ListPicker } from "../../pickers/list_picker";
import { AdaptiveStringPicker } from "../../pickers/string_picker";
import { TooltipButton } from "../../tooltip_button";
import { APLValuePicker } from "../apl_values";

export class APLVariablesListPicker extends Component {
	constructor(container: HTMLElement, player: Player<any>) {
		super(container, 'apl-variables-list-picker');

		const header = this.rootElem.appendChild(<h6>{i18n.t('rotation.apl.variables.header')}</h6>) as HTMLElement;
		new TooltipButton(header, i18n.t('rotation.apl.variables.tooltip'), ['ms-2']);

		new ListPicker<Player<any>, APLValueVariable>(this.rootElem, player, {
			extraCssClasses: ['apl-value-variables-picker'],
			itemLabel: i18n.t('rotation.apl.variables.name'),
			changedEvent: (player: Player<any>) => player.rotationChangeEmitter,
			getValue: (player: Player<any>) => player.aplRotation.valueVariables || [],
			setValue: (eventID: EventID, player: Player<any>, newValue: Array<APLValueVariable>) => {
				player.aplRotation.valueVariables = newValue;
				player.rotationChangeEmitter.emit(eventID);
			},
			newItem: () => this.createValueVariable(),
			copyItem: (oldItem: APLValueVariable) => this.copyValueVariable(oldItem),
			newItemPicker: (
				parent: HTMLElement,
				listPicker: ListPicker<Player<any>, APLValueVariable>,
				index: number,
				config: ListItemPickerConfig<Player<any>, APLValueVariable>,
			) => new APLValueVariablePicker(parent, player, listPicker, index, config),
			allowedActions: ['create', 'copy', 'delete', 'move'],
			actions: {
				create: {
					useIcon: false,
				},
			},
			inlineMenuBar: true,
		});
	}

	private createValueVariable(): APLValueVariable {
		return APLValueVariable.create({
			name: i18n.t('rotation.apl.variables.newVariableName'),
			value: undefined,
		});
	}

	private copyValueVariable(oldItem: APLValueVariable): APLValueVariable {
		return APLValueVariable.create({
			name: i18n.t('rotation.apl.variables.copyName', { variableName: oldItem.name }),
			value: oldItem.value,
		});
	}
}

class APLValueVariablePicker extends Input<Player<any>, APLValueVariable> {
	private namePicker: AdaptiveStringPicker<Player<any>>;
	private valuePicker: APLValuePicker;
	private config: ListItemPickerConfig<Player<any>, APLValueVariable>;
	public modObject: Player<any>;
	private index: number;

	constructor(
		parent: HTMLElement,
		player: Player<any>,
		listPicker: ListPicker<Player<any>, APLValueVariable>,
		index: number,
		config: ListItemPickerConfig<Player<any>, APLValueVariable>,
	) {
		super(parent, 'apl-value-variable-picker-root', player, config);
		this.config = config;
		this.modObject = player;
		this.index = index;

		// Add consistent layout styling
		this.rootElem.classList.add('d-flex', 'flex-column', 'gap-2');

		this.namePicker = new AdaptiveStringPicker(this.rootElem, player, {
			id: randomUUID(),
			label: 'Name',
			labelTooltip: 'Name of the variable (e.g., "my_dot_remains", "boss_health_pct")',
			changedEvent: (player: Player<any>) => player.rotationChangeEmitter,
			getValue: () => this.getSourceValue().name,
			setValue: (eventID: EventID, player: Player<any>, newValue: string) => {
				const sourceValue = this.getSourceValue();
				sourceValue.name = newValue;
				this.config.setValue(eventID, player, this.config.getValue(player));
			},
		});

		this.valuePicker = new APLValuePicker(this.rootElem, player, {
			id: randomUUID(),
			label: 'Value',
			labelTooltip: 'The value expression that this variable represents',
			changedEvent: (player: Player<any>) => player.rotationChangeEmitter,
			getValue: () => this.getSourceValue().value,
			setValue: (eventID: EventID, player: Player<any>, newValue: any) => {
				const sourceValue = this.getSourceValue();
				sourceValue.value = newValue;
				this.config.setValue(eventID, player, this.config.getValue(player));
			},
		});

		this.init();
	}

	getInputElem(): HTMLElement | null {
		return this.rootElem;
	}

	getInputValue(): APLValueVariable {
		return {
			name: this.namePicker.getInputValue(),
			value: this.valuePicker.getInputValue(),
		};
	}

	setInputValue(newValue: APLValueVariable) {
		this.namePicker.setInputValue(newValue.name);
		this.valuePicker.setInputValue(newValue.value);
	}
}
