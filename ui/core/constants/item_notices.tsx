import { ItemNoticeData, SetBonusNoticeData } from '../components/item_notice/item_notice';
import { Spec } from '../proto/common';
import { MISSING_ITEM_EFFECTS } from './missing_effects_auto_gen';

const WantToHelpMessage = () => <p className="mb-0">Want to help out by providing additional information? Contact us on our Discord!</p>;

export const MISSING_RANDOM_SUFFIX_WARNING = <p className="mb-0">Please select a random suffix</p>;

const MISSING_IMPLEMENTATION_WARNING = (
	<>
		<p className="fw-bold">This item effect (on-use or proc) is not implemented!</p>
		<p>We are working hard on gathering all the old resources to allow for an initial implementation.</p>
		<WantToHelpMessage />
	</>
);

const TENTATIVE_IMPLEMENTATION_WARNING = (
	<>
		<p>
			This item <span className="fw-bold">is</span> implemented, but detailed proc behavior will be confirmed on PTR.
		</p>
		<WantToHelpMessage />
	</>
);

const WILL_NOT_BE_IMPLEMENTED_WARNING = <>The equip/use effect on this item will not be implemented!</>;

const WILL_NOT_BE_IMPLEMENTED_ITEMS: number[] = [];

const TENTATIVE_IMPLEMENTATION_ITEMS: number[] = [95346, 95347, 95344];

export const ITEM_NOTICES = new Map<number, ItemNoticeData>([
	...WILL_NOT_BE_IMPLEMENTED_ITEMS.map((itemID): [number, ItemNoticeData] => [
		itemID,
		{
			[Spec.SpecUnknown]: WILL_NOT_BE_IMPLEMENTED_WARNING,
		},
	]),
	...TENTATIVE_IMPLEMENTATION_ITEMS.map((itemID): [number, ItemNoticeData] => [
		itemID,
		{
			[Spec.SpecUnknown]: TENTATIVE_IMPLEMENTATION_WARNING,
		},
	]),
	...[
		...MISSING_ITEM_EFFECTS,
		// Spark of Zandalar
		...[94526, 95654, 96026, 96398, 96770],
		// Fusion-Fire Core
		...[102295, 104463, 104712, 104961, 105210, 105459],
		// Soul Barrier
		96927,
	].map((itemID): [number, ItemNoticeData] => [
		itemID,
		{
			[Spec.SpecUnknown]: MISSING_IMPLEMENTATION_WARNING,
		},
	]),
]);

export const GENERIC_MISSING_SET_BONUS_NOTICE_DATA = new Map<number, string>([
	[2, 'Not yet implemented'],
	[4, 'Not yet implemented'],
]);

export const SET_BONUS_NOTICES = new Map<number, SetBonusNoticeData>([
	// Custom notices
]);
