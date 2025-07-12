import { Player } from '../../player';
import { APLGroup, APLListItem, APLPrepullAction, APLValueVariable } from '../../proto/apl';
import { SimUI } from '../../sim_ui';
import { TypedEvent } from '../../typed_event';
import { Component } from '../component';
import { ListPicker } from '../pickers/list_picker';

export class APLRotationTabs extends Component {
	private activeTab = 'priority-list';
	private tabs: Map<string, HTMLElement> = new Map();
	private tabButtons: Map<string, HTMLElement> = new Map();
	private modPlayer: Player<any>;
	private priorityListPicker: ListPicker<Player<any>, APLListItem> | null = null;
	private prepullListPicker: ListPicker<Player<any>, APLPrepullAction> | null = null;
	private groupsListPicker: ListPicker<Player<any>, APLGroup> | null = null;
	private variablesListPicker: ListPicker<Player<any>, APLValueVariable> | null = null;

	constructor(parent: HTMLElement, simUI: SimUI, modPlayer: Player<any>) {
		super(parent, 'apl-rotation-tabs-root');
		this.modPlayer = modPlayer;

		this.createTabStructure();
		this.showTab('priority-list');
	}

	private createTabStructure() {
		// Create tab navigation
		const tabNav = document.createElement('ul');
		tabNav.className = 'nav nav-tabs apl-rotation-nav-tabs';
		tabNav.setAttribute('role', 'tablist');
		this.rootElem.appendChild(tabNav);

		// Create tab content container
		const tabContent = document.createElement('div');
		tabContent.className = 'tab-content apl-rotation-tab-content';
		this.rootElem.appendChild(tabContent);

		// Define tab structure
		const tabConfig = [
			{ id: 'priority-list', label: 'Priority List', icon: 'fa-list-ol' },
			{ id: 'prepull', label: 'Prepull', icon: 'fa-clock' },
			{ id: 'groups', label: 'Action Groups', icon: 'fa-layer-group' },
			{ id: 'variables', label: 'Variables', icon: 'fa-code' },
		];

		// Create tab buttons and content areas
		tabConfig.forEach(tab => {
			// Create tab button
			const tabButton = document.createElement('li');
			tabButton.className = 'nav-item';
			tabButton.setAttribute('role', 'presentation');

			const tabLink = document.createElement('button');
			tabLink.className = 'nav-link';
			tabLink.setAttribute('type', 'button');
			tabLink.setAttribute('role', 'tab');
			tabLink.setAttribute('aria-controls', `${tab.id}-tab-pane`);
			tabLink.setAttribute('aria-selected', 'false');
			tabLink.innerHTML = `<i class="fas ${tab.icon}"></i> ${tab.label}`;

			tabLink.addEventListener('click', () => this.showTab(tab.id));

			tabButton.appendChild(tabLink);
			tabNav.appendChild(tabButton);
			this.tabButtons.set(tab.id, tabLink);

			// Create tab content area
			const tabPane = document.createElement('div');
			tabPane.className = 'tab-pane fade';
			tabPane.id = `${tab.id}-tab-pane`;
			tabPane.setAttribute('role', 'tabpanel');
			tabPane.setAttribute('aria-labelledby', `${tab.id}-tab`);
			tabContent.appendChild(tabPane);
			this.tabs.set(tab.id, tabPane);
		});

		// Create floating new button container that will be positioned in the tab bar
		const newButtonContainer = document.createElement('div');
		newButtonContainer.className = 'apl-tab-new-button-container';
		tabNav.appendChild(newButtonContainer);
	}

	private showTab(tabId: string) {
		// Update button states
		this.tabButtons.forEach((button, id) => {
			if (id === tabId) {
				button.classList.add('active');
				button.setAttribute('aria-selected', 'true');
			} else {
				button.classList.remove('active');
				button.setAttribute('aria-selected', 'false');
			}
		});

		// Update content visibility
		this.tabs.forEach((tab, id) => {
			if (id === tabId) {
				tab.classList.add('show', 'active');
			} else {
				tab.classList.remove('show', 'active');
			}
		});

		// Update the new button in the tab bar
		this.updateNewButton(tabId);

		this.activeTab = tabId;
	}

	private updateNewButton(tabId: string) {
		const buttonContainer = this.rootElem.querySelector('.apl-tab-new-button-container') as HTMLElement;
		if (!buttonContainer) return;

		// Clear existing button
		buttonContainer.innerHTML = '';

		// Get the new button configuration for this tab
		const buttonConfig = this.getNewButtonConfig(tabId);
		if (buttonConfig) {
			const newButton = document.createElement('button');
			newButton.className = 'btn btn-primary apl-tab-new-button';
			newButton.textContent = buttonConfig.text;
			newButton.addEventListener('click', buttonConfig.callback);
			buttonContainer.appendChild(newButton);
		}
	}

	private getNewButtonConfig(tabId: string): { text: string; callback: () => void } | null {
		switch (tabId) {
			case 'priority-list':
				return {
					text: 'New Action',
					callback: () => this.addNewPriorityListItem(),
				};
			case 'prepull':
				return {
					text: 'New Prepull Action',
					callback: () => this.addNewPrepullAction(),
				};
			case 'groups':
				return {
					text: 'New Group',
					callback: () => this.addNewGroup(),
				};
			case 'variables':
				return {
					text: 'New Variable',
					callback: () => this.addNewVariable(),
				};
			default:
				return null;
		}
	}

	private addNewPriorityListItem() {
		if (this.priorityListPicker) {
			const newItem = this.priorityListPicker.config.newItem();
			const newList = this.priorityListPicker.config.getValue(this.priorityListPicker.modObject).concat([newItem]);
			this.priorityListPicker.config.setValue(TypedEvent.nextEventID(), this.priorityListPicker.modObject, newList);
		}
	}

	private addNewPrepullAction() {
		if (this.prepullListPicker) {
			const newItem = this.prepullListPicker.config.newItem();
			const newList = this.prepullListPicker.config.getValue(this.prepullListPicker.modObject).concat([newItem]);
			this.prepullListPicker.config.setValue(TypedEvent.nextEventID(), this.prepullListPicker.modObject, newList);
		}
	}

	private addNewGroup() {
		if (this.groupsListPicker) {
			const newItem = this.groupsListPicker.config.newItem();
			const newList = this.groupsListPicker.config.getValue(this.groupsListPicker.modObject).concat([newItem]);
			this.groupsListPicker.config.setValue(TypedEvent.nextEventID(), this.groupsListPicker.modObject, newList);
		}
	}

	private addNewVariable() {
		// if (this.variablesListPicker) {
		// 	const newItem = this.createValueVariable();
		// 	const newList = this.variablesListPicker.config.getValue(this.variablesListPicker.modObject).concat([newItem]);
		// 	this.variablesListPicker.config.setValue(TypedEvent.nextEventID(), this.variablesListPicker.modObject, newList);
		// }
	}
}



