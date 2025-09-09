import { Player } from '../../player';
import { Faction, ItemQuality } from '../../proto/common';
import i18n from '../../../i18n/config';
import { TypedEvent } from '../../typed_event';
import { Component } from '../component';
import { ContentBlock } from '../content_block';
import { IndividualSimUI } from '../../individual_sim_ui';
import { EquippedItem } from '../../proto_utils/equipped_item';

type UpgradeSummaryTotal = {
	justicePoints: number;
	honorPoints: number;
};

export const COSTS = new Map<keyof UpgradeSummaryTotal, Map<ItemQuality, number>>([
	[
		'justicePoints',
		new Map<ItemQuality, number>([
			[ItemQuality.ItemQualityRare, 750],
			[ItemQuality.ItemQualityEpic, 1000],
			[ItemQuality.ItemQualityLegendary, 1000],
		]),
	],
	[
		'honorPoints',
		new Map<ItemQuality, number>([
			[ItemQuality.ItemQualityRare, 1000],
			[ItemQuality.ItemQualityEpic, 1500],
		]),
	],
]);

export class UpgradeCostsSummary extends Component {
	private readonly simUI: IndividualSimUI<any>;
	private readonly player: Player<any>;

	private readonly container: ContentBlock;

	constructor(parent: HTMLElement, simUI: IndividualSimUI<any>, player: Player<any>) {
		super(parent, 'summary-table-root');
		this.rootElem.classList.add('hide');

		this.simUI = simUI;
		this.player = player;

		this.container = new ContentBlock(this.rootElem, 'summary-table-container', {
			header: { title: 'Remaining Upgrade Costs' },
			extraCssClasses: ['summary-table--upgrade-costs'],
		});

		TypedEvent.onAny([player.gearChangeEmitter, player.raceChangeEmitter]).on(() => this.updateTable());
	}

	private updateTable() {
		const body = <></>;
		const itemsWithUpgrade = this.player
			.getGear()
			.asArray()
			// Ensure to only pick items that have scaling options
			.filter((item): item is EquippedItem => !!(item?._item.scalingOptions && item.getMaxUpgradeCount() > 1));

		const hasUpgradeItems = !!Object.keys(itemsWithUpgrade).length;
		this.rootElem.classList[!hasUpgradeItems ? 'add' : 'remove']('hide');

		if (hasUpgradeItems) {
			const totals = itemsWithUpgrade.reduce<UpgradeSummaryTotal>(
				(acc, item) => {
					let key: keyof UpgradeSummaryTotal = 'justicePoints';
					if (item._item.name.includes("Gladiator's")) {
						key = 'honorPoints';
					}

					acc[key] += (COSTS.get(key)?.get(item._item.quality) || 0) * (item.getMaxUpgradeCount() - item.upgrade);

					return acc;
				},
				{
					justicePoints: 0,
					honorPoints: 0,
				},
			);

			Object.entries(totals).forEach(([key, points]) => {
				body.appendChild(
					<div className="summary-table-row d-flex align-items-center">
						<div className="d-flex align-items-center">
							<img
								className="gem-icon"
								src={
									key === 'justicePoints'
										? 'https://wow.zamimg.com/images/wow/icons/small/pvecurrency-justice.jpg'
										: `https://wow.zamimg.com/images/wow/icons/small/pvpcurrency-honor-${this.player.getFaction() === Faction.Horde ? 'horde' : 'alliance'}.jpg`
								}
							/>
							<div>{i18n.t(`common.currency.${key}`)}</div>
						</div>
						<div>{points}</div>
					</div>,
				);
			});

			// Replace rows in body
			this.container.bodyElement.replaceChildren(body);

			if (!this.container.headerElement) return;
			const existingResetButton = this.container.headerElement.querySelector('.summary-table-reset-button');
			const resetButton = (
				<button
					className="btn btn-sm btn-link btn-reset summary-table-reset-button"
					onclick={() => {
						const gear = this.player.getGear().withoutUpgrades(this.player.canDualWield2H());
						this.player.setGear(TypedEvent.nextEventID(), gear);
					}}>
					<i className="fas fa-times me-1"></i>
					Reset Upgrades
				</button>
			);

			if (existingResetButton) {
				this.container.headerElement.replaceChild(resetButton, existingResetButton);
			} else {
				this.container.headerElement.appendChild(resetButton);
			}
		}
	}
}
