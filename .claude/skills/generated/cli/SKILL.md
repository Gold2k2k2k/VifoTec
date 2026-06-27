---
name: cli
description: "Skill for the Cli area of VifoTec. 211 symbols across 37 files."
---

# Cli

211 symbols | 37 files | Cohesion: 80%

## When to Use

- Working with code in `Skill/`
- Understanding how getEditorTargets, mcpTarget, skillTarget work
- Modifying cli-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/cli/analyze.ts` | terminalColumns, write, moveVertical, cursorSave, cursorRestore (+39) |
| `Skill/GitNexus/gitnexus/src/cli/setup.ts` | selectedCodingAgents, resolveGitnexusBin, getMcpEntry, getOpenCodeMcpEntry, mergeJsoncFile (+22) |
| `Skill/GitNexus/gitnexus/src/cli/eval-server.ts` | validateHost, evalServerCommand, formatQueryResult, formatContextResult, formatTruncationSuffix (+10) |
| `Skill/GitNexus/gitnexus/src/cli/skill-gen.ts` | generateSkillFiles, buildCommunitiesFromMemberships, aggregateCommunities, buildMembershipMap, buildNodeCommunityLabelMap (+9) |
| `Skill/GitNexus/gitnexus/src/cli/uninstall.ts` | removeJsoncKey, removeHookEntries, isGitnexusHook, removeDir, listGitnexusSkillNames (+6) |
| `Skill/GitNexus/gitnexus/src/cli/wiki.ts` | parsePositiveIntegerOption, isLocalProvider, localModelConfigKey, prompt, wikiCommand (+5) |
| `Skill/GitNexus/gitnexus/src/cli/analyze-config.ts` | mergeAnalyzeOptions, GitNexusRcError, isHiddenOrControl, assertNoHiddenChars, validateBranchName (+5) |
| `Skill/GitNexus/gitnexus/src/cli/tool.ts` | getBackend, output, queryCommand, contextCommand, impactCommand (+4) |
| `Skill/GitNexus/gitnexus/src/cli/ai-context.ts` | findGroupsContainingRegistryName, markdownSafeBranch, generateGitNexusContent, installSkills, generateAIContextFiles (+4) |
| `Skill/GitNexus/gitnexus/src/cli/cli-message.ts` | cliErrorKey, writeStderr, cliInfo, cliInfoKey, cliError (+2) |

## Entry Points

Start here when exploring this area:

- **`getEditorTargets`** (Function) — `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts:85`
- **`mcpTarget`** (Function) — `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts:157`
- **`skillTarget`** (Function) — `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts:164`
- **`setupCommand`** (Function) — `Skill/GitNexus/gitnexus/src/cli/setup.ts:1002`
- **`cliErrorKey`** (Function) — `Skill/GitNexus/gitnexus/src/cli/cli-message.ts:122`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `WikiGenerator` | Class | `Skill/GitNexus/gitnexus/src/core/wiki/generator.ts` | 112 |
| `GitNexusRcError` | Class | `Skill/GitNexus/gitnexus/src/cli/analyze-config.ts` | 47 |
| `getEditorTargets` | Function | `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts` | 85 |
| `mcpTarget` | Function | `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts` | 157 |
| `skillTarget` | Function | `Skill/GitNexus/gitnexus/src/cli/editor-targets.ts` | 164 |
| `setupCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/setup.ts` | 1002 |
| `cliErrorKey` | Function | `Skill/GitNexus/gitnexus/src/cli/cli-message.ts` | 122 |
| `queryCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 60 |
| `contextCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 90 |
| `impactCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 122 |
| `cypherCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 206 |
| `detectChangesCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 228 |
| `checkCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 244 |
| `traceCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/tool.ts` | 284 |
| `displayWidth` | Function | `Skill/GitNexus/gitnexus/src/cli/doctor.ts` | 36 |
| `padDisplayEnd` | Function | `Skill/GitNexus/gitnexus/src/cli/doctor.ts` | 47 |
| `doctorCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/doctor.ts` | 80 |
| `detectCliLanguage` | Function | `Skill/GitNexus/gitnexus/src/cli/i18n/index.ts` | 29 |
| `getCliLanguage` | Function | `Skill/GitNexus/gitnexus/src/cli/i18n/index.ts` | 38 |
| `t` | Function | `Skill/GitNexus/gitnexus/src/cli/i18n/index.ts` | 42 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `EvalServerCommand → GetGlobalDir` | cross_community | 6 |
| `CleanCommand → NormalizeCliLanguage` | cross_community | 5 |
| `DoctorCommand → NormalizeCliLanguage` | intra_community | 5 |
| `EvalServerCommand → Free` | cross_community | 5 |
| `EvalServerCommand → Claim` | cross_community | 5 |
| `EvalServerCommand → GetStoragePath` | cross_community | 5 |
| `Server → TraceRss` | cross_community | 5 |
| `Server → CheckStalenessAsync` | cross_community | 5 |
| `Server → Norm` | cross_community | 5 |
| `Server → RequireInt` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Local | 22 calls |
| Storage | 16 calls |
| Embeddings | 5 calls |
| Wiki | 4 calls |
| Integration | 4 calls |
| Lbug | 3 calls |
| Tree-sitter | 2 calls |
| Group | 1 calls |

## How to Explore

1. `context({name: "getEditorTargets"})` — see callers and callees
2. `query({search_query: "cli"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
