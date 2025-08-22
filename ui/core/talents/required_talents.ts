import { Spec } from '../proto/common.js';
import { classTalentsConfig } from './factory.js';
import { PlayerSpecs } from '../player_specs/index.js';
import { getSpecConfig } from '../player.js';
import { IndividualSimUIConfig } from '../individual_sim_ui.js';


export function getRequiredTalentRows(spec: Spec): number[] {
	try {
		const specConfig = getSpecConfig(spec) as IndividualSimUIConfig<Spec>;
		if (specConfig.requiredTalentRows !== undefined) {
			return specConfig.requiredTalentRows;
		}
	} catch (e) {}
	
	return [0, 1, 2, 3, 4, 5];
}

export function hasRequiredTalents(spec: Spec, talentsString: string): boolean {
	const requiredRows = getRequiredTalentRows(spec);
	const talentPoints = talentsString.split('').map(Number);

	return requiredRows.every(rowIndex => talentPoints[rowIndex] > 0);
}

export function getMissingTalentRows(spec: Spec, talentsString: string): number[] {
	const requiredRows = getRequiredTalentRows(spec);
	const talentPoints = talentsString.split('').map(Number);

	return requiredRows.filter(rowIndex => talentPoints[rowIndex] === 0);
}

export function getMissingTalentNames(spec: Spec, talentsString: string): string[] {
	const missingRows = getMissingTalentRows(spec, talentsString);
	const playerSpec = PlayerSpecs.fromProto(spec);
	const playerClass = PlayerSpecs.getPlayerClass(playerSpec);
	const talentsConfig = classTalentsConfig[playerClass.classID];

	if (!talentsConfig) {
		return missingRows.map(row => `Row ${row + 1}`);
	}

	const missingTalentNames: string[] = [];

	missingRows.forEach(rowIndex => {
		const rowTalents = talentsConfig.talents.filter(talent => talent.location.rowIdx === rowIndex);
		if (rowTalents.length > 0) {
			missingTalentNames.push(rowTalents[0].fancyName);
		}
	});

	return missingTalentNames;
}
