---
name: type-extractors
description: "Skill for the Type-extractors area of VifoTec. 125 symbols across 13 files."
---

# Type-extractors

125 symbols | 13 files | Cohesion: 68%

## When to Use

- Working with code in `Skill/`
- Understanding how extractVarName, getDeclarationTypeNode, findChild work
- Modifying type-extractors-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/jvm.ts` | extractJavaDeclaration, extractJavaInitializer, extractJavaParameter, extractJavaPatternBinding, findAncestorByType (+16) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/typescript.ts` | normalizeJsDocType, collectJsDocParams, extractDeclaration, extractParameter, extractInitializer (+9) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/php.ts` | extractParameter, findEnclosingClass, scanConstructorBinding, extractForLoopBinding, normalizePhpType (+6) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/dart.ts` | extractDartDeclaration, extractDartParameter, extractDartElementTypeFromTypeNode, extractDartForLoopBinding, parseDartRHSChildren (+6) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/c-cpp.ts` | extractDeclaration, extractParameter, extractPendingAssignment, extractForLoopBinding, extractFirstTemplateTypeArg (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/csharp.ts` | extractParameter, findCSharpIfConsequenceBlock, isCSharpNullableDecl, extractPatternBinding, extractDeclaration (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | extractVarName, methodToTypeArgPosition, resolveIterableElementType, extractFirstArg, extractElementTypeFromString (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/swift.ts` | extractParameter, extractDeclaration, extractForLoopBinding, unwrapSwiftExpression, swiftNavigationSuffixName (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/go.ts` | extractGoVarDeclaration, extractGoShortVarDeclaration, extractDeclaration, extractParameter, isChannelType (+3) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/python.ts` | extractDeclaration, extractParameter, extractInitializer, extractMethodCall, collectPatternIdentifiers (+3) |

## Entry Points

Start here when exploring this area:

- **`extractVarName`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts:353`
- **`getDeclarationTypeNode`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/jvm.ts:853`
- **`findChild`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts:920`
- **`methodToTypeArgPosition`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts:122`
- **`resolveIterableElementType`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts:162`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `extractVarName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 353 |
| `getDeclarationTypeNode` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/jvm.ts` | 853 |
| `findChild` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 920 |
| `methodToTypeArgPosition` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 122 |
| `resolveIterableElementType` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 162 |
| `extractElementTypeFromString` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 615 |
| `extractGenericTypeArgs` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 413 |
| `hasTypeAnnotation` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 520 |
| `unwrapAwait` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 569 |
| `extractCalleeName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 578 |
| `extractFirstTemplateTypeArg` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/c-cpp.ts` | 35 |
| `extractDeclaration` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/c-cpp.ts` | 49 |
| `extractParameter` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/c-cpp.ts` | 175 |
| `extractPendingAssignment` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/c-cpp.ts` | 243 |
| `extractParameter` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/csharp.ts` | 92 |
| `findCSharpIfConsequenceBlock` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/csharp.ts` | 326 |
| `isCSharpNullableDecl` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/csharp.ts` | 354 |
| `extractPatternBinding` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/csharp.ts` | 359 |
| `extractGoVarDeclaration` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/go.ts` | 26 |
| `extractGoShortVarDeclaration` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/go.ts` | 46 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Configs | 49 calls |

## How to Explore

1. `context({name: "extractVarName"})` — see callers and callees
2. `query({search_query: "type-extractors"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
