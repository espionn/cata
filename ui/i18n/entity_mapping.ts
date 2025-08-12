import { LaunchStatus } from '../core/launched_sims';
import { ArmorType, Class, MobType, PseudoStat, Race, Profession, Spec, Stat, SpellSchool, WeaponType, RangedWeaponType } from '../core/proto/common';
import { RaidFilterOption, SourceFilterOption } from '../core/proto/ui';
import i18n from './config';

export const statI18nKeys: Record<Stat, string> = {
	[Stat.StatStrength]: 'strength',
	[Stat.StatAgility]: 'agility',
	[Stat.StatStamina]: 'stamina',
	[Stat.StatIntellect]: 'intellect',
	[Stat.StatSpirit]: 'spirit',
	[Stat.StatHitRating]: 'hit',
	[Stat.StatCritRating]: 'crit',
	[Stat.StatHasteRating]: 'haste',
	[Stat.StatExpertiseRating]: 'expertise',
	[Stat.StatDodgeRating]: 'dodge',
	[Stat.StatParryRating]: 'parry',
	[Stat.StatMasteryRating]: 'mastery',
	[Stat.StatAttackPower]: 'attack_power',
	[Stat.StatRangedAttackPower]: 'ranged_attack_power',
	[Stat.StatSpellPower]: 'spell_power',
	[Stat.StatPvpResilienceRating]: 'pvp_resilience',
	[Stat.StatPvpPowerRating]: 'pvp_power',
	[Stat.StatArmor]: 'armor',
	[Stat.StatBonusArmor]: 'bonus_armor',
	[Stat.StatHealth]: 'health',
	[Stat.StatMana]: 'mana',
	[Stat.StatMP5]: 'mp5',
};

export const pseudoStatI18nKeys: Record<PseudoStat, string> = {
	[PseudoStat.PseudoStatMainHandDps]: 'main_hand_dps',
	[PseudoStat.PseudoStatOffHandDps]: 'off_hand_dps',
	[PseudoStat.PseudoStatRangedDps]: 'ranged_dps',
	[PseudoStat.PseudoStatDodgePercent]: 'dodge',
	[PseudoStat.PseudoStatParryPercent]: 'parry',
	[PseudoStat.PseudoStatBlockPercent]: 'block',
	[PseudoStat.PseudoStatMeleeSpeedMultiplier]: 'melee_speed_multiplier',
	[PseudoStat.PseudoStatRangedSpeedMultiplier]: 'ranged_speed_multiplier',
	[PseudoStat.PseudoStatCastSpeedMultiplier]: 'cast_speed_multiplier',
	[PseudoStat.PseudoStatMeleeHastePercent]: 'melee_haste',
	[PseudoStat.PseudoStatRangedHastePercent]: 'ranged_haste',
	[PseudoStat.PseudoStatSpellHastePercent]: 'spell_haste',
	[PseudoStat.PseudoStatPhysicalHitPercent]: 'melee_hit',
	[PseudoStat.PseudoStatSpellHitPercent]: 'spell_hit',
	[PseudoStat.PseudoStatPhysicalCritPercent]: 'melee_crit',
	[PseudoStat.PseudoStatSpellCritPercent]: 'spell_crit',
};

export const spellSchoolI18nKeys: Record<SpellSchool, string> = {
	[SpellSchool.SpellSchoolPhysical]: 'physical',
	[SpellSchool.SpellSchoolArcane]: 'arcane',
	[SpellSchool.SpellSchoolFire]: 'fire',
	[SpellSchool.SpellSchoolFrost]: 'frost',
	[SpellSchool.SpellSchoolHoly]: 'holy',
	[SpellSchool.SpellSchoolNature]: 'nature',
	[SpellSchool.SpellSchoolShadow]: 'shadow',
};

export const classI18nKeys: Record<Class, string> = {
	[Class.ClassUnknown]: 'unknown',
	[Class.ClassWarrior]: 'warrior',
	[Class.ClassPaladin]: 'paladin',
	[Class.ClassHunter]: 'hunter',
	[Class.ClassRogue]: 'rogue',
	[Class.ClassPriest]: 'priest',
	[Class.ClassDeathKnight]: 'death_knight',
	[Class.ClassShaman]: 'shaman',
	[Class.ClassMage]: 'mage',
	[Class.ClassWarlock]: 'warlock',
	[Class.ClassMonk]: 'monk',
	[Class.ClassDruid]: 'druid',
	[Class.ClassExtra1]: 'extra1',
	[Class.ClassExtra2]: 'extra2',
	[Class.ClassExtra3]: 'extra3',
	[Class.ClassExtra4]: 'extra4',
	[Class.ClassExtra5]: 'extra5',
	[Class.ClassExtra6]: 'extra6',
};

