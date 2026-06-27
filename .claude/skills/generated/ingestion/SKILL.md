---
name: ingestion
description: "Skill for the Ingestion area of VifoTec. 218 symbols across 58 files."
---

# Ingestion

218 symbols | 58 files | Cohesion: 80%

## When to Use

- Working with code in `Skill/`
- Understanding how csharpScanToEvidence, loadGoModulePath, loadComposerConfig work
- Modifying ingestion-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-env.ts` | lookup, lookupClassDefsByName, createClassDefCache, walkParentChain, resolveFieldType (+25) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/scope-extractor.ts` | draftToScope, pass2AttachDeclarations, deriveDeclarationName, pass3CollectImports, pass4CollectTypeBindings (+25) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/vue-sfc-extractor.ts` | kebabToPascal, isBuiltinKebabTag, extractTemplateComponents, extractComponentEventBindings, extractVueTemplateEdgeData (+10) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cobol-processor.ts` | generatePropertyId, buildDataItemMap, mapToGraph, scopedParaLookup, scopedCallerLookup (+6) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | csharpScanToEvidence, loadGoModulePath, loadComposerConfig, getCsharpStructureScannerFactory, scanCSharpProject (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/process-processor.ts` | processProcesses, buildCallsGraph, buildReverseCallsGraph, traceFromEntryPoint, deduplicateTraces (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/mro-processor.ts` | buildAdjacency, resolveByMroOrder, resolveCsharpJava, computeMRO, extendsParentsOf (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/emit-references.ts` | emitReferencesToGraph, emitScopeGraph, isScopeEmissionEnabled, resolveCallerNodeId, isFunctionLike (+2) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/community-processor.ts` | createSeededRng, processCommunities, buildGraphologyGraph, createCommunityNodes, generateHeuristicLabel (+2) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/call-processor.ts` | extractConsumerAccessedKeys, processNextjsFetchRoutes, resolveControllerByQualifiedName, processRoutesFromExtracted, resolveRouteHandlerSymbols (+1) |

## Entry Points

Start here when exploring this area:

- **`csharpScanToEvidence`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts:75`
- **`loadGoModulePath`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts:141`
- **`loadComposerConfig`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts:159`
- **`scanCSharpProject`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts:228`
- **`loadSwiftPackageConfig`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts:438`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `TransitionalScopeTree` | Class | `Skill/GitNexus/gitnexus/src/storage/scope-index-store.ts` | 222 |
| `csharpScanToEvidence` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 75 |
| `loadGoModulePath` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 141 |
| `loadComposerConfig` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 159 |
| `scanCSharpProject` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 228 |
| `loadSwiftPackageConfig` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 438 |
| `loadImportConfigs` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/language-config.ts` | 473 |
| `loadCsharpResolutionConfig` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/csharp/resolution-config.ts` | 21 |
| `loadResolutionConfig` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/go/scope-resolver.ts` | 23 |
| `extractReturnTypeName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 819 |
| `isCobolFile` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cobol-processor.ts` | 68 |
| `isJclFile` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cobol-processor.ts` | 73 |
| `readFileContents` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/filesystem-walker.ts` | 126 |
| `processMarkdown` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/markdown-processor.ts` | 22 |
| `startChunkPrefetch` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline-phases/parse-impl.ts` | 689 |
| `processProcesses` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/process-processor.ts` | 80 |
| `emitReferencesToGraph` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/emit-references.ts` | 89 |
| `emitScopeGraph` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/emit-references.ts` | 127 |
| `extractTemplateComponents` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/vue-sfc-extractor.ts` | 302 |
| `extractComponentEventBindings` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/vue-sfc-extractor.ts` | 385 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RunScopeResolution → TopicOf` | cross_community | 5 |
| `RunScopeResolution → AnchorCaptureFor` | cross_community | 5 |
| `RunScopeResolution → ResolveKindForScopeMatch` | cross_community | 5 |
| `RunScopeResolution → MakeDraft` | cross_community | 5 |
| `ProcessFileGroup → CountNewlines` | cross_community | 4 |
| `LoadImportConfigs → FindCsprojRootNamespace` | intra_community | 4 |
| `LoadImportConfigs → GetCsharpStructureScannerFactory` | intra_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Unit | 15 calls |
| Pipeline-phases | 6 calls |
| Configs | 3 calls |
| Cluster_779 | 3 calls |
| Extractors | 2 calls |
| Typescript | 2 calls |
| Integration | 1 calls |
| Model | 1 calls |

## How to Explore

1. `context({name: "csharpScanToEvidence"})` — see callers and callees
2. `query({search_query: "ingestion"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
