---
name: cpp
description: "Skill for the Cpp area of VifoTec. 236 symbols across 28 files."
---

# Cpp

236 symbols | 28 files | Cohesion: 81%

## When to Use

- Working with code in `Skill/`
- Understanding how computeCppCallArity, emitCppScopeCaptures, splitCppInclude work
- Modifying cpp-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/captures.ts` | emitCppScopeCaptures, extractCppDeclarationReturnType, isCppUnsupportedReturnTypeDeclarator, findEnclosingTemplateDeclaration, findFunctionDeclarator (+49) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/adl.ts` | clearCppAdlState, adlSimpleName, isAdlCallableType, pushNested, pushFlat (+25) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/member-lookup.ts` | captureCppMemberLookupFacts, captureBaseEdges, parseMemberUsing, classNameOf, classQualifiedNameOf (+22) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/user-defined-conversions.ts` | clearCppUserDefinedConversions, populateCppUserDefinedConversions, collectClassMethodDefs, registerPendingCppUserDefinedConversion, recordClassIdentity (+9) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/file-local-linkage.ts` | clearFileLocalNames, rangeKey, markCppAnonymousNamespaceRange, populateCppAnonymousNamespaceScopes, populateCppNonGloballyVisible (+8) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/constraint-extractor.ts` | extractCppTemplateConstraints, extractEnableIfPredicate, parseRequiresClause, parseAtomicOrBoolean, parseAtomicTemplate (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/inline-namespaces.ts` | clearCppInlineNamespaces, rangeKey, markCppInlineNamespaceRange, populateCppInlineNamespaceScopes, isCppInlineNamespaceScope (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/scope-resolver.ts` | loadResolutionConfig, populateOwners, expandsWildcardTo, isFileLocalDef, resolveAdlCandidates (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/two-phase-lookup.ts` | markCppDependentBase, markCppDependentPackBase, applyCppTwoPhaseSideChannel, clearCppDependentBases, collectCppTwoPhaseSideChannel (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/range-bindings.ts` | populateCppRangeBindings, get, descendantsOfType, childForFieldName, buildParamTemplateMap (+4) |

## Entry Points

Start here when exploring this area:

- **`computeCppCallArity`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/arity-metadata.ts:104`
- **`emitCppScopeCaptures`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/captures.ts:25`
- **`splitCppInclude`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/import-decomposer.ts:15`
- **`splitCppUsingDecl`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/import-decomposer.ts:73`
- **`getCppScopeQuery`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/query.ts:625`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `computeCppCallArity` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/arity-metadata.ts` | 104 |
| `emitCppScopeCaptures` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/captures.ts` | 25 |
| `splitCppInclude` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/import-decomposer.ts` | 15 |
| `splitCppUsingDecl` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/import-decomposer.ts` | 73 |
| `getCppScopeQuery` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/query.ts` | 625 |
| `markCppDependentBase` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/two-phase-lookup.ts` | 73 |
| `markCppDependentPackBase` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/two-phase-lookup.ts` | 97 |
| `applyCppTwoPhaseSideChannel` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/two-phase-lookup.ts` | 143 |
| `extractCppTemplateConstraints` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/constraint-extractor.ts` | 64 |
| `captureCppMemberLookupFacts` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/member-lookup.ts` | 64 |
| `clearCppAdlState` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/adl.ts` | 497 |
| `clearFileLocalNames` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/file-local-linkage.ts` | 139 |
| `scanCppHeaderFiles` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/header-scan.ts` | 13 |
| `clearCppInlineNamespaces` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/inline-namespaces.ts` | 88 |
| `clearCppMemberLookupState` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/member-lookup.ts` | 55 |
| `loadResolutionConfig` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/scope-resolver.ts` | 103 |
| `clearCppDependentBases` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/two-phase-lookup.ts` | 157 |
| `clearCppUserDefinedConversions` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/user-defined-conversions.ts` | 14 |
| `markCppAnonymousNamespaceRange` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/file-local-linkage.ts` | 80 |
| `populateCppAnonymousNamespaceScopes` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/languages/cpp/file-local-linkage.ts` | 149 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `EmitFreeCallFallback → NormalizeQualifiedName` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Passes | 4 calls |
| Swift | 4 calls |
| Javascript | 4 calls |
| Kotlin | 2 calls |
| Tree-sitter | 2 calls |
| Workers | 2 calls |
| Php | 1 calls |
| Scope | 1 calls |

## How to Explore

1. `context({name: "computeCppCallArity"})` — see callers and callees
2. `query({search_query: "cpp"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
