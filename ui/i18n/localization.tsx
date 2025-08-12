import { PlayerClass } from '../core/player_class';
import { PlayerSpec } from '../core/player_spec';
import { MobType, PseudoStat, Race, Profession, SpellSchool, Stat } from '../core/proto/common';
import i18n from './config';
import { getClassI18nKey, getMobTypeI18nKey, getRaceI18nKey, getProfessionI18nKey, getSpecI18nKey, getTargetInputI18nKey, pseudoStatI18nKeys, spellSchoolI18nKeys, statI18nKeys } from './entity_mapping';
import { getLang, setLang, supportedLanguages } from './locale_service';

/**
 * Entity translation functions
 */

export const translateStat = (stat: Stat): string => {
	try {
		const key = statI18nKeys[stat] || Stat[stat].toLowerCase();
		const translated = i18n.t(`common.stats.${key}`);
		if (translated === `common.stats.${key}`) {
			return Stat[stat];
		}
		return translated;
	} catch {
		return Stat[stat];
	}
};

export const translatePseudoStat = (pseudoStat: PseudoStat): string => {
	try {
		const key = pseudoStatI18nKeys[pseudoStat] || PseudoStat[pseudoStat].toLowerCase();
		const translated = i18n.t(`common.stats.${key}`);
		if (translated === `common.stats.${key}`) {
			return PseudoStat[pseudoStat];
		}
		return translated;
	} catch {
		return PseudoStat[pseudoStat];
	}
};

export const translateTargetInput = (label: string): string => {
	try {
		const key = getTargetInputI18nKey(label);
		const translated = i18n.t(`settings.encounter.target_inputs.${key}.label`);
		if (translated === `settings.encounter.target_inputs.${key}.label`) {
			return label;
		}
		return translated;
	} catch {
		return label;
	}
};

export const translateTargetInputTooltip = (tooltip: string): string => {
	try {
		const key = getTargetInputI18nKey(tooltip);
		const translated = i18n.t(`settings.encounter.target_inputs.${key}.tooltip`);
		if (translated === `settings.encounter.target_inputs.${key}.tooltip`) {
			return tooltip;
		}
		return translated;
	} catch {
		return tooltip;
	}
};

export const translateSpellSchool = (spellSchool: SpellSchool): string => {
	try {
		const key = spellSchoolI18nKeys[spellSchool] || SpellSchool[spellSchool].toLowerCase();
		const translated = i18n.t(`common.spell_schools.${key}`);
		if (translated === `common.spell_schools.${key}`) {
			return SpellSchool[spellSchool];
		}
		return translated;
	} catch {
		return SpellSchool[spellSchool];
	}
};

export const translateMobType = (mobType: MobType): string => {
	try {
		const key = getMobTypeI18nKey(mobType);
		const translated = i18n.t(`common.mob_types.${key}`);
		if (translated === `common.mob_types.${key}`) {
			return MobType[mobType];
		}
		return translated;
	} catch {
		return MobType[mobType];
	}
};

export const translateRace = (race: Race): string => {
	try {
		const key = getRaceI18nKey(race);
		const translated = i18n.t(`common.races.${key}`);
		if (translated === `common.races.${key}`) {
			return Race[race];
		}
		return translated;
	} catch {
		return Race[race];
	}
};

export const translateProfession = (profession: Profession): string => {
	try {
		const key = getProfessionI18nKey(profession);
		const translated = i18n.t(`common.professions.${key}`);
		if (translated === `common.professions.${key}`) {
			return Profession[profession];
		}
		return translated;
	} catch {
		return Profession[profession];
	}
};

export const translateClass = (className: string): string => {
	try {
		const normalizedClassName = className.toLowerCase().replace(/_/g, '');
		const i18nKey = normalizedClassName === 'deathknight' ? 'death_knight' : normalizedClassName;
		const translated = i18n.t(`common.classes.${i18nKey}`);
		if (translated === `common.classes.${i18nKey}`) {
			return className;
		}
		return translated;
	} catch {
		return className;
	}
};

export const translateSpec = (className: string, specName: string): string => {
	try {
		const normalizedClassName = className.toLowerCase().replace(/_/g, '');
		const classKey = normalizedClassName === 'deathknight' ? 'death_knight' : normalizedClassName;
		const specKey = specName.toLowerCase();
		const translated = i18n.t(`common.specs.${classKey}.${specKey}`);
		if (translated === `common.specs.${classKey}.${specKey}`) {
			return specName;
		}
		return translated;
	} catch {
		return specName;
	}
};

export const translatePlayerClass = (playerClass: PlayerClass<any>): string => {
	const classKey = getClassI18nKey(playerClass.classID);
	return translateClass(classKey);
};

