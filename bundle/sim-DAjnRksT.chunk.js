import{o as t,p as e,q as a,K as s,a7 as n,s as o,N as i,z as l}from"./preset_utils-BI4Zd4bY.chunk.js";import{O as r,G as p,a$ as c,b0 as d,b1 as u,b2 as h,V as m,Y as I,aF as S,W as g,X as f,a as O,Z as y,_ as v,$ as P,a0 as A,a1 as b,a2 as M,a3 as E,S as k,F as H,R as C,aa as G}from"./detailed_results-BMSIvwql.chunk.js";import{A as w,M as T,O as R,T as x}from"./inputs-B99wk-HU.chunk.js";const D={type:"TypeAPL",prepullActions:[{action:{activateAura:{auraId:{spellId:1784}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{not:{val:{auraIsActive:{sourceUnit:{type:"CurrentTarget"},auraId:{spellId:703}}}}},castSpell:{spellId:{spellId:703}}}},{action:{condition:{not:{val:{auraIsActive:{auraId:{spellId:5171}}}}},castSpell:{spellId:{spellId:5171}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLe",lhs:{auraRemainingTime:{auraId:{spellId:5171}}},rhs:{const:{val:"1s"}}}},{auraIsActive:{auraId:{spellId:5171}}}]}},castSpell:{spellId:{spellId:32645}}}},{action:{condition:{not:{val:{auraIsActive:{sourceUnit:{type:"CurrentTarget"},auraId:{spellId:1943}}}}},castSpell:{spellId:{spellId:1943}}}},{action:{condition:{not:{val:{auraIsActive:{auraId:{spellId:58427}}}}},castSpell:{spellId:{spellId:1856}}}},{action:{condition:{or:{vals:[{cmp:{op:"OpEq",lhs:{currentComboPoints:{}},rhs:{const:{val:"5"}}}},{cmp:{op:"OpLe",lhs:{remainingTime:{}},rhs:{const:{val:"5s"}}}}]}},castSpell:{spellId:{spellId:14177}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpGe",lhs:{currentComboPoints:{}},rhs:{const:{val:"4"}}}},{or:{vals:[{and:{vals:[{not:{val:{auraIsActive:{auraId:{spellId:32645}}}}},{cmp:{op:"OpGe",lhs:{currentEnergy:{}},rhs:{const:{val:"65"}}}}]}},{and:{vals:[{auraIsActive:{auraId:{spellId:32645}}},{cmp:{op:"OpGe",lhs:{currentEnergy:{}},rhs:{const:{val:"75"}}}}]}}]}},{not:{val:{isExecutePhase:{threshold:"E35"}}}}]}},castSpell:{spellId:{spellId:32645}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpGe",lhs:{currentComboPoints:{}},rhs:{const:{val:"5"}}}},{or:{vals:[{and:{vals:[{not:{val:{auraIsActive:{auraId:{spellId:32645}}}}},{cmp:{op:"OpGe",lhs:{currentEnergy:{}},rhs:{const:{val:"65"}}}}]}},{and:{vals:[{auraIsActive:{auraId:{spellId:32645}}},{cmp:{op:"OpGe",lhs:{currentEnergy:{}},rhs:{const:{val:"75"}}}}]}}]}},{isExecutePhase:{threshold:"E35"}}]}},castSpell:{spellId:{spellId:32645}}}},{action:{condition:{and:{vals:[{isExecutePhase:{threshold:"E35"}},{cmp:{op:"OpLe",lhs:{currentComboPoints:{}},rhs:{const:{val:"4"}}}}]}},castSpell:{spellId:{spellId:53}}}},{action:{condition:{and:{vals:[{not:{val:{isExecutePhase:{threshold:"E35"}}}},{cmp:{op:"OpLe",lhs:{currentComboPoints:{}},rhs:{const:{val:"3"}}}}]}},castSpell:{spellId:{spellId:1329}}}}]},F=t("P1 Assassination",{items:[{id:65241,enchant:4209,gems:[68778,52220],reforging:147},{id:65107},{id:65083,enchant:4204,gems:[52212],reforging:144},{id:69884,randomSuffix:-136,enchant:1099},{id:65060,enchant:3832,gems:[52212,52212],reforging:145},{id:65050,enchant:4258,gems:[0],reforging:144},{id:65240,enchant:4107,gems:[52212,0],reforging:154},{id:60231,gems:[52220,52212,52212],reforging:144},{id:65381,randomSuffix:-202,enchant:4126,gems:[52212,52220]},{id:65144,enchant:4076,gems:[52212]},{id:65367,randomSuffix:-136},{id:65082,reforging:147},{id:65026},{id:59520},{id:68600,enchant:4099,reforging:144},{id:65081,enchant:4099,reforging:158},{id:65095,reforging:144}]}),B=e("Assassination",D),j={name:"Assassination 31/2/8",data:r.create({talentsString:"0333230013122110321-002-203003",glyphs:p.create({prime1:c.GlyphOfMutilate,prime2:c.GlyphOfBackstab,prime3:c.GlyphOfRupture,major1:d.GlyphOfFeint,major2:d.GlyphOfTricksOfTheTrade,major3:d.GlyphOfSprint})})},q=u.create({classOptions:{mhImbue:h.DeadlyPoison,ohImbue:h.InstantPoison,thImbue:h.DeadlyPoison,applyPoisonsManually:!1,startingOverkillDuration:20,vanishBreakTime:.1}}),L=m.create({defaultPotion:I.PotionOfSpeed,prepopPotion:I.PotionOfSpeed,defaultConjured:S.ConjuredRogueThistleTea,flask:g.FlaskOfEndlessRage,food:f.FoodMegaMammothMeal}),U=a(k.SpecAssassinationRogue,{cssClass:"assassination-rogue-sim-ui",cssScheme:O.getCssClass(O.Rogue),knownIssues:["Rotations are not fully optimized, especially for non-standard setups."],epStats:[y.StatAgility,y.StatStrength,y.StatAttackPower,y.StatMeleeHit,y.StatMeleeCrit,y.StatSpellHit,y.StatSpellCrit,y.StatMeleeHaste,y.StatMastery,y.StatExpertise],epPseudoStats:[v.PseudoStatMainHandDps,v.PseudoStatOffHandDps],epReferenceStat:y.StatAttackPower,displayStats:[y.StatHealth,y.StatStamina,y.StatAgility,y.StatStrength,y.StatAttackPower,y.StatMeleeHit,y.StatSpellHit,y.StatMeleeCrit,y.StatSpellCrit,y.StatMeleeHaste,y.StatMastery,y.StatExpertise],defaults:{gear:F.gear,epWeights:P.fromMap({[y.StatAgility]:1.86,[y.StatStrength]:1.14,[y.StatAttackPower]:1,[y.StatSpellCrit]:.28,[y.StatSpellHit]:.08,[y.StatMeleeHit]:1.39,[y.StatMeleeCrit]:1.32,[y.StatMeleeHaste]:1.48,[y.StatMastery]:.84,[y.StatExpertise]:.98},{[v.PseudoStatMainHandDps]:2.94,[v.PseudoStatOffHandDps]:2.45}),consumes:L,talents:j.data,specOptions:q,raidBuffs:A.create({arcaneBrilliance:!0,bloodlust:!0,markOfTheWild:!0,icyTalons:!0,moonkinForm:!0,leaderOfThePack:!0,powerWordFortitude:!0,strengthOfEarthTotem:!0,trueshotAura:!0,wrathOfAirTotem:!0,demonicPact:!0,blessingOfKings:!0,blessingOfMight:!0,communion:!0}),partyBuffs:b.create({}),individualBuffs:M.create({}),debuffs:E.create({mangle:!0,sunderArmor:!0,earthAndMoon:!0,bloodFrenzy:!0,shadowAndFlame:!0})},playerInputs:{inputs:[w()]},playerIconInputs:[T(),R(),x()],includeBuffDebuffInputs:[s,n,o,i],excludeBuffDebuffInputs:[],otherInputs:{inputs:[]},encounterPicker:{showExecuteProportion:!1},presets:{talents:[j],rotations:[B],gear:[F]},autoRotation:t=>{t.sim.encounter.targets.length;return B.rotation.rotation},raidSimPresets:[{spec:k.SpecAssassinationRogue,talents:j.data,specOptions:q,consumes:L,defaultFactionRaces:{[H.Unknown]:C.RaceUnknown,[H.Alliance]:C.RaceHuman,[H.Horde]:C.RaceOrc},defaultGear:{[H.Unknown]:{},[H.Alliance]:{1:F.gear},[H.Horde]:{1:F.gear}}}]});class W extends l{constructor(t,e){super(t,e,U),this.player.changeEmitter.on((t=>{const e=this.player.getSpecOptions(),a=this.sim.encounter;if(!e.classOptions.applyPoisonsManually){const t=this.player.getGear().getEquippedItem(G.ItemSlotMainHand)?.item.weaponSpeed,s=this.player.getGear().getEquippedItem(G.ItemSlotOffHand)?.item.weaponSpeed;if(void 0===t||void 0===s)return;a.targets.length>3?(e.classOptions.mhImbue=h.InstantPoison,e.classOptions.ohImbue=h.InstantPoison):t<=s?(e.classOptions.mhImbue=h.DeadlyPoison,e.classOptions.ohImbue=h.InstantPoison):(e.classOptions.mhImbue=h.InstantPoison,e.classOptions.ohImbue=h.DeadlyPoison)}this.player.setSpecOptions(t,e)})),this.sim.encounter.changeEmitter.on((t=>{const e=this.player.getSpecOptions(),a=this.sim.encounter;if(!e.classOptions.applyPoisonsManually){const t=this.player.getGear().getEquippedItem(G.ItemSlotMainHand)?.item.weaponSpeed,s=this.player.getGear().getEquippedItem(G.ItemSlotOffHand)?.item.weaponSpeed;if(void 0===t||void 0===s)return;a.targets.length>3?(e.classOptions.mhImbue=h.InstantPoison,e.classOptions.ohImbue=h.InstantPoison):t<=s?(e.classOptions.mhImbue=h.DeadlyPoison,e.classOptions.ohImbue=h.InstantPoison):(e.classOptions.mhImbue=h.InstantPoison,e.classOptions.ohImbue=h.DeadlyPoison)}this.player.setSpecOptions(t,e)}))}}export{W as A};
//# sourceMappingURL=sim-DAjnRksT.chunk.js.map
