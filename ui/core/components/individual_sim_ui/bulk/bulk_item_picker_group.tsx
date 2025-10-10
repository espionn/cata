import i18n from '../../../../i18n/config';
import { IndividualSimUI } from '../../../individual_sim_ui';
import { EquippedItem } from '../../../proto_utils/equipped_item';
import { ContentBlock } from '../../content_block';
import Toast from '../../toast';
import { BulkTab } from '../bulk_tab';
import BulkItemPicker from './bulk_item_picker';
import { BulkSimItemSlot, bulkSimSlotNames } from './utils';

export default class BulkItemPickerGroup extends ContentBlock {
	readonly simUI: IndividualSimUI<any>;
	readonly bulkUI: BulkTab;
	readonly bulkSlot: BulkSimItemSlot;

	readonly pickers: Map<number, BulkItemPicker> = new Map();

	constructor(parent: HTMLElement, simUI: IndividualSimUI<any>, bulkUI: BulkTab, bulkSlot: BulkSimItemSlot) {
		const slotName = bulkSimSlotNames.get(bulkSlot)!;
		super(parent, 'bulk-item-picker-group-root', { header: { title: slotName } });
		this.rootElem.classList.add(`gear-group-${slotName.split(' ').join('-')}`);
		this.simUI = simUI;
		this.bulkUI = bulkUI;
		this.bulkSlot = bulkSlot;

		this.addEmptyElement();
	}

	has(idx: number) {
		return !!this.pickers.get(idx);
	}

	add(idx: number, item: EquippedItem, silent = false) {
		if (!this.pickers.size) this.bodyElement.replaceChildren();

		// Block duplicate items from being added.
		const pickers = Array.from(this.pickers.values());
		if (
			pickers.some(
				picker => picker.item.id === item.id || (picker.item._item.limitCategory != 0 && picker.item._item.limitCategory === item._item.limitCategory),
			)
		) {
			if (!silent)
				new Toast({
					delay: 1000,
					variant: 'error',
					body: <>{i18n.t('bulk_tab.search.item_unique', { itemName: item._item.name })}</>,
				});
			return;
		}

		if (this.pickers.has(idx)) {
			const picker = this.pickers.get(idx);
			picker!.dispose();
			this.pickers.delete(idx);
		}

		this.pickers.set(idx, new BulkItemPicker(this.bodyElement, this.simUI, this.bulkUI, item, this.bulkSlot, idx));

		if (!silent)
			new Toast({
				delay: 1000,
				variant: 'success',
				body: <>{i18n.t('bulk_tab.search.item_added', { itemName: item._item.name })}</>,
			});
	}

	update(idx: number, newItem: EquippedItem) {
		const picker = this.pickers.get(idx);
		if (!picker) {
			new Toast({
				variant: 'error',
				body: 'Failed to update item, please report this issue.',
			});
			return;
		}

		picker.setItem(newItem);
	}

	remove(idx: number, silent = false) {
		const picker = this.pickers.get(idx);
		if (!picker) {
			if (!silent)
				new Toast({
					variant: 'error',
					body: 'Failed to remove item, please report this issue.',
				});
			return;
		}

		picker.dispose();
		this.pickers.delete(idx);

		if (!this.pickers.size) this.addEmptyElement();

		if (!silent)
			new Toast({
				delay: 1000,
				variant: 'success',
				body: <>{i18n.t('bulk_tab.search.item_removed', { itemName: picker.item._item.name })}</>,
			});
	}

	private addEmptyElement() {
		this.bodyElement.appendChild(<span>No items selected.</span>);
	}
}
