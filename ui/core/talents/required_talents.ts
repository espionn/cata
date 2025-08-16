import { Spec } from '../proto/common.js';
import { classTalentsConfig } from './factory.js';
import { PlayerSpecs } from '../player_specs/index.js';

export interface RequiredTalentRows {
	requiredRows: number[];
}

export const specRequiredTalentRows: Record<Spec, RequiredTalentRows> = {
	[Spec.SpecUnknown]: { requiredRows: [] },

	// Death Knight
	[Spec.SpecBloodDeathKnight]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecFrostDeathKnight]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecUnholyDeathKnight]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Druid
	[Spec.SpecBalanceDruid]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecFeralDruid]: { requiredRows: [3, 5] },
	[Spec.SpecGuardianDruid]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecRestorationDruid]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Hunter
	[Spec.SpecBeastMasteryHunter]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecMarksmanshipHunter]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecSurvivalHunter]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Mage
	[Spec.SpecArcaneMage]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecFireMage]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecFrostMage]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Monk
	[Spec.SpecBrewmasterMonk]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecMistweaverMonk]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecWindwalkerMonk]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Paladin
	[Spec.SpecHolyPaladin]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecProtectionPaladin]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecRetributionPaladin]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Priest
	[Spec.SpecDisciplinePriest]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecHolyPriest]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecShadowPriest]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Rogue
	[Spec.SpecAssassinationRogue]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecCombatRogue]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecSubtletyRogue]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Shaman
	[Spec.SpecElementalShaman]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecEnhancementShaman]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecRestorationShaman]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Warlock
	[Spec.SpecAfflictionWarlock]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecDemonologyWarlock]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecDestructionWarlock]: { requiredRows: [0, 1, 2, 3, 4, 5] },

	// Warrior
	[Spec.SpecArmsWarrior]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecFuryWarrior]: { requiredRows: [0, 1, 2, 3, 4, 5] },
	[Spec.SpecProtectionWarrior]: { requiredRows: [0, 1, 2, 3, 4, 5] },
};

export function getRequiredTalentRows(spec: Spec): number[] {
	return specRequiredTalentRows[spec]?.requiredRows || [];
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
