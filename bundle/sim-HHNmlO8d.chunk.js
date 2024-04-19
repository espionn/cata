import{V as e,o as t,X as a,p as s,q as n,R as l,Q as i,T as o,z as r}from"./preset_utils-BI4Zd4bY.chunk.js";import{T as c,F as d,aL as p,S as m,O as g,aM as u,aE as h,V as S,Y as I,aF as f,W as A,X as P,b as F,a as T,Z as v,$ as O,a0 as C,a1 as w,a2 as k,a3 as M,aH as y,an as L,ao as b,ap as H,R}from"./detailed_results-BMSIvwql.chunk.js";import{s as E}from"./apl_utils-YVupLIXZ.chunk.js";import{A as J}from"./inputs-DlON7Lc4.chunk.js";const W={inputs:[e({fieldName:"useIceLance",label:"Use Ice Lance",labelTooltip:"Casts Ice Lance at the end of Fingers of Frost, after using Deep Freeze.",showWhen:e=>2==e.getTalentTree(),changeEmitter:e=>c.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])})]},j={type:"TypeAPL",prepullActions:[{action:{castSpell:{spellId:{spellId:55342}}},doAtValue:{const:{val:"-2s"}}},{action:{castSpell:{spellId:{otherId:"OtherActionPotion"}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{not:{val:{auraIsActive:{auraId:{spellId:12472}}}}},castSpell:{spellId:{spellId:26297}}}},{action:{condition:{not:{val:{auraIsActive:{auraId:{spellId:12472}}}}},castSpell:{spellId:{spellId:54758}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{currentManaPercent:{}},rhs:{const:{val:"25%"}}}},castSpell:{spellId:{spellId:12051}}}},{action:{condition:{auraIsActive:{auraId:{spellId:44545}}},castSpell:{spellId:{spellId:44572}}}},{action:{condition:{auraIsActiveWithReactionTime:{auraId:{spellId:44549}}},castSpell:{spellId:{spellId:47610}}}},{action:{castSpell:{spellId:{spellId:42842}}}}]},B={type:"TypeAPL",prepullActions:[],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{castSpell:{spellId:{spellId:42939}}}}]},D={items:[{id:45497,enchant:3820,gems:[41285,45883]},{id:45133,gems:[40051]},{id:46134,enchant:3810,gems:[39998]},{id:45618,enchant:3722,gems:[40026]},{id:46130,enchant:3832,gems:[39998,39998]},{id:45446,enchant:2332,gems:[39998,0]},{id:45665,enchant:3604,gems:[39998,39998,0]},{id:45619,gems:[40049,40049,39998]},{id:45488,enchant:3719,gems:[39998,40051,40026]},{id:45135,enchant:4223,gems:[39998,40049]},{id:46046,gems:[39998]},{id:45495,gems:[39998]},{id:45466},{id:45518},{id:45620,enchant:3834,gems:[40026]},{id:45617},{id:45294,gems:[39998]}]},V={items:[{id:47761,enchant:3820,gems:[41285,40133]},{id:47144,gems:[40155]},{id:47758,enchant:3810,gems:[40133]},{id:47552,enchant:3722,gems:[40113]},{id:47129,enchant:3832,gems:[40133,40153,40155]},{id:47208,enchant:2332,gems:[40155,0]},{id:47762,enchant:3604,gems:[40113,0]},{id:46973,gems:[40133,40113,40113]},{id:47760,enchant:3719,gems:[40155,40155]},{id:47097,enchant:4223,gems:[40133,40113]},{id:45495,gems:[40133]},{id:46046,gems:[40155]},{id:47188},{id:45518},{id:47517,enchant:3834,gems:[40155]},{id:47958,gems:[40155]},{id:45294,gems:[40113]}]},x={items:[{id:47764,enchant:3820,gems:[41285,40133]},{id:47468,gems:[40155]},{id:47767,enchant:3810,gems:[40133]},{id:47551,enchant:3722,gems:[40113]},{id:47462,enchant:3832,gems:[40133,40155,40155]},{id:47485,enchant:2332,gems:[40155,0]},{id:47763,enchant:3604,gems:[40113,0]},{id:47419,gems:[40133,40113,40113]},{id:47765,enchant:3719,gems:[40155,40155]},{id:47454,enchant:4223,gems:[40133,40113]},{id:45495,gems:[40133]},{id:46046,gems:[40113]},{id:47477},{id:45518},{id:47422,enchant:3834,gems:[40155]},{id:48032,gems:[40155]},{id:45294,gems:[40113]}]},U=t("Frost P1 Preset",{items:[{id:40416,enchant:3820,gems:[41285,39998]},{id:44661,gems:[40026]},{id:40419,enchant:3810,gems:[40051]},{id:44005,enchant:3722,gems:[40026]},{id:40418,enchant:3832,gems:[39998,40048]},{id:44008,enchant:2332,gems:[39998,0]},{id:40415,enchant:3604,gems:[39998,0]},{id:40301,gems:[39998]},{id:40560,enchant:3719},{id:40558,enchant:4223},{id:40399},{id:40719},{id:40255},{id:40432},{id:40396,enchant:3834},{id:39766},{id:39712}]},{talentTree:2}),_=t("Frost P2 Preset",D,{talentTree:2}),q=t("Frost P3 Preset [A]",V,{talentTree:2,faction:d.Alliance}),z=t("Frost P3 Preset [H]",x,{talentTree:2,faction:d.Horde}),G=p.create({useIceLance:!1}),N=a("Simple Default",m.SpecFrostMage,G),Q=s("Frost",j,{talentTree:2}),X=s("Frost AOE",B,{talentTree:2}),K={name:"Frost",data:g.create({})},Y=u.create({classOptions:{armor:h.MoltenArmor},waterElementalDisobeyChance:.1}),Z=S.create({defaultPotion:I.PotionOfSpeed,defaultConjured:f.ConjuredFlameCap,flask:A.FlaskOfTheFrostWyrm,food:P.FoodFishFeast}),$={distanceFromTarget:20,profession1:F.Engineering,profession2:F.Tailoring},ee=n(m.SpecFrostMage,{cssClass:"frost-mage-sim-ui",cssScheme:T.getCssClass(T.Mage),knownIssues:[],epStats:[v.StatIntellect,v.StatSpirit,v.StatSpellPower,v.StatSpellHit,v.StatSpellCrit,v.StatSpellHaste,v.StatMP5],epReferenceStat:v.StatSpellPower,displayStats:[v.StatHealth,v.StatMana,v.StatStamina,v.StatIntellect,v.StatSpirit,v.StatSpellPower,v.StatSpellHit,v.StatSpellCrit,v.StatSpellHaste,v.StatMP5],defaults:{gear:z.gear,epWeights:O.fromMap({[v.StatIntellect]:.48,[v.StatSpirit]:.42,[v.StatSpellPower]:1,[v.StatSpellHit]:.38,[v.StatSpellCrit]:.58,[v.StatSpellHaste]:.94,[v.StatMP5]:.09}),consumes:Z,talents:K.data,specOptions:Y,other:$,raidBuffs:C.create({arcaneBrilliance:!0,bloodlust:!0,markOfTheWild:!0,icyTalons:!0,moonkinForm:!0,leaderOfThePack:!0,powerWordFortitude:!0,strengthOfEarthTotem:!0,trueshotAura:!0,wrathOfAirTotem:!0,demonicPact:!0,blessingOfKings:!0,blessingOfMight:!0,communion:!0}),partyBuffs:w.create({manaTideTotems:1}),individualBuffs:k.create({innervateCount:0,vampiricTouch:!0,focusMagic:!0}),debuffs:M.create({judgement:!0,ebonPlaguebringer:!0,shadowAndFlame:!0})},playerIconInputs:[J()],rotationInputs:W,includeBuffDebuffInputs:[],excludeBuffDebuffInputs:[],otherInputs:{inputs:[l,i,o]},encounterPicker:{showExecuteProportion:!0},presets:{rotations:[N,Q,X],talents:[K],gear:[U,_,q,z]},autoRotation:e=>e.sim.encounter.targets.length>3?X.rotation.rotation:Q.rotation.rotation,simpleRotation:(e,t,a)=>{const[s,n]=E(a),l=y.fromJsonString('{"action":{"castSpell":{"spellId":{"spellId":55342}}},"doAtValue":{"const":{"val":"-2s"}}}'),i=L.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"spellId":26297}}}'),o=L.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"spellId":54758}}}'),r=L.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"otherId":"OtherActionPotion"}}}'),c=L.fromJsonString('{"condition":{"cmp":{"op":"OpLe","lhs":{"currentManaPercent":{}},"rhs":{"const":{"val":"25%"}}}},"castSpell":{"spellId":{"spellId":12051}}}'),d=L.fromJsonString('{"condition":{"auraIsActive":{"auraId":{"spellId":44545}}},"castSpell":{"spellId":{"spellId":44572}}}'),p=L.fromJsonString('{"condition":{"auraIsActiveWithReactionTime":{"auraId":{"spellId":44549}}},"castSpell":{"spellId":{"spellId":47610}}}'),m=L.fromJsonString('{"castSpell":{"spellId":{"spellId":42842}}}'),g=L.fromJsonString('{"condition":{"cmp":{"op":"OpEq","lhs":{"auraNumStacks":{"auraId":{"spellId":44545}}},"rhs":{"const":{"val":"1"}}}},"castSpell":{"spellId":{"spellId":42914}}}');return s.push(l),n.push(...[i,o,r,c,d,p,t.useIceLance?g:null,m].filter((e=>e))),b.create({prepullActions:s,priorityList:n.map((e=>H.create({action:e})))})},raidSimPresets:[{spec:m.SpecFrostMage,talents:K.data,specOptions:Y,consumes:Z,otherDefaults:$,defaultFactionRaces:{[d.Unknown]:R.RaceUnknown,[d.Alliance]:R.RaceGnome,[d.Horde]:R.RaceTroll},defaultGear:{[d.Unknown]:{},[d.Alliance]:{1:U.gear,2:_.gear,3:q.gear},[d.Horde]:{1:U.gear,2:_.gear,3:z.gear}}}]});class te extends r{constructor(e,t){super(e,t,ee)}}export{te as F};
//# sourceMappingURL=sim-HHNmlO8d.chunk.js.map
