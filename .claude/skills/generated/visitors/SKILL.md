---
name: visitors
description: "Skill for the Visitors area of VifoTec. 915 symbols across 28 files."
---

# Visitors

915 symbols | 28 files | Cohesion: 71%

## When to Use

- Working with code in `Skill/`
- Understanding how wireJumpThroughFinalizers, drainFinalizerPending, walkRoot work
- Modifying visitors-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/typescript-harvest.ts` | TsHarvester, table, facts, stringLiteralText, resolve (+47) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/csharp.ts` | visitSeq, visitSwitch, visitSwitchExpr, armValue, buildUsingDeclScope (+44) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/swift.ts` | finishDefers, buildFunctionCfg, bodyStatementsOf, startLineOf, endLineOf (+44) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/kotlin.ts` | bodyStatementsOf, buildFunctionCfg, startLineOf, endLineOf, isComment (+43) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/dart.ts` | startLineOf, endLineOf, isComment, isLabeledContinue, statementsOf (+42) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/java.ts` | buildFunctionCfg, startLineOf, endLineOf, statementsOf, bodyBlockOf (+40) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/dart-harvest.ts` | DartHarvester, bindingTable, facts, bindingDefFacts, forHeadFacts (+37) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/kotlin-harvest.ts` | KotlinHarvester, bindingTable, forHeadFacts, whenSubjectFacts, bindingDefFacts (+36) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/php.ts` | buildFunctionCfg, startLineOf, endLineOf, isComment, statementsOf (+36) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/python-harvest.ts` | PythonHarvester, bindingTable, facts, withItemFacts, exceptHeadFacts (+32) |

## Entry Points

Start here when exploring this area:

- **`wireJumpThroughFinalizers`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts:194`
- **`drainFinalizerPending`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts:219`
- **`walkRoot`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/rust-harvest.ts:975`
- **`resolve`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/go-harvest.ts:649`
- **`walkRoot`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/kotlin-harvest.ts:806`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `CfgNestingDepthError` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/cfg-builder.ts` | 65 |
| `CfgBuilder` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/cfg-builder.ts` | 72 |
| `DartHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/dart-harvest.ts` | 130 |
| `KotlinHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/kotlin-harvest.ts` | 123 |
| `PhpHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/php-harvest.ts` | 89 |
| `PythonHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/python-harvest.ts` | 107 |
| `SwiftHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/swift-harvest.ts` | 127 |
| `CallSiteFactAccumulator` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/call-site-harvest.ts` | 141 |
| `RustHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/rust-harvest.ts` | 166 |
| `TsHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/typescript-harvest.ts` | 116 |
| `ControlFlowContext` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts` | 74 |
| `RubyHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/ruby-harvest.ts` | 140 |
| `CCppHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/c-cpp-harvest.ts` | 79 |
| `CsharpHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/csharp-harvest.ts` | 77 |
| `GoHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/go-harvest.ts` | 97 |
| `JavaHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/java-harvest.ts` | 77 |
| `ScopeTreeHarvester` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/scope-tree-harvest.ts` | 54 |
| `wireJumpThroughFinalizers` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts` | 194 |
| `drainFinalizerPending` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/control-flow-context.ts` | 219 |
| `walkRoot` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/cfg/visitors/rust-harvest.ts` | 975 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `VisitSwitch → PushArgEntry` | cross_community | 7 |
| `VisitSwitch → InnermostArgPosition` | cross_community | 7 |
| `VisitCall → AddUseWithoutOccurrence` | cross_community | 6 |
| `VisitCall → AddMayDef` | cross_community | 6 |
| `VisitCall → Resolve` | cross_community | 6 |
| `VisitCall → AddDef` | cross_community | 6 |
| `VisitSwitch → AddUseWithoutOccurrence` | cross_community | 6 |
| `VisitSwitch → SelectorName` | cross_community | 6 |
| `VisitSwitch → PushFrame` | cross_community | 6 |
| `BuildFunctionCfg → Resolve` | cross_community | 5 |

## How to Explore

1. `context({name: "wireJumpThroughFinalizers"})` — see callers and callees
2. `query({search_query: "visitors"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
