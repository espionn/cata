import{n as e,V as t,o as a,X as s,p as l,q as n,R as i,Q as o,T as d,D as r,z as c}from"./preset_utils-BI4Zd4bY.chunk.js";import{aI as p,T as m,F as g,aJ as h,S as I,O as S,aK as u,aE as f,V as v,W as T,X as A,Y as F,aF as P,b as O,a as y,Z as w,$ as C,a0 as b,a1 as k,a2 as J,a3 as H,aH as M,an as R,ao as x,ap as E,R as B}from"./detailed_results-BMSIvwql.chunk.js";import{s as L}from"./apl_utils-YVupLIXZ.chunk.js";import{A as W}from"./inputs-DlON7Lc4.chunk.js";const D={inputs:[e({fieldName:"primaryFireSpell",label:"Primary Spell",values:[{name:"Fireball",value:p.Fireball},{name:"Frostfire Bolt",value:p.FrostfireBolt},{name:"Scorch",value:p.Scorch}],showWhen:e=>1==e.getTalentTree(),changeEmitter:e=>m.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])}),t({fieldName:"maintainImprovedScorch",label:"Maintain Imp. Scorch",labelTooltip:"Always use Scorch when below 5 stacks, or < 4s remaining on debuff.",showWhen:e=>e.getTalents().improvedScorch>0,changeEmitter:e=>m.onAny([e.rotationChangeEmitter,e.talentsChangeEmitter])})]},j={type:"TypeAPL",prepullActions:[{action:{castSpell:{spellId:{spellId:55342}}},doAtValue:{const:{val:"-2s"}}},{action:{castSpell:{spellId:{otherId:"OtherActionPotion"}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{auraShouldRefresh:{auraId:{spellId:12873},maxOverlap:{const:{val:"4s"}}}},castSpell:{spellId:{spellId:42859}}}},{action:{condition:{auraIsActiveWithReactionTime:{auraId:{spellId:44448}}},castSpell:{spellId:{spellId:42891}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpGt",lhs:{remainingTime:{}},rhs:{const:{val:"12s"}}}}]}},multidot:{spellId:{spellId:55360},maxDots:10,maxOverlap:{const:{val:"0ms"}}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{remainingTime:{}},rhs:{spellCastTime:{spellId:{spellId:42859}}}}},castSpell:{spellId:{spellId:42873}}}},{action:{condition:{cmp:{op:"OpLe",lhs:{remainingTime:{}},rhs:{const:{val:"4s"}}}},castSpell:{spellId:{spellId:42859}}}},{action:{castSpell:{spellId:{spellId:42833}}}}]},G={type:"TypeAPL",prepullActions:[],priorityList:[{action:{autocastOtherCooldowns:{}}},{action:{condition:{cmp:{op:"OpGe",lhs:{remainingTime:{}},rhs:{const:{val:"12s"}}}},multidot:{spellId:{spellId:55360},maxDots:10,maxOverlap:{const:{val:"0ms"}}}}},{action:{condition:{and:{vals:[{auraIsActive:{auraId:{spellId:54741}}},{not:{val:{dotIsActive:{spellId:{spellId:42926,tag:9}}}}}]}},castSpell:{spellId:{spellId:42926,tag:9}}}},{action:{condition:{and:{vals:[{auraIsActive:{auraId:{spellId:54741}}},{not:{val:{dotIsActive:{spellId:{spellId:42925,tag:8}}}}}]}},castSpell:{spellId:{spellId:42925,tag:8}}}},{action:{condition:{or:{vals:[{not:{val:{dotIsActive:{spellId:{spellId:42926,tag:9}}}}},{not:{val:{dotIsActive:{spellId:{spellId:42925,tag:8}}}}}]}},castSpell:{spellId:{spellId:42950}}}},{action:{condition:{or:{vals:[{not:{val:{dotIsActive:{spellId:{spellId:42926,tag:9}}}}},{not:{val:{dotIsActive:{spellId:{spellId:42925,tag:8}}}}}]}},castSpell:{spellId:{spellId:42945}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:42926,tag:9}}}}},castSpell:{spellId:{spellId:42926,tag:9}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:42925,tag:8}}}}},castSpell:{spellId:{spellId:42925,tag:8}}}},{action:{condition:{auraIsActiveWithReactionTime:{auraId:{spellId:44448}}},castSpell:{spellId:{spellId:42891}}}},{action:{castSpell:{spellId:{spellId:42921}}}}]},V={items:[{id:40416,enchant:3820,gems:[41285,39998]},{id:44661,gems:[40026]},{id:40419,enchant:3810,gems:[40049]},{id:44005,enchant:3722,gems:[40026]},{id:40418,enchant:3832,gems:[39998,40048]},{id:44008,enchant:2332,gems:[39998,0]},{id:40415,enchant:3604,gems:[39998,0]},{id:40301,gems:[39998]},{id:40560,enchant:3719},{id:40246,enchant:4223},{id:40399},{id:40719},{id:40255},{id:40432},{id:40396,enchant:3834},{id:40273},{id:39712}]},U={items:[{id:46129,enchant:3820,gems:[41285,45883]},{id:45133,gems:[40048]},{id:46134,enchant:3810,gems:[39998]},{id:45242,enchant:3722,gems:[39998]},{id:46130,enchant:3832,gems:[39998,39998]},{id:45446,enchant:2332,gems:[39998,0]},{id:45665,enchant:3604,gems:[40026,40048,0]},{id:45619,gems:[40048,40048,39998]},{id:46133,enchant:3719,gems:[39998,39998]},{id:45537,enchant:4223,gems:[39998,40026]},{id:45495,gems:[39998]},{id:46046,gems:[39998]},{id:45466},{id:45518},{id:45620,enchant:3834,gems:[39998]},{id:45617},{id:45294,gems:[39998]}]},_={items:[{id:47761,enchant:3820,gems:[41285,40133]},{id:47144,gems:[40155]},{id:47758,enchant:3810,gems:[40133]},{id:47552,enchant:3722,gems:[40113]},{id:47129,enchant:3832,gems:[40133,40153,40113]},{id:47208,enchant:2332,gems:[40133,0]},{id:47762,enchant:3604,gems:[40113,0]},{id:47084,gems:[40133,40113,40113]},{id:47760,enchant:3719,gems:[40155,40155]},{id:47097,enchant:4223,gems:[40133,40113]},{id:45495,gems:[40133]},{id:47237,gems:[40155]},{id:47188},{id:45518},{id:47517,enchant:3834,gems:[40155]},{id:47064},{id:45294,gems:[40153]}]},K={items:[{id:47764,enchant:3820,gems:[41285,40133]},{id:47468,gems:[40155]},{id:47767,enchant:3810,gems:[40133]},{id:47551,enchant:3722,gems:[40113]},{id:47462,enchant:3832,gems:[40133,40155,40113]},{id:47467,enchant:2332,gems:[40155,0]},{id:47763,enchant:3604,gems:[40113,0]},{id:47447,gems:[40133,40113,40113]},{id:47765,enchant:3719,gems:[40155,40155]},{id:47454,enchant:4223,gems:[40133,40113]},{id:45495,gems:[40133]},{id:47489,gems:[40155]},{id:47477},{id:45518},{id:47518,enchant:3834,gems:[40155]},{id:47437},{id:45294,gems:[40113]}]},N={items:[{id:51281,enchant:3820,gems:[41285,40133]},{id:50724,gems:[40133]},{id:51284,enchant:3810,gems:[40152]},{id:50628,enchant:3722,gems:[40152]},{id:50629,enchant:3832,gems:[40113,40133,40155]},{id:50686,enchant:2332,gems:[40133,0]},{id:51280,enchant:3604,gems:[40133,0]},{id:50613,enchant:3601,gems:[40133,40113,40113]},{id:51282,enchant:3872,gems:[40133,40152]},{id:50699,enchant:4223,gems:[40133,40113]},{id:50664,gems:[40133]},{id:50398,gems:[40152]},{id:50365},{id:50348},{id:50732,enchant:3834,gems:[40113]},{id:50719},{id:50684,gems:[40153]}]},Q={items:[{id:51281,enchant:3820,gems:[41285,40133]},{id:50724,gems:[40133]},{id:51284,enchant:3810,gems:[40152]},{id:50628,enchant:3722,gems:[40152]},{id:50629,enchant:3832,gems:[40113,40133,40152]},{id:50651,enchant:2332,gems:[40152,0]},{id:51280,enchant:3604,gems:[40133,0]},{id:50613,enchant:3601,gems:[40133,40113,40113]},{id:51282,enchant:3872,gems:[40133,40152]},{id:50699,enchant:4223,gems:[40133,40113]},{id:50664,gems:[40133]},{id:50398,gems:[40152]},{id:50365},{id:50348},{id:50732,enchant:3834,gems:[40113]},{id:50719},{id:50684,gems:[40152]}]},X=a("Fire Preraid Preset",{items:[{id:42553,enchant:3820,gems:[41285,40014]},{id:39472},{id:34210,enchant:3810,gems:[40049,40014]},{id:41610,enchant:3859},{id:39492,enchant:3832,gems:[40049,40014]},{id:37361,enchant:2332,gems:[0]},{id:39495,enchant:3604,gems:[40049,0]},{id:40696,gems:[40014,40026]},{id:37854,enchant:3719},{id:44202,enchant:3826,gems:[40026]},{id:40585},{id:42644,gems:[40049]},{id:37873},{id:40682},{id:45085,enchant:3834},{id:40698},{id:37177}]},{talentTree:1}),q=a("Fire P1 Preset",V,{talentTree:1}),z=a("Fire P2 Preset",U,{talentTree:1}),Y=a("Fire P3 Preset [A]",_,{talentTree:1,faction:g.Alliance}),Z=a("Fire P3 Preset [H]",K,{talentTree:1,faction:g.Horde}),$=a("Fire P4 Preset [A]",N,{talentTree:1,faction:g.Alliance}),ee=a("Fire P4 Preset [H]",Q,{talentTree:1,faction:g.Horde}),te=h.create({primaryFireSpell:p.Fireball,maintainImprovedScorch:!1}),ae=s("Simple Default",I.SpecFireMage,te),se=l("Fire",j,{talentTree:1}),le=l("Fire AOE",G,{talentTree:1}),ne={name:"Fire",data:S.create({})},ie=u.create({classOptions:{armor:f.MoltenArmor}}),oe=v.create({flask:T.FlaskOfTheFrostWyrm,food:A.FoodFirecrackerSalmon,defaultPotion:F.PotionOfSpeed,defaultConjured:P.ConjuredFlameCap,prepopPotion:F.PotionOfSpeed}),de={distanceFromTarget:20,profession1:O.Engineering,profession2:O.Tailoring},re=n(I.SpecFireMage,{cssClass:"fire-mage-sim-ui",cssScheme:y.getCssClass(y.Mage),knownIssues:[],epStats:[w.StatIntellect,w.StatSpirit,w.StatSpellPower,w.StatSpellHit,w.StatSpellCrit,w.StatSpellHaste,w.StatMP5],epReferenceStat:w.StatSpellPower,displayStats:[w.StatHealth,w.StatMana,w.StatStamina,w.StatIntellect,w.StatSpirit,w.StatSpellPower,w.StatSpellHit,w.StatSpellCrit,w.StatSpellHaste,w.StatMP5],defaults:{gear:Z.gear,epWeights:C.fromMap({[w.StatIntellect]:.48,[w.StatSpirit]:.42,[w.StatSpellPower]:1,[w.StatSpellHit]:.38,[w.StatSpellCrit]:.58,[w.StatSpellHaste]:.94,[w.StatMP5]:.09}),consumes:oe,talents:ne.data,specOptions:ie,other:de,raidBuffs:b.create({arcaneBrilliance:!0,bloodlust:!0,markOfTheWild:!0,icyTalons:!0,moonkinForm:!0,leaderOfThePack:!0,powerWordFortitude:!0,strengthOfEarthTotem:!0,trueshotAura:!0,wrathOfAirTotem:!0,demonicPact:!0,blessingOfKings:!0,blessingOfMight:!0,communion:!0}),partyBuffs:k.create({manaTideTotems:1}),individualBuffs:J.create({innervateCount:0,vampiricTouch:!0,focusMagic:!0}),debuffs:H.create({judgement:!0,ebonPlaguebringer:!0,shadowAndFlame:!0})},playerIconInputs:[W()],rotationInputs:D,includeBuffDebuffInputs:[],excludeBuffDebuffInputs:[],otherInputs:{inputs:[i,o,d,r]},encounterPicker:{showExecuteProportion:!0},presets:{rotations:[ae,se,le],talents:[ne],gear:[X,q,z,Y,Z,ee,$]},autoRotation:e=>e.sim.encounter.targets.length>3?le.rotation.rotation:se.rotation.rotation,simpleRotation:(e,t,a)=>{const[s,l]=L(a),n=M.fromJsonString('{"action":{"castSpell":{"spellId":{"spellId":55342}}},"doAtValue":{"const":{"val":"-2s"}}}'),i=R.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"spellId":26297}}}'),o=R.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"spellId":54758}}}'),d=R.fromJsonString('{"condition":{"not":{"val":{"auraIsActive":{"auraId":{"spellId":12472}}}}},"castSpell":{"spellId":{"otherId":"OtherActionPotion"}}}'),r=R.fromJsonString('{"condition":{"cmp":{"op":"OpLe","lhs":{"currentManaPercent":{}},"rhs":{"const":{"val":"25%"}}}},"castSpell":{"spellId":{"spellId":12051}}}'),c=R.fromJsonString('{"condition":{"auraShouldRefresh":{"auraId":{"spellId":12873},"maxOverlap":{"const":{"val":"4s"}}}},"castSpell":{"spellId":{"spellId":42859}}}'),m=R.fromJsonString('{"condition":{"auraIsActiveWithReactionTime":{"auraId":{"spellId":44448}}},"castSpell":{"spellId":{"spellId":42891}}}'),g=R.fromJsonString('{"condition":{"and":{"vals":[{"cmp":{"op":"OpGt","lhs":{"remainingTime":{}},"rhs":{"const":{"val":"12s"}}}}]}},"multidot":{"spellId":{"spellId":55360},"maxDots":10,"maxOverlap":{"const":{"val":"0ms"}}}}'),h=R.fromJsonString('{"condition":{"cmp":{"op":"OpLe","lhs":{"remainingTime":{}},"rhs":{"spellCastTime":{"spellId":{"spellId":42859}}}}},"castSpell":{"spellId":{"spellId":42873}}}'),I=R.fromJsonString('{"condition":{"cmp":{"op":"OpLe","lhs":{"remainingTime":{}},"rhs":{"const":{"val":"4s"}}}},"castSpell":{"spellId":{"spellId":42859}}}'),S=R.fromJsonString('{"castSpell":{"spellId":{"spellId":42833}}}'),u=R.fromJsonString('{"castSpell":{"spellId":{"spellId":47610}}}'),f=R.fromJsonString('{"castSpell":{"spellId":{"spellId":42859}}}');return s.push(n),e.getTalents().improvedScorch>0&&t.maintainImprovedScorch&&l.push(c),l.push(...[i,o,d,m,g,h,I,r,t.primaryFireSpell==p.Fireball?S:t.primaryFireSpell==p.FrostfireBolt?u:f].filter((e=>e))),x.create({prepullActions:s,priorityList:l.map((e=>E.create({action:e})))})},raidSimPresets:[{spec:I.SpecFireMage,talents:ne.data,specOptions:ie,consumes:oe,otherDefaults:de,defaultFactionRaces:{[g.Unknown]:B.RaceUnknown,[g.Alliance]:B.RaceGnome,[g.Horde]:B.RaceTroll},defaultGear:{[g.Unknown]:{},[g.Alliance]:{1:q.gear,2:z.gear,3:Y.gear,4:$.gear},[g.Horde]:{1:q.gear,2:z.gear,3:Z.gear,4:ee.gear}}}]});class ce extends c{constructor(e,t){super(e,t,re)}}export{ce as F};
//# sourceMappingURL=sim-BfVX2wFT.chunk.js.map
