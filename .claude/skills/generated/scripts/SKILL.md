---
name: scripts
description: "Skill for the Scripts area of VifoTec. 118 symbols across 27 files."
---

# Scripts

118 symbols | 27 files | Cohesion: 95%

## When to Use

- Working with code in `Skill/`
- Understanding how improve_description, main, find_project_root work
- Modifying scripts-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/skills/skills/mcp-builder/scripts/connections.py` | MCPConnection, MCPConnectionStdio, MCPConnectionSSE, MCPConnectionHTTP, __init__ (+7) |
| `Skill/skills/skills/docx/scripts/comment.py` | _generate_hex_id, _encode_smart_quotes, _append_xml, _find_para_id, _get_next_rid (+5) |
| `Skill/skills/skills/pptx/scripts/clean.py` | get_slides_in_sldidlst, remove_orphaned_slides, remove_trash_directory, get_slide_referenced_files, remove_orphaned_rels_files (+4) |
| `Skill/skills/skills/mcp-builder/scripts/evaluation.py` | parse_evaluation_file, extract_xml_content, agent_loop, evaluate_single_task, run_evaluation (+3) |
| `Skill/GitNexus/gitnexus/scripts/assert-publish-grammar-coverage.cjs` | filesShipsVendorSource, findCoverageProblems, findStrayBuildArtifacts, main, sourceBuildSet (+3) |
| `Skill/skills/skills/pptx/scripts/thumbnail.py` | main, get_slide_info, build_slide_list, create_hidden_placeholder, convert_to_images (+2) |
| `Skill/skills/skills/pptx/scripts/add_slide.py` | get_next_slide_number, create_slide_from_layout, duplicate_slide, _add_to_content_types, _add_to_presentation_rels (+1) |
| `Skill/skills/skills/skill-creator/scripts/aggregate_benchmark.py` | calculate_stats, load_run_results, aggregate_results, generate_benchmark, generate_markdown (+1) |
| `Skill/skills/skills/skill-creator/scripts/run_loop.py` | split_eval_set, run_loop, print_eval_stats, main |
| `Skill/skills/skills/pdf/scripts/extract_form_field_info.py` | get_full_annotation_field_id, make_field_dict, get_field_info, write_field_info |

## Entry Points

Start here when exploring this area:

- **`improve_description`** (Function) — `Skill/skills/skills/skill-creator/scripts/improve_description.py:49`
- **`main`** (Function) — `Skill/skills/skills/skill-creator/scripts/improve_description.py:193`
- **`find_project_root`** (Function) — `Skill/skills/skills/skill-creator/scripts/run_eval.py:21`
- **`run_eval`** (Function) — `Skill/skills/skills/skill-creator/scripts/run_eval.py:183`
- **`main`** (Function) — `Skill/skills/skills/skill-creator/scripts/run_eval.py:258`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `MCPConnection` | Class | `Skill/skills/skills/mcp-builder/scripts/connections.py` | 12 |
| `MCPConnectionStdio` | Class | `Skill/skills/skills/mcp-builder/scripts/connections.py` | 72 |
| `MCPConnectionSSE` | Class | `Skill/skills/skills/mcp-builder/scripts/connections.py` | 87 |
| `MCPConnectionHTTP` | Class | `Skill/skills/skills/mcp-builder/scripts/connections.py` | 99 |
| `improve_description` | Function | `Skill/skills/skills/skill-creator/scripts/improve_description.py` | 49 |
| `main` | Function | `Skill/skills/skills/skill-creator/scripts/improve_description.py` | 193 |
| `find_project_root` | Function | `Skill/skills/skills/skill-creator/scripts/run_eval.py` | 21 |
| `run_eval` | Function | `Skill/skills/skills/skill-creator/scripts/run_eval.py` | 183 |
| `main` | Function | `Skill/skills/skills/skill-creator/scripts/run_eval.py` | 258 |
| `split_eval_set` | Function | `Skill/skills/skills/skill-creator/scripts/run_loop.py` | 23 |
| `run_loop` | Function | `Skill/skills/skills/skill-creator/scripts/run_loop.py` | 46 |
| `print_eval_stats` | Function | `Skill/skills/skills/skill-creator/scripts/run_loop.py` | 153 |
| `main` | Function | `Skill/skills/skills/skill-creator/scripts/run_loop.py` | 243 |
| `parse_skill_md` | Function | `Skill/skills/skills/skill-creator/scripts/utils.py` | 6 |
| `add_comment` | Function | `Skill/skills/skills/docx/scripts/comment.py` | 217 |
| `get_slides_in_sldidlst` | Function | `Skill/skills/skills/pptx/scripts/clean.py` | 26 |
| `remove_orphaned_slides` | Function | `Skill/skills/skills/pptx/scripts/clean.py` | 48 |
| `remove_trash_directory` | Function | `Skill/skills/skills/pptx/scripts/clean.py` | 90 |
| `get_slide_referenced_files` | Function | `Skill/skills/skills/pptx/scripts/clean.py` | 105 |
| `remove_orphaned_rels_files` | Function | `Skill/skills/skills/pptx/scripts/clean.py` | 127 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Office | 3 calls |

## How to Explore

1. `context({name: "improve_description"})` — see callers and callees
2. `query({search_query: "scripts"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