export const specI18nKeys: Record<Spec, string> = {
	[Spec.SpecUnknown]: 'unknown',
	// Death Knight
	[Spec.SpecBloodDeathKnight]: 'blood',
	[Spec.SpecFrostDeathKnight]: 'frost',
	[Spec.SpecUnholyDeathKnight]: 'unholy',
	// Druid
	[Spec.SpecBalanceDruid]: 'balance',
	[Spec.SpecFeralDruid]: 'feral',
	[Spec.SpecGuardianDruid]: 'guardian',
	[Spec.SpecRestorationDruid]: 'restoration',
	// Hunter
	[Spec.SpecBeastMasteryHunter]: 'beast_mastery',
	[Spec.SpecMarksmanshipHunter]: 'marksmanship',
	[Spec.SpecSurvivalHunter]: 'survival',
	// Mage
	[Spec.SpecArcaneMage]: 'arcane',
	[Spec.SpecFireMage]: 'fire',
	[Spec.SpecFrostMage]: 'frost',
	// Monk
	[Spec.SpecBrewmasterMonk]: 'brewmaster',
	[Spec.SpecMistweaverMonk]: 'mistweaver',
	[Spec.SpecWindwalkerMonk]: 'windwalker',
	// Paladin
	[Spec.SpecHolyPaladin]: 'holy',
	[Spec.SpecProtectionPaladin]: 'protection',
	[Spec.SpecRetributionPaladin]: 'retribution',
	// Priest
	[Spec.SpecDisciplinePriest]: 'discipline',
	[Spec.SpecHolyPriest]: 'holy',
	[Spec.SpecShadowPriest]: 'shadow',
	// Rogue
	[Spec.SpecAssassinationRogue]: 'assassination',
	[Spec.SpecCombatRogue]: 'combat',
	[Spec.SpecSubtletyRogue]: 'subtlety',
	// Shaman
	[Spec.SpecElementalShaman]: 'elemental',
	[Spec.SpecEnhancementShaman]: 'enhancement',
	[Spec.SpecRestorationShaman]: 'restoration',
	// Warlock
	[Spec.SpecAfflictionWarlock]: 'affliction',
	[Spec.SpecDemonologyWarlock]: 'demonology',
	[Spec.SpecDestructionWarlock]: 'destruction',
	// Warrior
	[Spec.SpecArmsWarrior]: 'arms',
	[Spec.SpecFuryWarrior]: 'fury',
	[Spec.SpecProtectionWarrior]: 'protection',
};

export const statusI18nKeys: Record<LaunchStatus, string> = {
	[LaunchStatus.Unlaunched]: 'unlaunched',
	[LaunchStatus.Alpha]: 'alpha',
	[LaunchStatus.Beta]: 'beta',
	[LaunchStatus.Launched]: 'launched',
};

export const targetInputI18nKeys: Record<string, string> = {
	'Frenzy time': 'frenzy_time',
	'Spiritual Grasp frequency': 'spiritual_grasp_frequency',
};

export const mobTypeI18nKeys: Record<MobType, string> = {
	[MobType.MobTypeUnknown]: 'unknown',
	[MobType.MobTypeBeast]: 'beast',
	[MobType.MobTypeDemon]: 'demon',
	[MobType.MobTypeDragonkin]: 'dragonkin',
	[MobType.MobTypeElemental]: 'elemental',
	[MobType.MobTypeGiant]: 'giant',
	[MobType.MobTypeHumanoid]: 'humanoid',
	[MobType.MobTypeMechanical]: 'mechanical',
	[MobType.MobTypeUndead]: 'undead',
};

