---
name: impact-pdg
description: "Skill for the Impact-pdg area of VifoTec. 121 symbols across 8 files."
---

# Impact-pdg

121 symbols | 8 files | Cohesion: 89%

## When to Use

- Working with code in `Skill/`
- Understanding how symbolKey, lineKey, unifiedLineKey work
- Modifying impact-pdg-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | symbolKey, lineKey, unifiedLineKey, unifiedSymbolKey, pdgLineCis (+29) |
| `Skill/GitNexus/gitnexus/bench/impact-pdg/measure.mjs` | cliChildArgs, loadFixtures, analyzeAndImpact, callgraphCisFromResult, pdgCisFromResult (+18) |
| `Skill/GitNexus/gitnexus/bench/impact-pdg/name-collision.mjs` | bridgeProvenSets, provenBy, reachedItemKey, keySetOf, scoreIdVsName (+14) |
| `Skill/GitNexus/gitnexus/bench/impact-pdg/real-code.mjs` | readOption, hasFlag, fmt, readCases, evaluateCheckGates (+11) |
| `Skill/GitNexus/gitnexus/bench/impact-pdg/mutation-oracle.mjs` | writeMutationSidecar, serializeValue, normalizeTypeAnnotation, inputTuplesFor, lineMutants (+10) |
| `Skill/GitNexus/gitnexus/bench/impact-pdg/blast-radius.mjs` | readOption, hasFlag, median, round, fmt (+6) |
| `Skill/GitNexus/gitnexus/bench/scope-capture/measure.mjs` | unit, generate |
| `Skill/GitNexus/gitnexus/bench/cfg/measure.mjs` | parse |

## Entry Points

Start here when exploring this area:

- **`symbolKey`** (Function) — `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs:43`
- **`lineKey`** (Function) — `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs:55`
- **`unifiedLineKey`** (Function) — `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs:64`
- **`unifiedSymbolKey`** (Function) — `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs:68`
- **`pdgLineCis`** (Function) — `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs:81`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `symbolKey` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 43 |
| `lineKey` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 55 |
| `unifiedLineKey` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 64 |
| `unifiedSymbolKey` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 68 |
| `pdgLineCis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 81 |
| `intraLineAis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 93 |
| `unifiedAis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 104 |
| `toKeySet` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 123 |
| `difference` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 140 |
| `score` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 157 |
| `compareModes` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 187 |
| `splitByAis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 194 |
| `aggregate` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 216 |
| `avg` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 217 |
| `aisByScope` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 272 |
| `callgraphUnifiedCis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 289 |
| `pdgUnifiedCis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 302 |
| `composeUnifiedCis` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 311 |
| `scoreUnifiedAxes` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 322 |
| `aggregateUnifiedScores` | Function | `Skill/GitNexus/gitnexus/bench/impact-pdg/metrics.mjs` | 329 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Run → CliChildArgs` | intra_community | 3 |
| `Run → Exec` | cross_community | 3 |
| `Run → SymbolKey` | intra_community | 3 |

## How to Explore

1. `context({name: "symbolKey"})` — see callers and callees
2. `query({search_query: "impact-pdg"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
