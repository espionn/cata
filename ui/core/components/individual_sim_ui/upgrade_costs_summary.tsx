import { Player } from '../../player.js';
import { Stat } from '../../proto/common.js';
import i18n from '../../../i18n/config';
import { IndividualSimSettings } from '../../proto/ui.js';
import { shortSecondaryStatNames } from '../../proto_utils/names.js';
import { TypedEvent } from '../../typed_event.js';
import { Component } from '../component.js';
import { ContentBlock } from '../content_block.jsx';
import { CopyButton } from '../copy_button.jsx';
import { IndividualSimUI } from '../../individual_sim_ui.jsx';
import { EquippedItem } from '../../proto_utils/equipped_item';
import { UPGRADE_JUSTICE_POINTS_COST, UPGRADE_VALOR_POINTS_COST } from '../../constants/mechanics';

type UpgradeSummaryTotal = {
	valorPoints: number;
	justicePoints: number;
};

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
			header: { title: 'Upgrade Costs Summary' },
			extraCssClasses: ['summary-table--upgrade-costs'],
		});

		player.gearChangeEmitter.on(() => this.updateTable());
	}

	private updateTable() {
		const body = <></>;
		const itemsWithUpgrade = this.player
			.getGear()
			.asArray()
			.filter((item): item is EquippedItem => !!(item?.upgrade && item.upgrade > 0));

		const totals = itemsWithUpgrade.reduce<UpgradeSummaryTotal>(
			(acc, item) => {
				switch (item._item.quality) {
					case 3:
						acc.justicePoints += item.upgrade * UPGRADE_JUSTICE_POINTS_COST;
						break;
					case 4:
					case 5:
						acc.valorPoints += item.upgrade * UPGRADE_VALOR_POINTS_COST;
						break;
					default:
						break;
				}
				return acc;
			},
			{
				valorPoints: 0,
				justicePoints: 0,
			},
		);

		const hasUpgradedItems = !!Object.keys(itemsWithUpgrade).length;
		this.rootElem.classList[!hasUpgradedItems ? 'add' : 'remove']('hide');

		if (hasUpgradedItems) {
			Object.entries(totals).forEach(([key, points]) => {
				body.appendChild(
					<div className="summary-table-row d-flex align-items-center">
						<div className="d-flex align-items-center">
							<img
								className="gem-icon"
								src={
									key === 'justicePoints'
										? 'https://wow.zamimg.com/images/wow/icons/small/pvecurrency-justice.jpg'
										: 'https://wow.zamimg.com/images/wow/icons/small/pvecurrency-valor.jpg'
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
