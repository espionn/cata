import clsx from 'clsx';
import { ref } from 'tsx-vanilla';

import { IndividualSimUI } from '../../../individual_sim_ui';
import { BulkComboResult } from '../../../proto/api';
import { Gear } from '../../../proto_utils/gear';
import { TypedEvent } from '../../../typed_event';
import { formatDeltaTextElem } from '../../../utils';
import { Component } from '../../component';
import { ItemRenderer } from '../../gear_picker/gear_picker';
import Toast from '../../toast';
import { BulkTab, TopGearResult } from '../bulk_tab';

export default class BulkSimResultRenderer extends Component {
	readonly simUI: IndividualSimUI<any>;

	constructor(parent: HTMLElement, simUI: IndividualSimUI<any>, bulkSimUI: BulkTab, result: TopGearResult, baseResult: TopGearResult) {
		super(parent, 'bulk-sim-result-root');

		this.simUI = simUI;

		if (!bulkSimUI.simTalents) {
			this.rootElem.classList.add('bulk-sim-result-no-talents');
		}

		const dpsDelta = result.dps - baseResult.dps;

		const equipButtonRef = ref<HTMLButtonElement>();
		const dpsDeltaRef = ref<HTMLDivElement>();
		const itemsContainerRef = ref<HTMLDivElement>();
		this.rootElem.appendChild(
			<>
				<div className="results-sim">
					<div className="results-sim-dps damage-metrics">
						<span className="topline-result-avg">{this.formatDps(result.dps)}</span>
						<div className="results-reference">
							<span ref={dpsDeltaRef} className={clsx('results-reference-diff', dpsDelta >= 0 ? 'positive' : 'negative')} />
						</div>
					</div>
				</div>
				<div ref={itemsContainerRef} className="bulk-gear-combo" />
				<div className="bulk-results-actions">
					<button ref={equipButtonRef} className={clsx('btn btn-primary bulk-equip-btn', result.gear.equals(this.simUI.player.getGear()) && 'd-none')}>
						Equip
					</button>
				</div>
			</>,
		);

		formatDeltaTextElem(dpsDeltaRef.value!, baseResult.dps, result.dps, 2, undefined, undefined, true);

		equipButtonRef.value?.addEventListener('click', () => {
			simUI.player.setGear(TypedEvent.nextEventID(), result.gear);
			simUI.simHeader.activateTab('gear-tab');
			new Toast({
				variant: 'success',
				body: 'Batch gear equipped!',
			});
		});

		const items = (<></>) as HTMLElement;
		const originalEquipmentSpec = baseResult.gear.asSpec();
		for (const [idx, spec] of result.gear.asSpec().items.entries()) {
			const itemContainer = (<div className="bulk-result-item" />) as HTMLElement;
			const renderer = new ItemRenderer(items, itemContainer, simUI.player);
			if ((spec.id != 0) && (spec.id != originalEquipmentSpec.items[idx].id)) {
				const item = simUI.sim.db.lookupItemSpec(spec);
				renderer.update(item!);
			} else {
				renderer.clear(idx);
			}
			items.appendChild(itemContainer);
		}
		itemsContainerRef.value!.appendChild(items);
	}

	private formatDps(dps: number): string {
		return (Math.round(dps * 100) / 100).toFixed(2);
	}
}
