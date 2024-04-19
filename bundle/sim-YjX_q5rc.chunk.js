import{o as e,p as a,q as t,a4 as s,J as l,K as n,Z as o,L as i,a0 as r,T as p,a6 as c,Q as d,D as h,z as m}from"./preset_utils-BI4Zd4bY.chunk.js";import{O as S,G as u,aV as I,aW as f,aX as g,aY as O,aT as y,V as T,W as v,X as P,Y as w,a0 as F,a2 as k,a3 as A,b as C,a as G,Z as R,$ as b,a1 as L,S as H,F as M,R as D}from"./detailed_results-BMSIvwql.chunk.js";import{A as W}from"./inputs-B0VPvBmh.chunk.js";const j={type:"TypeAPL",prepullActions:[{action:{castSpell:{spellId:{otherId:"OtherActionPotion"}}},doAtValue:{const:{val:"-1s"}}},{action:{castSpell:{spellId:{spellId:73510}}},doAtValue:{const:{val:"-1s"}}}],priorityList:[{action:{condition:{cmp:{op:"OpLt",lhs:{currentTime:{}},rhs:{const:{val:"1s"}}}},castSpell:{spellId:{spellId:34433}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{currentTime:{}},rhs:{const:{val:"2s"}}}},autocastOtherCooldowns:{}}},{action:{condition:{cmp:{op:"OpGt",lhs:{currentTime:{}},rhs:{const:{val:"1m"}}}},autocastOtherCooldowns:{}}},{action:{condition:{or:{vals:[{cmp:{op:"OpEq",lhs:{auraNumStacks:{auraId:{spellId:92325}}},rhs:{const:{val:"5"}}}},{cmp:{op:"OpLe",lhs:{remainingTime:{}},rhs:{const:{val:"25s"}}}}]}},castSpell:{spellId:{itemId:65110}}}},{action:{condition:{not:{val:{dotIsActive:{spellId:{spellId:589}}}}},castSpell:{spellId:{spellId:589}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{dotRemainingTime:{spellId:{spellId:2944}}},rhs:{dotTickFrequency:{spellId:{spellId:2944}}}}},castSpell:{spellId:{spellId:2944}}}},{action:{condition:{cmp:{op:"OpLt",lhs:{dotRemainingTime:{spellId:{spellId:34914}}},rhs:{math:{op:"OpAdd",lhs:{spellCastTime:{spellId:{spellId:34914}}},rhs:{dotTickFrequency:{spellId:{spellId:34914}}}}}}},castSpell:{spellId:{spellId:34914}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpLt",lhs:{currentTime:{}},rhs:{const:{val:"10s"}}}},{not:{val:{auraIsActive:{auraId:{spellId:77487}}}}},{not:{val:{auraIsActive:{auraId:{spellId:95799}}}}}]}},castSpell:{spellId:{spellId:15407}}}},{action:{condition:{and:{vals:[{cmp:{op:"OpEq",lhs:{auraNumStacks:{auraId:{spellId:87118}}},rhs:{const:{val:"5"}}}},{cmp:{op:"OpGt",lhs:{dotRemainingTime:{spellId:{spellId:34914}}},rhs:{const:{val:"5s"}}}},{cmp:{op:"OpGt",lhs:{dotRemainingTime:{spellId:{spellId:2944}}},rhs:{const:{val:"5s"}}}}]}},castSpell:{spellId:{spellId:87153}}}},{action:{condition:{and:{vals:[{spellCanCast:{spellId:{spellId:32379}}},{isExecutePhase:{threshold:"E25"}}]}},castSpell:{spellId:{spellId:32379}}}},{action:{castSpell:{spellId:{spellId:34433}}}},{action:{castSpell:{spellId:{spellId:8092}}}},{action:{channelSpell:{spellId:{spellId:15407},interruptIf:{cmp:{op:"OpLe",lhs:{gcdTimeToReady:{}},rhs:{channelClipDelay:{}}}}}}}]},B=e("P1 Preset",{items:[{id:60237,enchant:4207,gems:[68780,52236],reforging:141},{id:65112,reforging:162},{id:65238,enchant:4200,gems:[52207]},{id:67131,enchant:4115,gems:[52208]},{id:65237,enchant:4102,gems:[52207,52207],reforging:141},{id:60238,enchant:4108,gems:[52208,0]},{id:65234,enchant:4068,gems:[52239,0],reforging:162},{id:72883,gems:[52208,52207],reforging:145},{id:65236,enchant:4110,gems:[52232,52207]},{id:65069,enchant:4069,gems:[52207],reforging:162},{id:65076,enchant:4080},{id:65123,enchant:4080,reforging:162},{id:65105},{id:65110},{id:65041,enchant:4097},{id:65133,enchant:4091},{id:65064,reforging:167}]}),E=a("Default",j),V={name:"Standard",data:S.create({talentsString:"032212--322032210201222100231",glyphs:u.create({prime1:I.GlyphOfShadowWordPain,prime2:I.GlyphOfMindFlay,prime3:I.GlyphOfShadowWordDeath,major1:f.GlyphOfFade,major2:f.GlyphOfInnerFire,major3:f.GlyphOfSpiritTap,minor1:g.GlyphOfFading,minor2:g.GlyphOfFortitude,minor3:g.GlyphOfShadowfiend})})},q=O.create({classOptions:{armor:y.InnerFire}}),x=T.create({flask:v.FlaskOfTheDraconicMind,food:P.FoodSeafoodFeast,defaultPotion:w.VolcanicPotion,prepopPotion:w.VolcanicPotion}),z=F.create({arcaneBrilliance:!0,bloodlust:!0,markOfTheWild:!0,icyTalons:!0,moonkinForm:!0,leaderOfThePack:!0,powerWordFortitude:!0,strengthOfEarthTotem:!0,trueshotAura:!0,wrathOfAirTotem:!0,demonicPact:!0,blessingOfKings:!0,blessingOfMight:!0,communion:!0}),U=k.create({vampiricTouch:!0}),Y=A.create({bloodFrenzy:!0,sunderArmor:!0,ebonPlaguebringer:!0,mangle:!0,criticalMass:!0,demoralizingShout:!0,frostFever:!0,judgement:!0}),K={channelClipDelay:100,distanceFromTarget:20,profession1:C.Enchanting,profession2:C.Tailoring},N=t(H.SpecShadowPriest,{cssClass:"shadow-priest-sim-ui",cssScheme:G.getCssClass(G.Priest),knownIssues:["Some items may display and use stats a litle higher than their original value."],epStats:[R.StatIntellect,R.StatSpirit,R.StatSpellPower,R.StatSpellHit,R.StatSpellCrit,R.StatSpellHaste,R.StatMastery],epReferenceStat:R.StatSpellPower,displayStats:[R.StatHealth,R.StatMana,R.StatStamina,R.StatIntellect,R.StatSpirit,R.StatSpellPower,R.StatSpellHit,R.StatSpellCrit,R.StatSpellHaste,R.StatMastery],defaults:{gear:B.gear,epWeights:b.fromMap({[R.StatIntellect]:1.2,[R.StatSpirit]:.47,[R.StatSpellPower]:1,[R.StatSpellHit]:.87,[R.StatSpellCrit]:.74,[R.StatSpellHaste]:.87,[R.StatMastery]:.58}),consumes:x,talents:V.data,specOptions:q,raidBuffs:z,partyBuffs:L.create({}),individualBuffs:U,debuffs:Y,other:K},playerIconInputs:[W()],includeBuffDebuffInputs:[s,l,n,o,i,r],excludeBuffDebuffInputs:[],otherInputs:{inputs:[p,c,d,h]},encounterPicker:{showExecuteProportion:!0},presets:{talents:[V],rotations:[E],gear:[B]},autoRotation:e=>E.rotation.rotation,raidSimPresets:[{spec:H.SpecShadowPriest,talents:V.data,specOptions:q,consumes:x,defaultFactionRaces:{[M.Unknown]:D.RaceUnknown,[M.Alliance]:D.RaceWorgen,[M.Horde]:D.RaceTroll},defaultGear:{[M.Unknown]:{},[M.Alliance]:{1:B.gear},[M.Horde]:{1:B.gear}}}]});class X extends m{constructor(e,a){super(e,a,N)}}export{X as S};
//# sourceMappingURL=sim-YjX_q5rc.chunk.js.map
