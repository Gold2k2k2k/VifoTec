---
name: components
description: "Skill for the Components area of VifoTec. 210 symbols across 55 files."
---

# Components

210 symbols | 55 files | Cohesion: 82%

## When to Use

- Working with code in `Skill/`
- Understanding how getGeminiResponse, IconTelescope, IconStar work
- Modifying components-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/components/Icons.tsx` | IconTelescope, IconStar, IconGallery, IconRadar, IconSearch (+21) |
| `src/components/StellariumSky.tsx` | computePlanetPosition, getJulianDate, getDaysSinceJ2000, getLST, eqToHoriz (+10) |
| `Skill/GitNexus/gitnexus-web/src/components/RepoAnalyzer.tsx` | isValidGithubUrl, isValidGitlabUrl, isValidAzureUrl, AnalyzeButton, DoneState (+9) |
| `Skill/GitNexus/gitnexus-web/src/components/SettingsPanel.tsx` | checkOllamaStatus, SettingsPanel, checkOllamaConnection, timer, handleProviderChange (+7) |
| `Skill/GitNexus/gitnexus-web/src/components/RightPanel.tsx` | RightPanel, adjustTextareaHeight, resolveFilePathForUI, findFileNodeIdForUI, handleGroundingClick (+4) |
| `Skill/GitNexus/gitnexus-web/src/components/FileTreePanel.tsx` | TreeItem, getNodeTypeIcon, FileTreePanel, buildFileTree, fileTree (+4) |
| `src/App.tsx` | Radar3D, VRGallery, App, getSpectrumFilters, handleChatSubmit (+2) |
| `Skill/GitNexus/gitnexus-web/src/components/DropZone.tsx` | handleAutoConnect, connectToRepo, Crossfade, SuccessCard, LoadingCard (+1) |
| `Skill/GitNexus/gitnexus-web/src/components/MarkdownRenderer.tsx` | MarkdownRenderer, code, formatMarkdownForDisplay, formattedContent, handleLinkClick (+1) |
| `Skill/GitNexus/gitnexus-web/src/components/OnboardingGuide.tsx` | CopyButton, TerminalWindow, StepDot, StepRow, PollingBar (+1) |

## Entry Points

Start here when exploring this area:

- **`getGeminiResponse`** (Function) — `src/aiService.ts:10`
- **`IconTelescope`** (Function) — `src/components/Icons.tsx:12`
- **`IconStar`** (Function) — `src/components/Icons.tsx:22`
- **`IconGallery`** (Function) — `src/components/Icons.tsx:36`
- **`IconRadar`** (Function) — `src/components/Icons.tsx:44`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getGeminiResponse` | Function | `src/aiService.ts` | 10 |
| `IconTelescope` | Function | `src/components/Icons.tsx` | 12 |
| `IconStar` | Function | `src/components/Icons.tsx` | 22 |
| `IconGallery` | Function | `src/components/Icons.tsx` | 36 |
| `IconRadar` | Function | `src/components/Icons.tsx` | 44 |
| `IconSearch` | Function | `src/components/Icons.tsx` | 53 |
| `IconMinus` | Function | `src/components/Icons.tsx` | 74 |
| `IconPin` | Function | `src/components/Icons.tsx` | 80 |
| `IconSelect` | Function | `src/components/Icons.tsx` | 87 |
| `IconRuler` | Function | `src/components/Icons.tsx` | 93 |
| `IconMagnify` | Function | `src/components/Icons.tsx` | 103 |
| `IconBlackhole` | Function | `src/components/Icons.tsx` | 112 |
| `IconRocket` | Function | `src/components/Icons.tsx` | 120 |
| `IconExpand` | Function | `src/components/Icons.tsx` | 129 |
| `IconBrain` | Function | `src/components/Icons.tsx` | 200 |
| `IconPanel` | Function | `src/components/Icons.tsx` | 207 |
| `QuizOverlay` | Function | `src/components/QuizOverlay.tsx` | 11 |
| `handleQuizAnswer` | Function | `src/components/QuizOverlay.tsx` | 16 |
| `SpaceNewsTicker` | Function | `src/components/SpaceNewsTicker.tsx` | 2 |
| `BottomDock` | Function | `src/components/layout/BottomDock.tsx` | 14 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `DropZone → BackendError` | cross_community | 6 |
| `GraphCanvas → GetNodeLayer` | cross_community | 5 |
| `HandleFolderUpload → BackendError` | cross_community | 5 |
| `DropZone → Github` | cross_community | 5 |
| `DropZone → Gitlab` | cross_community | 5 |
| `DropZone → AzureDevops` | cross_community | 5 |
| `Header → Github` | cross_community | 4 |
| `Header → Gitlab` | cross_community | 4 |
| `Header → AzureDevops` | cross_community | 4 |
| `Header → BackendError` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Services | 16 calls |
| Hooks | 6 calls |
| Cluster_1783 | 2 calls |
| Llm | 1 calls |
| Cluster_121 | 1 calls |
| Cluster_118 | 1 calls |
| Cluster_119 | 1 calls |

## How to Explore

1. `context({name: "getGeminiResponse"})` — see callers and callees
2. `query({search_query: "components"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
