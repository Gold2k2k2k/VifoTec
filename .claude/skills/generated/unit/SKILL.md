---
name: unit
description: "Skill for the Unit area of VifoTec. 238 symbols across 83 files."
---

# Unit

238 symbols | 83 files | Cohesion: 91%

## When to Use

- Working with code in `Skill/`
- Understanding how processCobol, processJclFiles, findObjectLiteralBindingInfo work
- Modifying unit-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/test/unit/dockerfile-runtime-asset-parity.test.ts` | toPosix, listSourceFiles, requireFamilyIds, braceDepthBefore, scanContent (+6) |
| `Skill/GitNexus/gitnexus-web/test/unit/server-connection.test.ts` | ndjsonStream, ndjsonResponse, nodeLine, repoInfo, graphHandler (+2) |
| `Skill/GitNexus/gitnexus/test/unit/pdg-callee-id-capture.test.ts` | makeIndexes, fnNode, mkGraph, buildDriver, range (+2) |
| `Skill/GitNexus/gitnexus/test/unit/skip-git-cli.test.ts` | readRegistry, canonicalPath, expectCoolioRegistryEntry, isFtsUnavailableError, shouldSkipForFtsUnavailable (+2) |
| `Skill/GitNexus/gitnexus/test/unit/cfg-callee-ids-of-block.test.ts` | emittedBlockProps, syntheticMapFromSites, calleeNamesViaIds, assertRoundTrip, callSite (+1) |
| `Skill/GitNexus/gitnexus/test/unit/field-extraction.test.ts` | parse, findTypeSpec, companion, walk, firstNodeOfType (+1) |
| `Skill/GitNexus/gitnexus/test/unit/lbug-adapter-wal-schema.test.ts` | makeOpenMock, makeFsMock, makeFsMockWithWalSize, isWal, isShadow (+1) |
| `Skill/GitNexus/gitnexus/test/unit/grammar-update-monitor.test.ts` | must, byKey, dartDeps, dartRow, baseResolveUpstream (+1) |
| `Skill/GitNexus/gitnexus/test/unit/cli-index-help.test.ts` | runHelp, runHelpArgs, runRootHelp, staticStringValue, extractRegisteredHelpDescriptions (+1) |
| `Skill/GitNexus/gitnexus/test/unit/setup-jsonc.test.ts` | opencodeDir, opencodeJsonPath, cursorDir, mcpPath, claudeDir (+1) |

## Entry Points

Start here when exploring this area:

- **`processCobol`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cobol-processor.ts:94`
- **`processJclFiles`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cobol/jcl-processor.ts:37`
- **`findObjectLiteralBindingInfo`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts:689`
- **`generateId`** (Function) — `Skill/GitNexus/gitnexus/src/lib/utils.ts:0`
- **`calleesOfBlock`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts:298`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `processCobol` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cobol-processor.ts` | 94 |
| `processJclFiles` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cobol/jcl-processor.ts` | 37 |
| `findObjectLiteralBindingInfo` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 689 |
| `generateId` | Function | `Skill/GitNexus/gitnexus/src/lib/utils.ts` | 0 |
| `calleesOfBlock` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 298 |
| `calleeIdsOfBlock` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 345 |
| `emitFileCfgs` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/emit.ts` | 369 |
| `calleeIdPosKey` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/scope-resolution/graph-bridge/callee-id-sink.ts` | 38 |
| `getProvider` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/index.ts` | 48 |
| `genericFuncName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 792 |
| `inferFunctionLabel` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 825 |
| `makeCfgHarness` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 30 |
| `allSites` | Function | `Skill/GitNexus/gitnexus/test/helpers/cfg-harness.ts` | 111 |
| `applyKotlinCaptureSideChannel` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/kotlin/capture-side-channel.ts` | 67 |
| `markCompanionScope` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/kotlin/companion-scopes.ts` | 43 |
| `resolveAnalyzeInstallPolicy` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/extension-loader.ts` | 74 |
| `setupMiniRepo` | Function | `Skill/GitNexus/gitnexus/test/helpers/mini-repo.ts` | 33 |
| `createTempDir` | Function | `Skill/GitNexus/gitnexus/test/helpers/test-db.ts` | 85 |
| `setup` | Function | `Skill/GitNexus/gitnexus/test/helpers/test-indexed-db.ts` | 88 |
| `createFakeProcRoot` | Function | `Skill/GitNexus/gitnexus/test/utils/hook-test-helpers.ts` | 189 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ProcessCobol → ParseReplacingClause` | cross_community | 6 |
| `ProcessCobol → IsCommentLine` | cross_community | 5 |
| `ProcessCobol → IsContinuationLine` | cross_community | 5 |
| `ProcessCobol → StripInlineComment` | cross_community | 5 |
| `ProcessCobol → ApplyReplacing` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Integration | 5 calls |
| Cobol | 4 calls |
| Cfg | 2 calls |
| Taint | 2 calls |
| Route-extractors | 1 calls |
| Http-patterns | 1 calls |
| Graph-bridge | 1 calls |
| Ingestion | 1 calls |

## How to Explore

1. `context({name: "processCobol"})` — see callers and callees
2. `query({search_query: "unit"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
