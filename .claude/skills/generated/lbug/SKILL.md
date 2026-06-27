---
name: lbug
description: "Skill for the Lbug area of VifoTec. 210 symbols across 29 files."
---

# Lbug

210 symbols | 29 files | Cohesion: 71%

## When to Use

- Working with code in `Skill/`
- Understanding how deriveEmbeddingCap, deriveEmbeddingMode, shadowCandidatesFor work
- Modifying lbug-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | isMissingColumnOrTableError, closeQueryResult, readQueryRows, getLbugStats, loadCachedEmbeddings (+56) |
| `Skill/GitNexus/gitnexus/src/core/lbug/lbug-config.ts` | openLbugConnection, closeLbugConnection, createLbugDatabase, junctionHash, tryShortPath (+16) |
| `Skill/GitNexus/gitnexus/src/core/lbug/pool-adapter.ts` | checkout, reject, timer, checkin, withTimeout (+15) |
| `Skill/GitNexus/gitnexus/src/core/lbug/csv-generator.ts` | orderedNodes, orderedRelationships, FileContentCache, BufferedCSVWriter, addRow (+12) |
| `Skill/GitNexus/gitnexus/src/core/lbug/sidecar-recovery.ts` | isMissingShadowSidecarError, isReadOnlyShadowReplayError, shadowSidecarRecoveryMessage, isPermissionRenameError, renameFailureMessage (+11) |
| `Skill/GitNexus/gitnexus/src/core/lbug/extension-loader.ts` | alreadyAvailable, resolvePolicyFromEnv, getExtensionInstallPolicy, getExtensionInstallTimeoutMs, getExtensionInstallChildProcessArgs (+9) |
| `Skill/GitNexus/gitnexus/src/core/run-analyze.ts` | primaryInversionWarning, norm, collectBranchCacheKeys, resolvePdgConfig, resolvePdgEmitChunkSize (+4) |
| `Skill/GitNexus/gitnexus/src/core/lbug/wal-checkpoint-driver.ts` | stop, checkpointOnce, startWalCheckpointDriver, stop, isManualCheckpointEnabled (+3) |
| `Skill/GitNexus/gitnexus/src/core/lbug/rel-pair-routing.ts` | RelPairRouter, close, destroy, getNodeLabel, route (+1) |
| `Skill/GitNexus/gitnexus/src/core/lbug/pdg-emit-sink.ts` | SyncCsvWriter, addRow, flushOrPoison, flush, addNode (+1) |

## Entry Points

Start here when exploring this area:

- **`deriveEmbeddingCap`** (Function) — `Skill/GitNexus/gitnexus/src/core/embedding-mode.ts:54`
- **`deriveEmbeddingMode`** (Function) — `Skill/GitNexus/gitnexus/src/core/embedding-mode.ts:64`
- **`shadowCandidatesFor`** (Function) — `Skill/GitNexus/gitnexus/src/core/incremental/shadow-candidates.ts:46`
- **`computeEffectiveWriteSet`** (Function) — `Skill/GitNexus/gitnexus/src/core/incremental/subgraph-extract.ts:127`
- **`parsePositiveIntEnv`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/utils/env.ts:36`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `RelPairRouter` | Class | `Skill/GitNexus/gitnexus/src/core/lbug/rel-pair-routing.ts` | 57 |
| `deriveEmbeddingCap` | Function | `Skill/GitNexus/gitnexus/src/core/embedding-mode.ts` | 54 |
| `deriveEmbeddingMode` | Function | `Skill/GitNexus/gitnexus/src/core/embedding-mode.ts` | 64 |
| `shadowCandidatesFor` | Function | `Skill/GitNexus/gitnexus/src/core/incremental/shadow-candidates.ts` | 46 |
| `computeEffectiveWriteSet` | Function | `Skill/GitNexus/gitnexus/src/core/incremental/subgraph-extract.ts` | 127 |
| `parsePositiveIntEnv` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/env.ts` | 36 |
| `withConnLock` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/conn-lock.ts` | 35 |
| `getLbugStats` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 1635 |
| `loadCachedEmbeddings` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 1681 |
| `fetchExistingEmbeddingHashes` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 1764 |
| `flushWAL` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 1836 |
| `closeLbugBeforeExit` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 1954 |
| `runCount` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 2021 |
| `queryImporters` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 2074 |
| `deleteAllCommunitiesAndProcesses` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 2115 |
| `deleteAllInterprocTaintPaths` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 2164 |
| `deleteAllCallSummaries` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/lbug-adapter.ts` | 2223 |
| `closeQueryResults` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/query-result-utils.ts` | 19 |
| `primaryInversionWarning` | Function | `Skill/GitNexus/gitnexus/src/core/run-analyze.ts` | 339 |
| `norm` | Function | `Skill/GitNexus/gitnexus/src/core/run-analyze.ts` | 343 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Query → TraceRss` | cross_community | 7 |
| `Query → LogDebug` | cross_community | 7 |
| `Query → SilenceStdout` | cross_community | 6 |
| `Execute → Flush` | cross_community | 5 |
| `RegisterGroupCommands → TraceRss` | cross_community | 5 |
| `Server → TraceRss` | cross_community | 5 |
| `Query → IsWalCorruptionError` | cross_community | 5 |
| `Query → Reject` | cross_community | 5 |
| `CreateServer → Checkout` | cross_community | 4 |
| `CreateServer → SilenceStdout` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Storage | 12 calls |
| Local | 5 calls |
| Cli | 5 calls |
| Embeddings | 3 calls |
| Server | 2 calls |
| Integration | 2 calls |
| Cluster_779 | 2 calls |
| Unit | 1 calls |

## How to Explore

1. `context({name: "deriveEmbeddingCap"})` — see callers and callees
2. `query({search_query: "lbug"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
