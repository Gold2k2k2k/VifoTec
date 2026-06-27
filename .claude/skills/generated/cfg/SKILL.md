---
name: cfg
description: "Skill for the Cfg area of VifoTec. 138 symbols across 28 files."
---

# Cfg

138 symbols | 28 files | Cohesion: 85%

## When to Use

- Working with code in `Skill/`
- Understanding how parse, collectFunctions, cfgOf work
- Modifying cfg-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs.ts` | computeInSetsSparse, newLeaf, newInternal, enterBlock, computeInSetsDense (+13) |
| `Skill/GitNexus/gitnexus/test/unit/cfg/reaching-defs-equivalence.test.ts` | serializeFact, diffDefUse, classify, hasCycleFrom, runCorpus (+11) |
| `Skill/GitNexus/gitnexus/bench/cfg/measure.mjs` | langToolkit, gen, genZero, genTaintFunctions, retainedHeapBytes (+8) |
| `Skill/GitNexus/gitnexus/test/unit/cfg/control-dependence.test.ts` | cdgOf, succsOf, independentPostDom, reach, referencePairs (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | buildDominators, intersect, buildDominanceFrontiers, tarjanScc, condenseReachingSets (+4) |
| `Skill/GitNexus/gitnexus/test/unit/cfg/harvest.test.ts` | allFacts, defsOf, usesOf, allSites, siteFact (+2) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | hasEmitSafeFacts, bindingKey, emitFileReachingDefs, basicBlockId, postDominateDebugEnabled (+1) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts` | resolveBreak, resolveContinue, resolveYield, breakTarget, continueTarget (+1) |
| `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | parse, collectFunctions, cfgOf, cfgsOf |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-dependence.ts` | buildArmSenses, labelFor, computeControlDependence, add |

## Entry Points

Start here when exploring this area:

- **`parse`** (Function) — `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts:38`
- **`collectFunctions`** (Function) — `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts:40`
- **`cfgOf`** (Function) — `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts:54`
- **`cfgsOf`** (Function) — `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts:62`
- **`collectFunctionCfgs`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/collect.ts:85`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `parse` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 38 |
| `collectFunctions` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 40 |
| `cfgOf` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 54 |
| `cfgsOf` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 62 |
| `collectFunctionCfgs` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/collect.ts` | 85 |
| `computeControlDependence` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-dependence.ts` | 116 |
| `add` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-dependence.ts` | 174 |
| `computePostDominators` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/post-dominators.ts` | 55 |
| `intersect` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/post-dominators.ts` | 108 |
| `buildDominators` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 70 |
| `intersect` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 80 |
| `buildDominanceFrontiers` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 108 |
| `tarjanScc` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 137 |
| `condenseReachingSets` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 206 |
| `reversePostOrder` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 31 |
| `hasReachableLoop` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 260 |
| `latticeEquals` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-defs-graph.ts` | 307 |
| `hasEmitSafeFacts` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 244 |
| `bindingKey` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 458 |
| `emitFileReachingDefs` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 481 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Unit | 5 calls |

## How to Explore

1. `context({name: "parse"})` — see callers and callees
2. `query({search_query: "cfg"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