export const translatePlayerSpec = (playerSpec: PlayerSpec<any>): string => {
	const classKey = getClassI18nKey(playerSpec.classID);
	const specKey = getSpecI18nKey(playerSpec.specID);
	return translateSpec(classKey, specKey);
};

/**
 * Component Translation Helpers
 */

export const extractClassAndSpecFromLink = (link: HTMLAnchorElement): { className?: string; specName?: string } => {
	const parts = link.pathname.split('/').filter(Boolean);
	if (parts.length >= 2) {
		return {
			className: parts[1],
			specName: parts[2]
		};
	}
	return {};
};

export const extractClassAndSpecFromDataAttributes = (): { className: string; specName: string } | null => {
	const titleElement = document.querySelector('title');
	if (titleElement) {
		const className = titleElement.getAttribute('data-class');
		const specName = titleElement.getAttribute('data-spec');
		if (className && specName) {
			return { className, specName };
		}
	}

	const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
	if (metaDescription) {
		const className = metaDescription.getAttribute('data-class');
		const specName = metaDescription.getAttribute('data-spec');
		if (className && specName) {
			return { className, specName };
		}
	}
	return null;
};

export const updateLanguageDropdown = (): void => {
	const dropdownMenu = document.querySelector('.dropdown-menu[aria-labelledby="languageDropdown"]');
	if (!dropdownMenu) return;

	const currentLang = getLang();
	dropdownMenu.innerHTML = '';

	Object.entries(supportedLanguages).forEach(([code, name]) => {
		const handleClick = (e: Event) => {
			e.preventDefault();
			setLang(code);
			window.location.reload();
		};

				const languageItem = (
			<li>
				<a
					className={`dropdown-item ${code === currentLang ? 'active' : ''}`}
					href="#"
					data-lang={code}
					onclick={handleClick}
				>
					{name}
				</a>
			</li>
		);

		dropdownMenu.appendChild(languageItem);
	});
};

export const updateDataI18nElements = (): void => {
	document.querySelectorAll('[data-i18n]').forEach(element => {
		const key = element.getAttribute('data-i18n');
		if (key) {
			element.textContent = i18n.t(key);
		}
	});
};

export const updateSimPageMetadata = (): void => {
	const classSpecInfo = extractClassAndSpecFromDataAttributes();
	if (!classSpecInfo) return;

	const { className, specName } = classSpecInfo;

	const translatedClass = translateClass(className);
	const translatedSpec = translateSpec(className, specName);

	const titleElement = document.querySelector('title');
	if (titleElement) {
		const titleTemplate = i18n.t('sim.title');
		titleElement.textContent = titleTemplate
			.replace('{class}', translatedClass)
			.replace('{spec}', translatedSpec);
	}

	const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
	if (metaDescription) {
		const descriptionTemplate = i18n.t('sim.description');
		metaDescription.content = descriptionTemplate
			.replace('{class}', translatedClass)
			.replace('{spec}', translatedSpec);
	}
};

export const updateSimLinks = (): void => {
	document.querySelectorAll('.sim-link-content').forEach(content => {
		const classLabel = content.querySelector('.sim-link-label');
		const specTitle = content.querySelector('.sim-link-title');
		const link = content.closest('a');

		if (classLabel && specTitle && link instanceof HTMLAnchorElement) {
			const info = extractClassAndSpecFromLink(link);
			if (info && info.className && info.specName) {
				classLabel.textContent = translateClass(info.className);
				specTitle.textContent = translateSpec(info.className, info.specName);
			}
		} else if (specTitle && link instanceof HTMLAnchorElement) {
			const info = extractClassAndSpecFromLink(link);
			if (info && info.className) {
				specTitle.textContent = translateClass(info.className);
			}
		}
	});
};

/**
 * Localization Initialization
 */

export interface LocalizationOptions {
	updateSimMetadata?: boolean;
	updateSimLinks?: boolean;
	updateLanguageDropdown?: boolean;
}

export const updateTranslations = (options: LocalizationOptions = {}): void => {
	document.documentElement.lang = getLang();
	updateDataI18nElements();

	if (options.updateSimMetadata) {
		updateSimPageMetadata();
	}

	if (options.updateSimLinks) {
		updateSimLinks();
	}

	if (options.updateLanguageDropdown) {
		updateLanguageDropdown();
	}
};

export const initLocalization = (options?: LocalizationOptions): void => {
	const finalOptions = options || (
		document.querySelector('title[data-class]') || document.querySelector('meta[data-class]')
			? { updateSimMetadata: true }
			: { updateSimLinks: true, updateLanguageDropdown: true }
	);

	const initialize = () => {
		if (!i18n.isInitialized) {
			i18n.init();
		}

		i18n.on('languageChanged', () => {
			updateTranslations(finalOptions);
		});

		updateTranslations(finalOptions);
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initialize);
	} else {
		initialize();
	}
};
