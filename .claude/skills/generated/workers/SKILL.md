---
name: workers
description: "Skill for the Workers area of VifoTec. 111 symbols across 15 files."
---

# Workers

111 symbols | 15 files | Cohesion: 72%

## When to Use

- Working with code in `Skill/`
- Understanding how buildDispatchMessage, dispatch, maybeDone work
- Modifying workers-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | isParseWorkerItemArray, buildDispatchMessage, WorkerPoolInitializationError, estimateItemBytes, itemPath (+58) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/workers/parse-worker.ts` | clearCaches, getFieldInfo, cachedExportCheck, checkForFetchCall, extractORMQueries (+10) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/workers/clone-safety.ts` | isStructuredCloneable, isArrayIndexKey, containsNonCloneable, recordStrip, stripNonCloneable (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/utils/method-props.ts` | arityForIdFromInfo, buildMethodProps, buildCollisionGroups, typeTagForId, _buildGroup (+1) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/workers/quarantine.ts` | add, has, snapshot, createQuarantine |
| `Skill/GitNexus/gitnexus/test/unit/parse-impl-worker-startup-gating.test.ts` | initError, message |
| `Skill/GitNexus/gitnexus/src/core/ingestion/constants.ts` | getTreeSitterContentByteLength, getTreeSitterBufferSize |
| `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | isQualifiableScopeLabel, getLabelFromCaptures |
| `Skill/GitNexus/gitnexus/src/core/ingestion/workers/result-merge.ts` | appendAll, mergeResult |
| `Skill/GitNexus/gitnexus/src/core/ingestion/framework-detection.ts` | detectFrameworkFromAST |

## Entry Points

Start here when exploring this area:

- **`buildDispatchMessage`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts:70`
- **`dispatch`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts:1087`
- **`maybeDone`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts:1314`
- **`requeueRemainder`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts:1345`
- **`requeueAfterTimeout`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts:1476`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `WorkerPoolInitializationError` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 281 |
| `WorkerPoolDispatchError` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 245 |
| `buildDispatchMessage` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 70 |
| `dispatch` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1087 |
| `maybeDone` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1314 |
| `requeueRemainder` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1345 |
| `requeueAfterTimeout` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1476 |
| `runWorker` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1599 |
| `finishJob` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/worker-pool.ts` | 1673 |
| `getTreeSitterContentByteLength` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/constants.ts` | 19 |
| `getTreeSitterBufferSize` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/constants.ts` | 22 |
| `detectFrameworkFromAST` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/framework-detection.ts` | 538 |
| `deriveDefaultExportHocName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/ts-js-hoc-utils.ts` | 93 |
| `isQualifiableScopeLabel` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 55 |
| `getLabelFromCaptures` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 311 |
| `extractCallArgTypes` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/call-analysis.ts` | 622 |
| `arityForIdFromInfo` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/method-props.ts` | 14 |
| `buildMethodProps` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/method-props.ts` | 185 |
| `isVueSetupTopLevel` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/vue-sfc-extractor.ts` | 286 |
| `extractORMQueries` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/workers/parse-worker.ts` | 1121 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ProcessFileGroup → CountNewlines` | cross_community | 4 |
| `Handler → Add` | cross_community | 4 |
| `Handler → ItemPath` | cross_community | 4 |
| `Handler → EstimateItemBytes` | cross_community | 4 |
| `Handler → Snapshot` | cross_community | 4 |
| `Handler → Has` | cross_community | 4 |
| `Handler → MaybeDone` | cross_community | 4 |
| `ErrorHandler → Add` | cross_community | 4 |
| `ErrorHandler → ItemPath` | cross_community | 4 |
| `ErrorHandler → EstimateItemBytes` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Unit | 7 calls |
| Configs | 4 calls |
| Ingestion | 3 calls |
| Integration | 3 calls |
| Graph-bridge | 2 calls |
| Route-extractors | 2 calls |
| Pipeline-phases | 1 calls |
| Tree-sitter | 1 calls |

## How to Explore

1. `context({name: "buildDispatchMessage"})` — see callers and callees
2. `query({search_query: "workers"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
