---
name: group
description: "Skill for the Group area of VifoTec. 165 symbols across 32 files."
---

# Group

165 symbols | 32 files | Cohesion: 82%

## When to Use

- Working with code in `Skill/`
- Understanding how registerGroupCommands, parseGroupConfig, loadGroupConfig work
- Modifying group-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/group/cross-trace.ts` | degradedMembers, resolveAcrossMembers, str, parseTraceParams, runGroupTrace (+27) |
| `Skill/GitNexus/gitnexus/src/core/group/bridge-db.ts` | closeBridgeDb, removeLbugFile, contractNodeId, createContractLookupIndex, openBridgeDb (+18) |
| `Skill/GitNexus/gitnexus/src/core/group/service.ts` | resolveRepo, impact, query, impactByUid, context (+12) |
| `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | parseDirection, clampCrossDepth, clampTimeout, validateGroupImpactParams, resolveGroupRepo (+9) |
| `Skill/GitNexus/gitnexus/src/core/group/storage.ts` | getDefaultGitnexusDir, getGroupsBaseDir, validateGroupName, getGroupDir, readContractRegistry (+4) |
| `Skill/GitNexus/gitnexus/src/core/group/normalization.ts` | contractKey, contractRichness, mergeContracts, dedupeContracts, endpointKey (+3) |
| `Skill/GitNexus/gitnexus/src/core/group/sync.ts` | stableRepoPoolId, defaultResolveHandle, dedupeCrossLinks, partitionManifestWindows, reposOf (+2) |
| `Skill/GitNexus/gitnexus/src/core/group/matching.ts` | isServiceWildcard, buildNoisyContractFilter, normalizeContractId, findMatchingKeys, buildProviderIndex (+2) |
| `Skill/GitNexus/gitnexus/test/unit/group/cross-trace.test.ts` | writeLinkedBridge, writeUnlinkedBridge, mk, okSym, crossSymbolTable (+2) |
| `Skill/GitNexus/gitnexus/src/core/group/service-boundary-detector.ts` | assignService, detectServiceBoundaries, walkForBoundaries, hasSourceFilesInSubdirs, computeConfidence |

## Entry Points

Start here when exploring this area:

- **`registerGroupCommands`** (Function) — `Skill/GitNexus/gitnexus/src/cli/group.ts:8`
- **`parseGroupConfig`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/config-parser.ts:45`
- **`loadGroupConfig`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/config-parser.ts:120`
- **`clampTimeout`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts:111`
- **`validateGroupImpactParams`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts:116`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `GroupNotFoundError` | Class | `Skill/GitNexus/gitnexus/src/core/group/config-parser.ts` | 113 |
| `GrpcExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts` | 411 |
| `HttpRouteExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/http-route-extractor.ts` | 269 |
| `IncludeExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/include-extractor.ts` | 319 |
| `ManifestExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/manifest-extractor.ts` | 77 |
| `ThriftExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/thrift-extractor.ts` | 255 |
| `TopicExtractor` | Class | `Skill/GitNexus/gitnexus/src/core/group/extractors/topic-extractor.ts` | 47 |
| `registerGroupCommands` | Function | `Skill/GitNexus/gitnexus/src/cli/group.ts` | 8 |
| `parseGroupConfig` | Function | `Skill/GitNexus/gitnexus/src/core/group/config-parser.ts` | 45 |
| `loadGroupConfig` | Function | `Skill/GitNexus/gitnexus/src/core/group/config-parser.ts` | 120 |
| `clampTimeout` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 111 |
| `validateGroupImpactParams` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 116 |
| `safeNeighborImpact` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 265 |
| `collectImpactSymbolUids` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 303 |
| `mergeRisk` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 345 |
| `runGroupImpact` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-impact.ts` | 429 |
| `degradedMembers` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-trace.ts` | 163 |
| `runGroupTrace` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-trace.ts` | 633 |
| `degradedNotes` | Function | `Skill/GitNexus/gitnexus/src/core/group/cross-trace.ts` | 715 |
| `normalizeServicePrefix` | Function | `Skill/GitNexus/gitnexus/src/core/group/group-path-utils.ts` | 13 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RegisterGroupCommands → GetGlobalDir` | cross_community | 6 |
| `RegisterGroupCommands → Free` | cross_community | 5 |
| `RegisterGroupCommands → Claim` | cross_community | 5 |
| `RegisterGroupCommands → GetStoragePath` | cross_community | 5 |
| `RegisterGroupCommands → TraceRss` | cross_community | 5 |
| `Server → CleanupOldKuzuFiles` | cross_community | 5 |
| `Server → GroupService` | cross_community | 5 |
| `Server → GetDefaultGitnexusDir` | cross_community | 5 |
| `RegisterGroupCommands → CleanupOldKuzuFiles` | cross_community | 4 |
| `RegisterGroupCommands → ValidateGroupName` | intra_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Local | 14 calls |
| Extractors | 7 calls |
| Integration | 5 calls |
| Lbug | 4 calls |
| Route-extractors | 2 calls |
| Wiki | 2 calls |
| Storage | 1 calls |

## How to Explore

1. `context({name: "registerGroupCommands"})` — see callers and callees
2. `query({search_query: "group"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