export const raceI18nKeys: Record<Race, string> = {
	[Race.RaceUnknown]: 'unknown',
	[Race.RaceBloodElf]: 'blood_elf',
	[Race.RaceDraenei]: 'draenei',
	[Race.RaceDwarf]: 'dwarf',
	[Race.RaceGnome]: 'gnome',
	[Race.RaceGoblin]: 'goblin',
	[Race.RaceHuman]: 'human',
	[Race.RaceNightElf]: 'night_elf',
	[Race.RaceOrc]: 'orc',
	[Race.RaceAlliancePandaren]: 'alliance_pandaren',
	[Race.RaceHordePandaren]: 'horde_pandaren',
	[Race.RaceTauren]: 'tauren',
	[Race.RaceTroll]: 'troll',
	[Race.RaceUndead]: 'undead',
	[Race.RaceWorgen]: 'worgen',
};

export const professionI18nKeys: Record<Profession, string> = {
	[Profession.ProfessionUnknown]: 'unknown',
	[Profession.Alchemy]: 'alchemy',
	[Profession.Blacksmithing]: 'blacksmithing',
	[Profession.Enchanting]: 'enchanting',
	[Profession.Engineering]: 'engineering',
	[Profession.Herbalism]: 'herbalism',
	[Profession.Inscription]: 'inscription',
	[Profession.Jewelcrafting]: 'jewelcrafting',
	[Profession.Leatherworking]: 'leatherworking',
	[Profession.Mining]: 'mining',
	[Profession.Skinning]: 'skinning',
	[Profession.Tailoring]: 'tailoring',
	[Profession.Archeology]: 'archeology',
};

export const sourceFilterI18nKeys: Record<SourceFilterOption, string> = {
	[SourceFilterOption.SourceUnknown]: 'unknown',
	[SourceFilterOption.SourceCrafting]: 'crafting',
	[SourceFilterOption.SourceQuest]: 'quest',
	[SourceFilterOption.SourceReputation]: 'reputation',
	[SourceFilterOption.SourcePvp]: 'pvp',
	[SourceFilterOption.SourceDungeon]: 'dungeon',
	[SourceFilterOption.SourceDungeonH]: 'dungeon_h',
	[SourceFilterOption.SourceRaid]: 'raid',
	[SourceFilterOption.SourceRaidH]: 'raid_h',
	[SourceFilterOption.SourceRaidRF]: 'raid_rf',
};

export const raidFilterI18nKeys: Record<RaidFilterOption, string> = {
	[RaidFilterOption.RaidUnknown]: 'unknown',
	[RaidFilterOption.RaidMogushanVaults]: 'mogushan_vaults',
	[RaidFilterOption.RaidHeartOfFear]: 'heart_of_fear',
	[RaidFilterOption.RaidTerraceOfEndlessSpring]: 'terrace_of_endless_spring',
	[RaidFilterOption.RaidThroneOfThunder]: 'throne_of_thunder',
	[RaidFilterOption.RaidSiegeOfOrgrimmar]: 'siege_of_orgrimmar',
};

export const armorTypeI18nKeys: Record<ArmorType, string> = {
	[ArmorType.ArmorTypeUnknown]: 'unknown',
	[ArmorType.ArmorTypeCloth]: 'cloth',
	[ArmorType.ArmorTypeLeather]: 'leather',
	[ArmorType.ArmorTypeMail]: 'mail',
	[ArmorType.ArmorTypePlate]: 'plate',
};

export const weaponTypeI18nKeys: Record<WeaponType, string> = {
	[WeaponType.WeaponTypeUnknown]: 'unknown',
	[WeaponType.WeaponTypeAxe]: 'axe',
	[WeaponType.WeaponTypeDagger]: 'dagger',
	[WeaponType.WeaponTypeFist]: 'fist',
	[WeaponType.WeaponTypeMace]: 'mace',
	[WeaponType.WeaponTypeOffHand]: 'off_hand',
	[WeaponType.WeaponTypePolearm]: 'polearm',
	[WeaponType.WeaponTypeShield]: 'shield',
	[WeaponType.WeaponTypeStaff]: 'staff',
	[WeaponType.WeaponTypeSword]: 'sword',
};

export const rangedWeaponTypeI18nKeys: Record<RangedWeaponType, string> = {
	[RangedWeaponType.RangedWeaponTypeUnknown]: 'unknown',
	[RangedWeaponType.RangedWeaponTypeBow]: 'bow',
	[RangedWeaponType.RangedWeaponTypeCrossbow]: 'crossbow',
	[RangedWeaponType.RangedWeaponTypeGun]: 'gun',
	[RangedWeaponType.RangedWeaponTypeThrown]: 'thrown',
	[RangedWeaponType.RangedWeaponTypeWand]: 'wand',
};

