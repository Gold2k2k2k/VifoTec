---
name: configs
description: "Skill for the Configs area of VifoTec. 245 symbols across 48 files."
---

# Configs

245 symbols | 48 files | Cohesion: 82%

## When to Use

- Working with code in `Skill/`
- Understanding how typeFromField, typeFromAnnotation, typeFromDescendant work
- Modifying configs-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/c-cpp.ts` | isStatic, findFunctionDeclarator, extractCppMethodName, extractCppReturnType, extractCppParameters (+10) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/csharp.ts` | extractName, extractReturnType, isStatic, isAbstract, isFinal (+8) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/call-extractors/configs/c-cpp.ts` | extractLanguageCallSite, extractCppOperatorCallSite, isPrimitiveOnlyBinaryOperatorCall, isBuiltinOperatorOperand, inferCppOperatorOperandType (+7) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/python.ts` | unwrapDecorated, extractPythonParameters, extractPythonReturnType, extractPythonVisibility, extractName (+7) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/variable-extractors/configs/go.ts` | collectGoSpecNames, collectGoSpecs, collectGoDeclarationNames, findGoSpecForName, extractGoSpecType (+6) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/jvm.ts` | extractJavaParameters, kotlinParameterHasDefaultValue, extractKotlinParameters, extractReceiverType, isStatic (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/typescript-javascript.ts` | extractTsJsParameters, isStatic, isAbstract, isAsync, isOverride (+5) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/php.ts` | extractPhpParameters, stripDollar, hasModifierNode, isStatic, isAbstract (+4) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/variable-extractors/configs/c-cpp.ts` | extractCVarType, extractVisibility, isConst, isStatic, isMutable (+3) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/variable-extractors/configs/dart.ts` | nameNodes, extractDartVarNames, extractName, extractVisibility, scanLeadingSiblings (+3) |

## Entry Points

Start here when exploring this area:

- **`typeFromField`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts:115`
- **`typeFromAnnotation`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts:124`
- **`typeFromDescendant`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts:139`
- **`extractSimpleTypeName`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts:211`
- **`extractRubyConstructorAssignment`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts:488`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `typeFromField` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 115 |
| `typeFromAnnotation` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 124 |
| `typeFromDescendant` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 139 |
| `extractSimpleTypeName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 211 |
| `extractRubyConstructorAssignment` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/type-extractors/shared.ts` | 488 |
| `hasKeyword` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 22 |
| `hasModifier` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 37 |
| `extractName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/class-extractors/configs/c-cpp.ts` | 74 |
| `findEnclosingClassInfo` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 397 |
| `extractTemplateArguments` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/template-arguments.ts` | 8 |
| `stripTemplateArguments` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/template-arguments.ts` | 47 |
| `templateArgumentsIdTag` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/template-arguments.ts` | 53 |
| `findVisibility` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 55 |
| `collectModifierTexts` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/field-extractors/configs/helpers.ts` | 164 |
| `extractTemplateArguments` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/class-extractors/configs/c-cpp.ts` | 80 |
| `shouldSkipClassCapture` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/class-extractors/configs/c-cpp.ts` | 85 |
| `extractTemplateArgumentsFromCapture` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/class-extractors/configs/c-cpp.ts` | 91 |
| `extractName` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/variable-extractors/configs/dart.ts` | 94 |
| `search` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/method-extractors/configs/ruby.ts` | 248 |
| `swiftPackageStrategy` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/import-resolvers/configs/swift.ts` | 84 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Type-extractors | 5 calls |
| Unit | 1 calls |
| Class-extractors | 1 calls |
| Passes | 1 calls |
| Kotlin | 1 calls |
| Cpp | 1 calls |

## How to Explore

1. `context({name: "typeFromField"})` — see callers and callees
2. `query({search_query: "configs"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
