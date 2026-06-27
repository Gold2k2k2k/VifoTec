---
name: extractors
description: "Skill for the Extractors area of VifoTec. 137 symbols across 24 files."
---

# Extractors

137 symbols | 24 files | Cohesion: 78%

## When to Use

- Working with code in `Skill/`
- Understanding how shouldIgnorePath, loadIgnoreRules, buildProtoMap work
- Modifying extractors-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts` | stripProtoCommentsAndStrings, extractServiceBlocks, normalizeProtoPath, extractProtoImports, extractJavaPackageOption (+12) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/http-route-extractor.ts` | readFile, normalizeHttpPath, normalizeConsumerPath, contractIdFor, extractProvidersSourceScan (+11) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/include-extractor.ts` | extract, discoverIndexableFiles, dedupe, normalizeIncludePath, isHeaderFile (+8) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/thrift-extractor.ts` | normalizeThriftPath, thriftMethodContractId, thriftSourceScanSymbolUid, makeContract, extract (+7) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/elixir-workspace-extractor.ts` | findElixirFiles, walk, parseMixExs, scanElixirImports, expandAlias (+4) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/go-workspace-extractor.ts` | findGoFiles, walk, parseGoMod, scanGoImports, extractImportPaths (+4) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/java-workspace-extractor.ts` | findJavaFiles, walk, parseJavaManifest, parsePom, parseGradle (+4) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/python-workspace-extractor.ts` | findPythonFiles, walk, parsePythonManifest, parsePyproject, parseSetupPy (+4) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/node-workspace-extractor.ts` | findSourceFiles, walk, parsePackageManifest, scanImports, resolvePackageName (+3) |
| `Skill/GitNexus/gitnexus/src/core/group/extractors/rust-workspace-extractor.ts` | findRustFiles, walk, parseCargoPackageName, parseCrateManifest, scanImports (+3) |

## Entry Points

Start here when exploring this area:

- **`shouldIgnorePath`** (Function) — `Skill/GitNexus/gitnexus/src/config/ignore-service.ts:284`
- **`loadIgnoreRules`** (Function) — `Skill/GitNexus/gitnexus/src/config/ignore-service.ts:354`
- **`buildProtoMap`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts:365`
- **`resolveProtoConflict`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts:370`
- **`serviceContractId`** (Function) — `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts:404`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `shouldIgnorePath` | Function | `Skill/GitNexus/gitnexus/src/config/ignore-service.ts` | 284 |
| `loadIgnoreRules` | Function | `Skill/GitNexus/gitnexus/src/config/ignore-service.ts` | 354 |
| `buildProtoMap` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts` | 365 |
| `resolveProtoConflict` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts` | 370 |
| `serviceContractId` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-extractor.ts` | 404 |
| `getPluginForFile` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/grpc-patterns/index.ts` | 49 |
| `thriftMethodContractId` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/thrift-extractor.ts` | 28 |
| `getPluginForFile` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/thrift-patterns/index.ts` | 12 |
| `extractElixirWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/elixir-workspace-extractor.ts` | 181 |
| `readSafe` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/fs-utils.ts` | 12 |
| `readFile` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/http-route-extractor.ts` | 309 |
| `buildThriftContext` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/thrift-extractor.ts` | 215 |
| `extractGoWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/go-workspace-extractor.ts` | 191 |
| `normalizeHttpPath` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/http-route-extractor.ts` | 216 |
| `extractJavaWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/java-workspace-extractor.ts` | 190 |
| `extractNodeWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/node-workspace-extractor.ts` | 185 |
| `discoverWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/workspace-extractor.ts` | 20 |
| `extractPythonWorkspaceLinks` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/python-workspace-extractor.ts` | 183 |
| `getPluginForFile` | Function | `Skill/GitNexus/gitnexus/src/core/group/extractors/http-patterns/index.ts` | 69 |
| `getMaxFileSizeBytes` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/max-file-size.ts` | 22 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `SyncGroup → MethodFromRouteReason` | cross_community | 4 |
| `SyncGroup → NormalizeHttpPath` | cross_community | 4 |
| `SyncGroup → ContractIdFor` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Tree-sitter | 4 calls |
| Ingestion | 4 calls |
| Import-resolvers | 2 calls |
| Grpc-patterns | 1 calls |
| Http-patterns | 1 calls |

## How to Explore

1. `context({name: "shouldIgnorePath"})` — see callers and callees
2. `query({search_query: "extractors"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
