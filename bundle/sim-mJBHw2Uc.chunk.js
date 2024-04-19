import{o as t,p as e,q as a,K as s,a7 as n,s as o,N as i,z as l}from"./preset_utils-BI4Zd4bY.chunk.js";import{O as r,G as p,a$ as c,b0 as d,b3 as u,b2 as m,V as h,Y as g,aF as S,W as I,X as f,a as O,Z as y,_ as P,$ as b,a0 as v,a1 as C,a2 as M,a3 as A,S as k,F as H,R as T,aa as R}from"./detailed_results-BMSIvwql.chunk.js";import{A as w,M as G,O as E,T as D}from"./inputs-B99wk-HU.chunk.js";const x={type:"TypeAPL",priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{and:{vals:[{not:{val:{auraIsActive:{auraId:{spellId:5171}}}}},{cmp:{op:"OpEq",lhs:{currentComboPoints:{}},rhs:{const:{val:"0"}}}}]}},strictSequence:{actions:[{castSpell:{spellId:{spellId:1752}}},{castSpell:{spellId:{spellId:5171}}}]}}},{action:{condition:{or:{vals:[{not:{val:{auraIsActive:{auraId:{spellId:5171}}}}},{cmp:{op:"OpLe",lhs:{auraRemainingTime:{auraId:{spellId:5171}}},rhs:{const:{val:"1"}}}}]}},castSpell:{spellId:{spellId:5171}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLe",lhs:{currentEnergy:{}},rhs:{const:{val:"35"}}}},{not:{val:{auraIsActive:{auraId:{spellId:13750}}}}}]}},castSpell:{spellId:{spellId:51690}}}},{action:{condition:{cmp:{op:"OpGe",lhs:{spellTimeToReady:{spellId:{spellId:51690}}},rhs:{const:{val:"15"}}}},castSpell:{spellId:{spellId:13750}}}},{action:{condition:{cmp:{op:"OpGe",lhs:{currentComboPoints:{}},rhs:{const:{val:"5"}}}},castSpell:{spellId:{spellId:2098}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLe",lhs:{currentComboPoints:{}},rhs:{const:{val:"4"}}}},{not:{val:{auraIsActive:{sourceUnit:{type:"CurrentTarget"},auraId:{spellId:84617}}}}},{cmp:{op:"OpGt",lhs:{auraRemainingTime:{auraId:{spellId:5171}}},rhs:{const:{val:"6"}}}}]}},castSpell:{spellId:{spellId:84617}}}},{hide:!0,action:{condition:{and:{vals:[{cmp:{op:"OpEq",lhs:{currentComboPoints:{}},rhs:{const:{val:"4"}}}},{not:{val:{auraIsActive:{sourceUnit:{type:"CurrentTarget"},auraId:{spellId:84617}}}}},{cmp:{op:"OpGt",lhs:{auraRemainingTime:{auraId:{spellId:5171}}},rhs:{const:{val:"1"}}}}]}},castSpell:{spellId:{spellId:84617}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLt",lhs:{currentComboPoints:{}},rhs:{const:{val:"5"}}}},{}]}},castSpell:{spellId:{spellId:1776}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLt",lhs:{currentComboPoints:{}},rhs:{const:{val:"5"}}}}]}},castSpell:{spellId:{spellId:1752}}}}]},F=t("P1 Combat",{items:[{id:65129,enchant:4209,gems:[68778,52212],reforging:154},{id:65107,reforging:165},{id:65243,enchant:4204,gems:[52220],reforging:146},{id:69884,randomSuffix:-136,enchant:1099,reforging:168},{id:65239,enchant:4102,gems:[52212,52220],reforging:154},{id:65050,enchant:4258,gems:[0],reforging:144},{id:65240,enchant:4107,gems:[52212,0]},{id:60231,gems:[52220,52212,52212],reforging:144},{id:65242,enchant:3823,gems:[52211,52220],reforging:144},{id:65144,enchant:4105,gems:[52212],reforging:153},{id:65367,randomSuffix:-136,reforging:151},{id:65082,reforging:145},{id:65026},{id:59520},{id:68130,randomSuffix:-136,enchant:4099,reforging:151},{id:68600,enchant:4099,reforging:146},{id:65095,reforging:146}]}),B=e("Combat",x),j={name:"Combat",data:r.create({talentsString:"0322-2332030310230012321-003",glyphs:p.create({prime1:c.GlyphOfAdrenalineRush,prime2:c.GlyphOfSinisterStrike,prime3:c.GlyphOfSliceAndDice,major1:d.GlyphOfBladeFlurry,major2:d.GlyphOfTricksOfTheTrade,major3:d.GlyphOfGouge})})},q=u.create({classOptions:{mhImbue:m.DeadlyPoison,ohImbue:m.InstantPoison,thImbue:m.WoundPoison,applyPoisonsManually:!1,startingOverkillDuration:20,vanishBreakTime:.1}}),L=h.create({defaultPotion:g.PotionOfSpeed,prepopPotion:g.PotionOfSpeed,defaultConjured:S.ConjuredRogueThistleTea,flask:I.FlaskOfEndlessRage,food:f.FoodMegaMammothMeal}),U=a(k.SpecCombatRogue,{cssClass:"combat-rogue-sim-ui",cssScheme:O.getCssClass(O.Rogue),knownIssues:["Rotations are not fully optimized, especially for non-standard setups."],epStats:[y.StatAgility,y.StatStrength,y.StatAttackPower,y.StatMeleeHit,y.StatMeleeCrit,y.StatSpellHit,y.StatSpellCrit,y.StatMeleeHaste,y.StatMastery,y.StatExpertise],epPseudoStats:[P.PseudoStatMainHandDps,P.PseudoStatOffHandDps],epReferenceStat:y.StatAttackPower,displayStats:[y.StatHealth,y.StatStamina,y.StatAgility,y.StatStrength,y.StatAttackPower,y.StatMeleeHit,y.StatSpellHit,y.StatMeleeCrit,y.StatSpellCrit,y.StatMeleeHaste,y.StatMastery,y.StatExpertise],defaults:{gear:F.gear,epWeights:b.fromMap({[y.StatAgility]:1.86,[y.StatStrength]:1.14,[y.StatAttackPower]:1,[y.StatSpellCrit]:.28,[y.StatSpellHit]:.08,[y.StatMeleeHit]:1.39,[y.StatMeleeCrit]:1.32,[y.StatMeleeHaste]:1.48,[y.StatMastery]:.84,[y.StatExpertise]:.98},{[P.PseudoStatMainHandDps]:2.94,[P.PseudoStatOffHandDps]:2.45}),consumes:L,talents:j.data,specOptions:q,raidBuffs:v.create({arcaneBrilliance:!0,bloodlust:!0,markOfTheWild:!0,icyTalons:!0,moonkinForm:!0,leaderOfThePack:!0,powerWordFortitude:!0,strengthOfEarthTotem:!0,trueshotAura:!0,wrathOfAirTotem:!0,demonicPact:!0,blessingOfKings:!0,blessingOfMight:!0,communion:!0}),partyBuffs:C.create({}),individualBuffs:M.create({}),debuffs:A.create({mangle:!0,sunderArmor:!0,shadowAndFlame:!0,earthAndMoon:!0,bloodFrenzy:!0})},playerInputs:{inputs:[w()]},playerIconInputs:[G(),E(),D()],includeBuffDebuffInputs:[s,n,o,i],excludeBuffDebuffInputs:[],otherInputs:{inputs:[]},encounterPicker:{showExecuteProportion:!1},presets:{talents:[j],rotations:[B],gear:[F]},autoRotation:t=>{t.sim.encounter.targets.length;return B.rotation.rotation},raidSimPresets:[{spec:k.SpecCombatRogue,talents:j.data,specOptions:q,consumes:L,defaultFactionRaces:{[H.Unknown]:T.RaceUnknown,[H.Alliance]:T.RaceHuman,[H.Horde]:T.RaceOrc},defaultGear:{[H.Unknown]:{},[H.Alliance]:{1:F.gear},[H.Horde]:{1:F.gear}}}]});class W extends l{constructor(t,e){super(t,e,U),this.player.changeEmitter.on((t=>{const e=this.player.getSpecOptions(),a=this.sim.encounter;if(!e.classOptions.applyPoisonsManually){const t=this.player.getGear().getEquippedItem(R.ItemSlotMainHand)?.item.weaponSpeed,s=this.player.getGear().getEquippedItem(R.ItemSlotOffHand)?.item.weaponSpeed;if(void 0===t||void 0===s)return;a.targets.length>3?(e.classOptions.mhImbue=m.InstantPoison,e.classOptions.ohImbue=m.InstantPoison):t<=s?(e.classOptions.mhImbue=m.DeadlyPoison,e.classOptions.ohImbue=m.InstantPoison):(e.classOptions.mhImbue=m.InstantPoison,e.classOptions.ohImbue=m.DeadlyPoison)}this.player.setSpecOptions(t,e)})),this.sim.encounter.changeEmitter.on((t=>{const e=this.player.getSpecOptions(),a=this.sim.encounter;if(!e.classOptions.applyPoisonsManually){const t=this.player.getGear().getEquippedItem(R.ItemSlotMainHand)?.item.weaponSpeed,s=this.player.getGear().getEquippedItem(R.ItemSlotOffHand)?.item.weaponSpeed;if(void 0===t||void 0===s)return;a.targets.length>3?(e.classOptions.mhImbue=m.InstantPoison,e.classOptions.ohImbue=m.InstantPoison):t<=s?(e.classOptions.mhImbue=m.DeadlyPoison,e.classOptions.ohImbue=m.InstantPoison):(e.classOptions.mhImbue=m.InstantPoison,e.classOptions.ohImbue=m.DeadlyPoison)}this.player.setSpecOptions(t,e)}))}}export{W as C};
//# sourceMappingURL=sim-mJBHw2Uc.chunk.js.map