export const translateStat = (stat: Stat): string => {
	const key = statI18nKeys[stat] || Stat[stat].toLowerCase();
	return i18n.t(`common.stats.${key}`);
};

export const translatePseudoStat = (pseudoStat: PseudoStat): string => {
	const key = pseudoStatI18nKeys[pseudoStat] || PseudoStat[pseudoStat].toLowerCase();
	return i18n.t(`common.stats.${key}`);
};

export const translateClassEnum = (classID: Class): string => {
	const key = getClassI18nKey(classID);
	return i18n.t(`common.classes.${key}`);
};

export const translateSpecEnum = (specID: Spec): string => {
	const key = getSpecI18nKey(specID);
	return i18n.t(`common.specs.${key}`);
};

export const translateStatus = (status: LaunchStatus): string => {
	const key = getStatusI18nKey(status);
	return i18n.t(`common.status.${key}`);
};

export function getClassI18nKey(classID: Class): string {
	return classI18nKeys[classID] || Class[classID].toLowerCase();
}

export function getSpecI18nKey(specID: Spec): string {
	return specI18nKeys[specID] || Spec[specID].toLowerCase();
}

export function getStatusI18nKey(status: LaunchStatus): string {
	return statusI18nKeys[status] || LaunchStatus[status].toLowerCase();
}

export function getTargetInputI18nKey(label: string): string {
	return targetInputI18nKeys[label] || label.toLowerCase().replace(/\s+/g, '_');
}

export function getMobTypeI18nKey(mobType: MobType): string {
	return mobTypeI18nKeys[mobType] || MobType[mobType].toLowerCase();
}

export const translateMobType = (mobType: MobType): string => {
	const key = getMobTypeI18nKey(mobType);
	return i18n.t(`common.mob_types.${key}`);
};

export function getRaceI18nKey(race: Race): string {
	return raceI18nKeys[race] || Race[race].toLowerCase();
}

export const translateRace = (race: Race): string => {
	const key = getRaceI18nKey(race);
	return i18n.t(`common.races.${key}`);
};

export function getProfessionI18nKey(profession: Profession): string {
	return professionI18nKeys[profession] || Profession[profession].toLowerCase();
}

export const translateProfession = (profession: Profession): string => {
	const key = getProfessionI18nKey(profession);
	return i18n.t(`common.professions.${key}`);
};

export function getSourceFilterI18nKey(source: SourceFilterOption): string {
	return sourceFilterI18nKeys[source] || SourceFilterOption[source].toLowerCase();
}

export const translateSourceFilter = (source: SourceFilterOption): string => {
	const key = getSourceFilterI18nKey(source);
	return i18n.t(`common.sources.${key}`);
};

export function getRaidFilterI18nKey(raid: RaidFilterOption): string {
	return raidFilterI18nKeys[raid] || RaidFilterOption[raid].toLowerCase();
}

export const translateRaidFilter = (raid: RaidFilterOption): string => {
	const key = getRaidFilterI18nKey(raid);
	return i18n.t(`common.raids.${key}`);
};

export function getArmorTypeI18nKey(armorType: ArmorType): string {
	return armorTypeI18nKeys[armorType] || ArmorType[armorType].toLowerCase();
}

export const translateArmorType = (armorType: ArmorType): string => {
	const key = getArmorTypeI18nKey(armorType);
	return i18n.t(`common.armor_types.${key}`);
};

export function getWeaponTypeI18nKey(weaponType: WeaponType): string {
	return weaponTypeI18nKeys[weaponType] || WeaponType[weaponType].toLowerCase();
}

export const translateWeaponType = (weaponType: WeaponType): string => {
	const key = getWeaponTypeI18nKey(weaponType);
	return i18n.t(`common.weapon_types.${key}`);
};

export function getRangedWeaponTypeI18nKey(rangedWeaponType: RangedWeaponType): string {
	return rangedWeaponTypeI18nKeys[rangedWeaponType] || RangedWeaponType[rangedWeaponType].toLowerCase();
}

export const translateRangedWeaponType = (rangedWeaponType: RangedWeaponType): string => {
	const key = getRangedWeaponTypeI18nKey(rangedWeaponType);
	return i18n.t(`common.ranged_weapon_types.${key}`);
};
