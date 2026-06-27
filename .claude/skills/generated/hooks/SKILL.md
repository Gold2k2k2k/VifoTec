---
name: hooks
description: "Skill for the Hooks area of VifoTec. 125 symbols across 17 files."
---

# Hooks

125 symbols | 17 files | Cohesion: 82%

## When to Use

- Working with code in `Skill/`
- Understanding how createKnowledgeGraph, getActiveProviderConfig, buildGraphFromConnectResult work
- Modifying hooks-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | getFA2Settings, getLayoutDuration, stopAllLayouts, runTreeLayout, runCirclesLayout (+18) |
| `Skill/GitNexus/gitnexus-web/src/hooks/useAppState.tsx` | clearAICitationHighlights, clearBlastRadius, initializeAgent, switchRepo, loadGraphAnyway (+17) |
| `Skill/GitNexus/gitnexus-claude-plugin/hooks/hook-db-lock-probe.cjs` | debugLog, isTestContext, getProcRoot, getCmdlineMaxBytes, commLooksLikeServer (+15) |
| `Skill/GitNexus/gitnexus-claude-plugin/hooks/gitnexus-hook.js` | readInput, isDebugEnabled, extractAugmentContext, extractPattern, runGitNexusCli (+9) |
| `Skill/GitNexus/gitnexus-cursor-integration/hooks/gitnexus-hook.cjs` | readInput, parseRgGrepPattern, pickLongestStringValue, extractPattern, resolveCliPath (+6) |
| `Skill/GitNexus/gitnexus-claude-plugin/hooks/resolve-analyze-cmd.cjs` | resolveOnPath, probeVersion, getNpmMajorVersion, resolveInvocationMode, formatAnalyzeCommand (+5) |
| `Skill/GitNexus/gitnexus-web/src/hooks/useBackend.ts` | useBackend, probe, stopPolling, startPolling, schedule (+1) |
| `Skill/GitNexus/gitnexus-web/src/hooks/useAutoScroll.ts` | isNearBottom, useAutoScroll, syncScrollState, scrollToBottom, handleScroll |
| `Skill/GitNexus/gitnexus-web/src/services/backend-client.ts` | validateBackendUrl, setBackendUrl, probeBackend, search |
| `Skill/GitNexus/gitnexus-web/src/core/llm/settings-service.ts` | getActiveProviderConfig, getProviderCapabilities |

## Entry Points

Start here when exploring this area:

- **`createKnowledgeGraph`** (Function) — `Skill/GitNexus/gitnexus-web/src/core/graph/graph.ts:3`
- **`getActiveProviderConfig`** (Function) — `Skill/GitNexus/gitnexus-web/src/core/llm/settings-service.ts:342`
- **`buildGraphFromConnectResult`** (Function) — `Skill/GitNexus/gitnexus-web/src/lib/apply-connect-result.ts:34`
- **`stopAllLayouts`** (Function) — `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts:364`
- **`runTreeLayout`** (Function) — `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts:730`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `createKnowledgeGraph` | Function | `Skill/GitNexus/gitnexus-web/src/core/graph/graph.ts` | 3 |
| `getActiveProviderConfig` | Function | `Skill/GitNexus/gitnexus-web/src/core/llm/settings-service.ts` | 342 |
| `buildGraphFromConnectResult` | Function | `Skill/GitNexus/gitnexus-web/src/lib/apply-connect-result.ts` | 34 |
| `stopAllLayouts` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 364 |
| `runTreeLayout` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 730 |
| `runCirclesLayout` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 1087 |
| `runLayout` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 1438 |
| `setGraph` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 1474 |
| `startLayout` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 1539 |
| `stopLayout` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 1551 |
| `useAutoScroll` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useAutoScroll.ts` | 16 |
| `syncScrollState` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useAutoScroll.ts` | 30 |
| `scrollToBottom` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useAutoScroll.ts` | 47 |
| `handleScroll` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useAutoScroll.ts` | 75 |
| `useBackend` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useBackend.ts` | 27 |
| `probe` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useBackend.ts` | 44 |
| `validateBackendUrl` | Function | `Skill/GitNexus/gitnexus-web/src/services/backend-client.ts` | 239 |
| `setBackendUrl` | Function | `Skill/GitNexus/gitnexus-web/src/services/backend-client.ts` | 253 |
| `probeBackend` | Function | `Skill/GitNexus/gitnexus-web/src/services/backend-client.ts` | 524 |
| `nodeReducer` | Function | `Skill/GitNexus/gitnexus-web/src/hooks/useSigma.ts` | 470 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `DropZone → BackendError` | cross_community | 6 |
| `HandlePreToolUse → IsGlobalRegistryDir` | cross_community | 4 |
| `DropZone → ValidateBackendUrl` | cross_community | 4 |
| `RightPanel → IsNearBottom` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Services | 4 calls |
| Components | 2 calls |
| Llm | 1 calls |

## How to Explore

1. `context({name: "createKnowledgeGraph"})` — see callers and callees
2. `query({search_query: "hooks"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
