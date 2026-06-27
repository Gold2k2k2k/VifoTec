---
name: storage
description: "Skill for the Storage area of VifoTec. 137 symbols across 38 files."
---

# Storage

137 symbols | 38 files | Cohesion: 76%

## When to Use

- Working with code in `Skill/`
- Understanding how augmentCommand, cleanCommand, listCommand work
- Modifying storage-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | canonicalizePath, registryPathEquals, getGlobalRegistryPath, readRegistry, writeRegistry (+28) |
| `Skill/GitNexus/gitnexus/src/storage/parse-cache.ts` | isValidChunkCacheKey, getLegacyCachePath, getCacheDirPath, getCacheIndexPath, getCacheChunkPath (+10) |
| `Skill/GitNexus/gitnexus/src/storage/git.ts` | resolveRepoIdentityRoot, hasGitDir, chompGitOutput, getGitRoot, getCanonicalRepoRoot (+9) |
| `Skill/GitNexus/gitnexus/src/storage/scope-index-store.ts` | has, getScope, getParent, getAncestors, getScope (+8) |
| `Skill/GitNexus/gitnexus/src/storage/parsedfile-store.ts` | makeInterningReviver, forceGc, loadParsedFilesForPaths, getParsedFileStoreDir, clearParsedFileStore (+7) |
| `Skill/GitNexus/gitnexus/src/mcp/local/local-backend.ts` | applyBranchScope, tryRealpath, resolveWorktreeCwd, detectChanges, maybeWarnSiblingDrift |
| `Skill/GitNexus/gitnexus/src/core/ingestion/languages/typescript/simple-hooks.ts` | tsBindingScopeFor, walkToScope, isVarDeclaration |
| `Skill/GitNexus/gitnexus/src/core/lbug/pdg-emit-sink.ts` | close, finalize, close |
| `Skill/GitNexus/gitnexus/src/core/git-staleness.ts` | commitsAheadOfIndexed, checkCwdMatch, norm |
| `Skill/GitNexus/gitnexus/src/core/augmentation/engine.ts` | findRepoForCwd, augment |

## Entry Points

Start here when exploring this area:

- **`augmentCommand`** (Function) — `Skill/GitNexus/gitnexus/src/cli/augment.ts:15`
- **`cleanCommand`** (Function) — `Skill/GitNexus/gitnexus/src/cli/clean.ts:26`
- **`listCommand`** (Function) — `Skill/GitNexus/gitnexus/src/cli/list.ts:9`
- **`removeCommand`** (Function) — `Skill/GitNexus/gitnexus/src/cli/remove.ts:42`
- **`augment`** (Function) — `Skill/GitNexus/gitnexus/src/core/augmentation/engine.ts:85`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `RegistryNameCollisionError` | Class | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 627 |
| `RegistryNotFoundError` | Class | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 909 |
| `AnalysisNotFinalizedError` | Class | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 967 |
| `UnsafeStoragePathError` | Class | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 1044 |
| `DiskBackedScopeTree` | Class | `Skill/GitNexus/gitnexus/src/storage/scope-index-store.ts` | 126 |
| `augmentCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/augment.ts` | 15 |
| `cleanCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/clean.ts` | 26 |
| `listCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/list.ts` | 9 |
| `removeCommand` | Function | `Skill/GitNexus/gitnexus/src/cli/remove.ts` | 42 |
| `augment` | Function | `Skill/GitNexus/gitnexus/src/core/augmentation/engine.ts` | 85 |
| `listQuarantinedMissingShadowWals` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/sidecar-recovery.ts` | 324 |
| `cleanQuarantinedMissingShadowWals` | Function | `Skill/GitNexus/gitnexus/src/core/lbug/sidecar-recovery.ts` | 340 |
| `resolveRepoIdentityRoot` | Function | `Skill/GitNexus/gitnexus/src/storage/git.ts` | 187 |
| `hasGitDir` | Function | `Skill/GitNexus/gitnexus/src/storage/git.ts` | 234 |
| `canonicalizePath` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 56 |
| `registryPathEquals` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 71 |
| `getGlobalRegistryPath` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 544 |
| `readRegistry` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 551 |
| `registerRepo` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 694 |
| `unregisterRepo` | Function | `Skill/GitNexus/gitnexus/src/storage/repo-manager.ts` | 865 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Execute → ParseTruthyEnv` | cross_community | 6 |
| `CleanCommand → SanitizeRepoName` | cross_community | 6 |
| `RegisterGroupCommands → GetGlobalDir` | cross_community | 6 |
| `EvalServerCommand → GetGlobalDir` | cross_community | 6 |
| `CreateServer → GetStoragePath` | cross_community | 5 |
| `Execute → Flush` | cross_community | 5 |
| `CleanCommand → GetStoragePath` | cross_community | 5 |
| `CleanCommand → NormalizeCliLanguage` | cross_community | 5 |
| `CleanCommand → GetGlobalDir` | cross_community | 5 |
| `PhpBindingScopeFor → MapReviver` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Cli | 7 calls |
| Lbug | 4 calls |
| Local | 3 calls |
| Ingestion | 3 calls |
| Pipeline-phases | 2 calls |
| Cluster_779 | 1 calls |
| Tree-sitter | 1 calls |
| Graph-bridge | 1 calls |

## How to Explore

1. `context({name: "augmentCommand"})` — see callers and callees
2. `query({search_query: "storage"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
