---
name: integration
description: "Skill for the Integration area of VifoTec. 156 symbols across 69 files."
---

# Integration

156 symbols | 69 files | Cohesion: 75%

## When to Use

- Working with code in `Skill/`
- Understanding how buildPhaseList, runPipelineFromRepo, createKnowledgeGraph work
- Modifying integration-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/test/integration/cli-e2e.test.ts` | isEvalServerBindRestriction, runEvalServerHostFlagTest, settle, timer, isSettled (+6) |
| `Skill/GitNexus/gitnexus/test/integration/impact-pdg-shape.test.ts` | afterSetup, fn, block, edge, winNode (+3) |
| `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | isFieldError, escapeAnonymous, grammarsFor, probeNodeType, probeField (+2) |
| `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | getDefinitionNodeFromCaptures, nodeRangeKey, isConcreteTypedefCapture, buildConcreteTypedefDefinitionRanges, isSuppressedConcreteTypedefDuplicate (+1) |
| `Skill/GitNexus/gitnexus/test/integration/csv-pipeline.test.ts` | hookGraph, dataRowsOf, readAllRelRows, dataRows, run |
| `Skill/GitNexus/gitnexus/test/integration/pdg-query.test.ts` | afterSetup, cdgEdge, fn, block, cdg |
| `Skill/GitNexus/gitnexus/src/core/logger.ts` | MemoryWritable, records, restore, _captureLogger |
| `Skill/GitNexus/gitnexus/test/integration/impact-pdg-callsummary-degradation.test.ts` | afterSetup, fn, block, edge |
| `Skill/GitNexus/gitnexus/test/integration/impact-pdg-interproc.test.ts` | afterSetup, fn, block, edge |
| `Skill/GitNexus/gitnexus/test/integration/impact-pdg-traversal.test.ts` | afterSetup, fn, block, edge |

## Entry Points

Start here when exploring this area:

- **`buildPhaseList`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline.ts:257`
- **`runPipelineFromRepo`** (Function) — `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline.ts:287`
- **`createKnowledgeGraph`** (Function) — `Skill/GitNexus/gitnexus/src/core/graph/graph.ts:10`
- **`extractChangedSubgraph`** (Function) — `Skill/GitNexus/gitnexus/src/core/incremental/subgraph-extract.ts:86`
- **`_captureLogger`** (Function) — `Skill/GitNexus/gitnexus/src/core/logger.ts:357`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `PhaseRegistry` | Class | `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline-phases/registry.ts` | 47 |
| `LocalBackend` | Class | `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | 633 |
| `MemoryWritable` | Class | `Skill/GitNexus/gitnexus/src/core/logger.ts` | 313 |
| `PdgEmitSink` | Class | `Skill/GitNexus/gitnexus/src/core/lbug/pdg-emit-sink.ts` | 191 |
| `buildPhaseList` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline.ts` | 257 |
| `runPipelineFromRepo` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/pipeline.ts` | 287 |
| `createKnowledgeGraph` | Function | `Skill/GitNexus/gitnexus/src/core/graph/graph.ts` | 10 |
| `extractChangedSubgraph` | Function | `Skill/GitNexus/gitnexus/src/core/incremental/subgraph-extract.ts` | 86 |
| `_captureLogger` | Function | `Skill/GitNexus/gitnexus/src/core/logger.ts` | 357 |
| `isFieldError` | Function | `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | 199 |
| `probeNodeType` | Function | `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | 235 |
| `probeField` | Function | `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | 274 |
| `validateNodeType` | Function | `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | 301 |
| `validateField` | Function | `Skill/GitNexus/gitnexus/test/helpers/grammar-introspection.ts` | 318 |
| `getDefinitionNodeFromCaptures` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 88 |
| `buildConcreteTypedefDefinitionRanges` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 112 |
| `isSuppressedConcreteTypedefDuplicate` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 130 |
| `findEnclosingClassId` | Function | `Skill/GitNexus/gitnexus/src/core/ingestion/utils/ast-helpers.ts` | 753 |
| `buildTestGraph` | Function | `Skill/GitNexus/gitnexus/test/helpers/test-graph.ts` | 32 |
| `createMinimalTestGraph` | Function | `Skill/GitNexus/gitnexus/test/helpers/test-graph.ts` | 72 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `RegisterGroupCommands → GetGlobalDir` | cross_community | 6 |
| `EvalServerCommand → GetGlobalDir` | cross_community | 6 |
| `CreateServer → Free` | cross_community | 5 |
| `CreateServer → Claim` | cross_community | 5 |
| `CreateServer → GetStoragePath` | cross_community | 5 |
| `RegisterGroupCommands → Free` | cross_community | 5 |
| `RegisterGroupCommands → Claim` | cross_community | 5 |
| `RegisterGroupCommands → GetStoragePath` | cross_community | 5 |
| `EvalServerCommand → Free` | cross_community | 5 |
| `EvalServerCommand → Claim` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Pipeline-phases | 6 calls |
| Unit | 3 calls |
| Lbug | 2 calls |
| Tree-sitter | 2 calls |
| Storage | 1 calls |
| Local | 1 calls |
| Dart | 1 calls |
| Configs | 1 calls |

## How to Explore

1. `context({name: "buildPhaseList"})` — see callers and callees
2. `query({search_query: "integration"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
