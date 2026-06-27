---
name: local
description: "Skill for the Local area of VifoTec. 134 symbols across 16 files."
---

# Local

134 symbols | 16 files | Cohesion: 58%

## When to Use

- Working with code in `Skill/`
- Understanding how findImportCycles, resolveSymbol, parseResourceUri work
- Modifying local-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | resolveSymbol, resolveSymbolForGroup, ensureInitialized, check, fetchRoutesWithConsumers (+67) |
| `Skill/GitNexus/gitnexus/src/mcp/local/pdg-impact.ts` | selfReachingDefEdgesByBlock, readPdgMetaCaps, pdgStampForMode, pdgLayerStatus, emptyPdgParityFields (+26) |
| `Skill/GitNexus/gitnexus/src/mcp/resources.ts` | parseUnmatchedOnlyParam, parseResourceUri, readResource, getSchemaResource, getContextResource (+5) |
| `Skill/GitNexus/gitnexus/src/core/search/phase-timer.ts` | PhaseTimer, mark, time |
| `Skill/GitNexus/gitnexus/src/core/graph/import-cycles.ts` | findCyclePath, findImportCycles |
| `Skill/GitNexus/gitnexus/src/core/git-staleness.ts` | checkStaleness, checkStalenessAsync |
| `Skill/GitNexus/gitnexus/test/unit/impact-pdg-ascent-note.test.ts` | descentExec, run |
| `Skill/GitNexus/gitnexus/src/core/ingestion/taint/path-codec.ts` | encodeTaintPath, decodeTaintPath |
| `Skill/GitNexus/gitnexus/src/core/lbug/pool-adapter.ts` | closeLbug, isLbugReady |
| `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | cleanupOldKuzuFiles, RegistryAmbiguousTargetError |

## Entry Points

Start here when exploring this area:

- **`findImportCycles`** (Function) — `Skill/GitNexus/gitnexus/src/core/graph/import-cycles.ts:38`
- **`resolveSymbol`** (Function) — `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts:674`
- **`parseResourceUri`** (Function) — `Skill/GitNexus/gitnexus/src/mcp/resources.ts:139`
- **`readResource`** (Function) — `Skill/GitNexus/gitnexus/src/mcp/resources.ts:228`
- **`checkStaleness`** (Function) — `Skill/GitNexus/gitnexus/src/core/git-staleness.ts:22`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `GroupService` | Class | `Skill/GitNexus/gitnexus/src/core/group/service.ts` | 301 |
| `PhaseTimer` | Class | `Skill/GitNexus/gitnexus/src/core/search/phase-timer.ts` | 34 |
| `RegistryAmbiguousTargetError` | Class | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 937 |
| `findImportCycles` | Function | `Skill/GitNexus/gitnexus/src/core/graph/import-cycles.ts` | 38 |
| `resolveSymbol` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 674 |
| `parseResourceUri` | Function | `Skill/GitNexus/gitnexus/src/mcp/resources.ts` | 139 |
| `readResource` | Function | `Skill/GitNexus/gitnexus/src/mcp/resources.ts` | 228 |
| `checkStaleness` | Function | `Skill/GitNexus/gitnexus/src/core/git-staleness.ts` | 22 |
| `resolveRepo` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 668 |
| `decodeReachingDefReason` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/reaching-def-reason-codec.ts` | 136 |
| `pdgFlows` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 675 |
| `pdgStampForMode` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/pdg-impact.ts` | 1091 |
| `pdgLayerStatus` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/pdg-impact.ts` | 1111 |
| `query` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 670 |
| `makePdgLayerDegradedResult` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/pdg-impact.ts` | 698 |
| `runImpactPDG` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/pdg-impact.ts` | 1791 |
| `checkStalenessAsync` | Function | `Skill/GitNexus/gitnexus/src/core/git-staleness.ts` | 52 |
| `parseListReposPagination` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 601 |
| `requireInt` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 605 |
| `isTestFilePath` | Function | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 134 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Query → TraceRss` | cross_community | 7 |
| `Query → LogDebug` | cross_community | 7 |
| `RegisterGroupCommands → GetGlobalDir` | cross_community | 6 |
| `EvalServerCommand → GetGlobalDir` | cross_community | 6 |
| `Query → SilenceStdout` | cross_community | 6 |
| `CreateServer → Free` | cross_community | 5 |
| `CreateServer → Claim` | cross_community | 5 |
| `CreateServer → GetStoragePath` | cross_community | 5 |
| `RegisterGroupCommands → Free` | cross_community | 5 |
| `RegisterGroupCommands → Claim` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Lbug | 27 calls |
| Storage | 9 calls |
| Search | 9 calls |
| Group | 4 calls |
| Wiki | 4 calls |
| Platform | 1 calls |
| Taint | 1 calls |
| Embeddings | 1 calls |

## How to Explore

1. `context({name: "findImportCycles"})` — see callers and callees
2. `query({search_query: "local"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
