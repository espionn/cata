import{m as e,l as t,n as a,o as l,p as s,q as n,s as o,T as i,H as c,t as r,u as d,v as p,w as h,x as m,y as u,D as S,z as g}from"./preset_utils-BI4Zd4bY.chunk.js";import{J as I,T as v,K as f,L as P,M as b,N as A,O as y,Q as R,V as O,W as B,X as T,Y as H,a as C,Z as w,_ as D,$ as k,a0 as E,a1 as M,a2 as L,a3 as F,S as N,F as x,R as U}from"./detailed_results-BMSIvwql.chunk.js";t({fieldName:"defensiveDelay",label:"Defensives Delay",labelTooltip:"Minimum delay between using more defensive cooldowns."});const G={inputs:[a({fieldName:"presence",label:"Presence",labelTooltip:"Presence to be in during the encounter.",values:[{name:"Blood",value:I.Blood},{name:"Frost",value:I.Frost},{name:"Unholy",value:I.Unholy}],changeEmitter:e=>v.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])}),a({fieldName:"opener",label:"Opener",labelTooltip:"Chose what opener to perform:<br>\t\t\t\t<b>Regular</b>: Regular opener.<br>\t\t\t\t<b>Threat</b>: Full IT spam for max threat.",values:[{name:"Regular",value:f.Regular},{name:"Threat",value:f.Threat}],changeEmitter:e=>v.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])}),a({fieldName:"optimizationSetting",label:"Optimization Setting",labelTooltip:"Chose what metric to optimize:<br>\t\t\t\t<b>Hps</b>: Prioritizes holding runes for healing after damage taken.<br>\t\t\t\t<b>Tps</b>: Prioritizes spending runes for icy touch spam.",values:[{name:"Hps",value:P.Hps},{name:"Tps",value:P.Tps}],changeEmitter:e=>v.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])}),a({fieldName:"bloodSpell",label:"Blood Spell",labelTooltip:"Chose what blood rune spender to use.",values:[{name:"Blood Strike",value:b.BloodStrike},{name:"Blood Boil",value:b.BloodBoil},{name:"Heart Strike",value:b.HeartStrike}],changeEmitter:e=>v.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])}),a({fieldName:"bloodTapPrio",label:"Blood Tap",labelTooltip:"Chose how to use Blood Tap:<br>\t\t\t\t<b>Use as Defensive Cooldown</b>: Use as defined in Cooldowns (Requires T10 4pc).<br>\t\t\t\t<b>Offensive</b>: Use Blood Tap for extra Icy Touches.",values:[{name:"Use as Defensive Cooldown",value:A.Defensive},{name:"Offensive",value:A.Offensive}],changeEmitter:e=>v.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])})]},z={type:"TypeAPL",prepullActions:[{action:{castSpell:{spellId:{spellId:48263}}},doAtValue:{const:{val:"-10s"}}},{action:{castSpell:{spellId:{spellId:42650}}},doAtValue:{const:{val:"-6s"}}},{action:{castSpell:{spellId:{otherId:"OtherActionPotion"}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"40%"}}}},{not:{val:{auraIsActive:{auraId:{spellId:55233}}}}}]}},castSpell:{spellId:{spellId:48792}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"40%"}}}},{not:{val:{auraIsActive:{auraId:{spellId:48792}}}}}]}},castSpell:{spellId:{spellId:55233}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"60%"}}}},castSpell:{spellId:{spellId:48707}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"60%"}}}},castSpell:{spellId:{spellId:48743}}}},{action:{condition:{or:{vals:[{not:{val:{spellIsReady:{spellId:{spellId:49028}}}}},{cmp:{op:"OpGe",lhs:{currentRunicPower:{}},rhs:{const:{val:"80"}}}}]}},castSpell:{spellId:{spellId:56815}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:55095}}}}},castSpell:{spellId:{spellId:59131}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:55078}}}}},castSpell:{spellId:{tag:1,spellId:49921}}}},{action:{castSpell:{spellId:{spellId:49016}}}},{action:{castSpell:{spellId:{spellId:49028}}}},{action:{castSpell:{spellId:{tag:1,spellId:55262}}}},{action:{castSpell:{spellId:{tag:1,spellId:49924}}}},{action:{castSpell:{spellId:{spellId:46584}}}},{action:{castSpell:{spellId:{spellId:47568}}}},{action:{condition:{cmp:{op:"OpGe",lhs:{currentRunicPower:{}},rhs:{const:{val:"80"}}}},castSpell:{spellId:{spellId:49895}}}}]},V={type:"TypeAPL",prepullActions:[{action:{castSpell:{spellId:{spellId:48263}}},doAtValue:{const:{val:"-10s"}}},{action:{castSpell:{spellId:{spellId:42650}}},doAtValue:{const:{val:"-6s"}}},{action:{castSpell:{spellId:{otherId:"OtherActionPotion"}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"40%"}}}},castSpell:{spellId:{spellId:48792}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"40%"}}}},castSpell:{spellId:{spellId:55233}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"60%"}}}},castSpell:{spellId:{spellId:48982}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"60%"}}}},castSpell:{spellId:{spellId:48707}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentHealthPercent:{}},rhs:{const:{val:"60%"}}}},castSpell:{spellId:{spellId:48743}}}},{action:{condition:{cmp:{op:"OpGe",lhs:{currentRunicPower:{}},rhs:{const:{val:"40"}}}},castSpell:{spellId:{spellId:56815}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:55095}}}}},castSpell:{spellId:{spellId:59131}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:55078}}}}},castSpell:{spellId:{tag:1,spellId:49921}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{dotRemainingTime:{spellId:{spellId:55078}}},rhs:{const:{val:"3s"}}}},castSpell:{spellId:{spellId:50842}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpGt",lhs:{currentNonDeathRuneCount:{runeType:"RuneFrost"}},rhs:{const:{val:"0"}}}},{cmp:{op:"OpGt",lhs:{currentNonDeathRuneCount:{runeType:"RuneUnholy"}},rhs:{const:{val:"0"}}}}]}},castSpell:{spellId:{tag:1,spellId:49924}}}},{action:{condition:{cmp:{op:"OpGt",lhs:{currentRuneCount:{runeType:"RuneDeath"}},rhs:{const:{val:"0"}}}},castSpell:{spellId:{spellId:59131}}}},{action:{condition:{or:{vals:[{cmp:{op:"OpGt",lhs:{currentNonDeathRuneCount:{runeType:"RuneBlood"}},rhs:{const:{val:"1"}}}},{spellIsReady:{spellId:{spellId:47568}}}]}},castSpell:{spellId:{tag:1,spellId:49930}}}},{action:{castSpell:{spellId:{spellId:46584}}}},{action:{castSpell:{spellId:{spellId:47568}}}},{action:{condition:{cmp:{op:"OpGe",lhs:{currentRunicPower:{}},rhs:{const:{val:"80"}}}},castSpell:{spellId:{spellId:49895}}}}]},K={items:[{id:46120,enchant:3878,gems:[41380,36767]},{id:45485,gems:[40008]},{id:46122,enchant:3852,gems:[40008]},{id:45496,enchant:3605,gems:[40022]},{id:46118,gems:[36767,36767]},{id:45111,enchant:3850,gems:[0]},{id:46119,enchant:3860,gems:[40008,0]},{id:45551,gems:[40008,40008,40008]},{id:45594,enchant:3822,gems:[40008,40008,40008]},{id:45988,enchant:3232,gems:[40008,40008]},{id:45471,gems:[40008]},{id:45326},{id:45158},{id:46021},{id:45533,enchant:3370,gems:[40008,40008]},{},{id:45144}]},W={items:[{id:49467,enchant:3878,gems:[41380,40119]},{id:47133,gems:[40119]},{id:47698,enchant:3852,gems:[40119]},{id:47549,enchant:3294,gems:[40119]},{id:46968,enchant:3297,gems:[40119,40119,40119]},{id:47111,enchant:3850,gems:[40119,0]},{id:45487,enchant:3860,gems:[40119,40119,0]},{id:47076,gems:[40130,36767,36767]},{id:47061,enchant:3327,gems:[40119,40119,40119]},{id:47003,enchant:4223,gems:[40119,40119]},{id:49489},{id:47955,gems:[36767]},{id:47088},{id:45158},{id:47515,enchant:3847,gems:[40119,40119]},{},{id:47672}]},j={items:[{id:50640,enchant:3878,gems:[41380,40130]},{id:50682,gems:[40119]},{id:51309,enchant:3852,gems:[40119]},{id:50718,enchant:3294,gems:[40119]},{id:51305,enchant:3297,gems:[40119,40119]},{id:51901,enchant:3757,gems:[40119,0]},{id:51307,enchant:3860,gems:[40119,0]},{id:50691,gems:[40119,40119,40119]},{id:51308,enchant:3327,gems:[40119,40119]},{id:50625,enchant:4223,gems:[40119,40119]},{id:50404,gems:[40119]},{id:50622,gems:[40119]},{id:50344},{id:50364},{id:50735,enchant:3847,gems:[40119,40119,40119]},{},{id:50462}]},_=l("P1 Blood",{items:[{id:40565,enchant:3878,gems:[41380,36767]},{id:40387},{id:39704,enchant:3852,gems:[40008]},{id:40252,enchant:3605},{id:40559,gems:[40008,40022]},{id:40306,enchant:3850,gems:[40008,0]},{id:40563,enchant:3860,gems:[40008,0]},{id:39759,gems:[40008,40008]},{id:40567,enchant:3822,gems:[40008,40008]},{id:40297,enchant:3232},{id:40718},{id:40107},{id:44063,gems:[36767,36767]},{id:42341,gems:[40008,40008]},{id:40406,enchant:3847},{},{id:40207}]}),q=l("P2 Blood",K),J=l("P3 Blood",W),Q=l("P4 Blood",j),X=s("Blood Icy Touch",V),Y=s("Blood Aggro",z),Z={name:"Blood",data:y.create({})},$={name:"Blood Aggro",data:y.create({})},ee={name:"2B Blood",data:y.create({})},te=R.create({classOptions:{startingRunicPower:0}}),ae=O.create({flask:B.FlaskOfStoneblood,food:T.FoodDragonfinFilet,defaultPotion:H.EarthenPotion,prepopPotion:H.EarthenPotion}),le=n(N.SpecBloodDeathKnight,{cssClass:"blood-death-knight-sim-ui",cssScheme:C.getCssClass(C.DeathKnight),knownIssues:["<p>Defensive CDs use is very basic and wip.</p>"],epStats:[w.StatStamina,w.StatStrength,w.StatAgility,w.StatAttackPower,w.StatExpertise,w.StatMeleeHit,w.StatMeleeCrit,w.StatMeleeHaste,w.StatSpellHit,w.StatSpellCrit,w.StatSpellHaste,w.StatHealth,w.StatArmor,w.StatBonusArmor,w.StatArmorPenetration,w.StatDefense,w.StatDodge,w.StatParry,w.StatResilience,w.StatSpellHit,w.StatNatureResistance,w.StatShadowResistance,w.StatFrostResistance],epPseudoStats:[D.PseudoStatMainHandDps,D.PseudoStatOffHandDps],epReferenceStat:w.StatAttackPower,displayStats:[w.StatHealth,w.StatArmor,w.StatBonusArmor,w.StatStamina,w.StatStrength,w.StatAgility,w.StatAttackPower,w.StatExpertise,w.StatSpellHit,w.StatSpellCrit,w.StatMeleeHit,w.StatMeleeCrit,w.StatMeleeHaste,w.StatArmorPenetration,w.StatDefense,w.StatDodge,w.StatParry,w.StatResilience,w.StatNatureResistance,w.StatShadowResistance,w.StatFrostResistance],defaults:{gear:q.gear,epWeights:k.fromMap({[w.StatArmor]:.05,[w.StatBonusArmor]:.03,[w.StatStamina]:1,[w.StatStrength]:.33,[w.StatAgility]:.6,[w.StatAttackPower]:.06,[w.StatExpertise]:.67,[w.StatMeleeHit]:.67,[w.StatMeleeCrit]:.28,[w.StatMeleeHaste]:.21,[w.StatArmorPenetration]:.19,[w.StatBlock]:.35,[w.StatBlockValue]:.59,[w.StatDodge]:.7,[w.StatParry]:.58,[w.StatDefense]:.8},{[D.PseudoStatMainHandDps]:3.1,[D.PseudoStatOffHandDps]:0}),consumes:ae,talents:Z.data,specOptions:te,raidBuffs:E.create({blessingOfMight:!0,retributionAura:!0,powerWordFortitude:!0,markOfTheWild:!0,strengthOfEarthTotem:!0,icyTalons:!0,abominationsMight:!0,leaderOfThePack:!0,bloodlust:!0,devotionAura:!0,stoneskinTotem:!0}),partyBuffs:M.create({}),individualBuffs:L.create({}),debuffs:F.create({bloodFrenzy:!0,sunderArmor:!0,ebonPlaguebringer:!0,mangle:!0,criticalMass:!0,demoralizingShout:!0,frostFever:!0,judgement:!0})},playerIconInputs:[],rotationInputs:G,includeBuffDebuffInputs:[o],excludeBuffDebuffInputs:[],otherInputs:{inputs:[i,c,r,d,p,h,m,u,e({fieldName:"startingRunicPower",label:"Starting Runic Power",labelTooltip:"Initial RP at the start of each iteration."}),S]},encounterPicker:{showExecuteProportion:!1},presets:{rotations:[X,Y],talents:[Z,$,ee],gear:[_,q,J,Q]},autoRotation:e=>X.rotation.rotation,raidSimPresets:[{spec:N.SpecBloodDeathKnight,talents:Z.data,specOptions:te,consumes:ae,defaultFactionRaces:{[x.Unknown]:U.RaceUnknown,[x.Alliance]:U.RaceHuman,[x.Horde]:U.RaceTroll},defaultGear:{[x.Unknown]:{},[x.Alliance]:{1:_.gear,2:q.gear,3:J.gear,4:Q.gear},[x.Horde]:{1:_.gear,2:q.gear,3:J.gear,4:Q.gear}}}]});class se extends g{constructor(e,t){super(e,t,le)}}export{se as B};
//# sourceMappingURL=sim-OR1s1z0u.chunk.js.map
