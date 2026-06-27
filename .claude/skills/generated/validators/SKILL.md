---
name: validators
description: "Skill for the Validators area of VifoTec. 138 symbols across 12 files."
---

# Validators

138 symbols | 12 files | Cohesion: 96%

## When to Use

- Working with code in `Skill/`
- Understanding how process_text_content, process_text_content, process_text_content work
- Modifying validators-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `Skill/skills/skills/docx/scripts/office/validators/base.py` | validate_xml, validate_namespaces, validate_unique_ids, validate_file_references, validate_all_relationship_ids (+16) |
| `Skill/skills/skills/pptx/scripts/office/validators/base.py` | validate_xml, validate_namespaces, validate_unique_ids, validate_file_references, validate_all_relationship_ids (+16) |
| `Skill/skills/skills/xlsx/scripts/office/validators/base.py` | validate_xml, validate_namespaces, validate_unique_ids, validate_file_references, validate_all_relationship_ids (+16) |
| `Skill/skills/skills/docx/scripts/office/validators/docx.py` | validate, validate_whitespace_preservation, validate_deletions, count_paragraphs_in_unpacked, count_paragraphs_in_original (+8) |
| `Skill/skills/skills/pptx/scripts/office/validators/docx.py` | validate, validate_whitespace_preservation, validate_deletions, count_paragraphs_in_unpacked, count_paragraphs_in_original (+8) |
| `Skill/skills/skills/xlsx/scripts/office/validators/docx.py` | validate, validate_whitespace_preservation, validate_deletions, count_paragraphs_in_unpacked, count_paragraphs_in_original (+8) |
| `Skill/skills/skills/docx/scripts/office/validators/pptx.py` | validate, validate_uuid_ids, _looks_like_uuid, validate_slide_layout_ids, validate_no_duplicate_slide_layouts (+2) |
| `Skill/skills/skills/pptx/scripts/office/validators/pptx.py` | validate, validate_uuid_ids, _looks_like_uuid, validate_slide_layout_ids, validate_no_duplicate_slide_layouts (+2) |
| `Skill/skills/skills/xlsx/scripts/office/validators/pptx.py` | validate, validate_uuid_ids, _looks_like_uuid, validate_slide_layout_ids, validate_no_duplicate_slide_layouts (+2) |
| `Skill/skills/skills/docx/scripts/office/validators/redlining.py` | validate, _generate_detailed_diff, _get_git_word_diff, _remove_author_tracked_changes, _extract_text_content |

## Entry Points

Start here when exploring this area:

- **`process_text_content`** (Function) — `Skill/skills/skills/docx/scripts/office/validators/base.py:820`
- **`process_text_content`** (Function) — `Skill/skills/skills/pptx/scripts/office/validators/base.py:820`
- **`process_text_content`** (Function) — `Skill/skills/skills/xlsx/scripts/office/validators/base.py:820`
- **`BaseSchemaValidator`** (Class) — `Skill/skills/skills/docx/scripts/office/validators/base.py:11`
- **`DOCXSchemaValidator`** (Class) — `Skill/skills/skills/docx/scripts/office/validators/docx.py:15`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `BaseSchemaValidator` | Class | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 11 |
| `DOCXSchemaValidator` | Class | `Skill/skills/skills/docx/scripts/office/validators/docx.py` | 15 |
| `PPTXSchemaValidator` | Class | `Skill/skills/skills/docx/scripts/office/validators/pptx.py` | 9 |
| `BaseSchemaValidator` | Class | `Skill/skills/skills/pptx/scripts/office/validators/base.py` | 11 |
| `DOCXSchemaValidator` | Class | `Skill/skills/skills/pptx/scripts/office/validators/docx.py` | 15 |
| `PPTXSchemaValidator` | Class | `Skill/skills/skills/pptx/scripts/office/validators/pptx.py` | 9 |
| `BaseSchemaValidator` | Class | `Skill/skills/skills/xlsx/scripts/office/validators/base.py` | 11 |
| `DOCXSchemaValidator` | Class | `Skill/skills/skills/xlsx/scripts/office/validators/docx.py` | 15 |
| `PPTXSchemaValidator` | Class | `Skill/skills/skills/xlsx/scripts/office/validators/pptx.py` | 9 |
| `process_text_content` | Function | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 820 |
| `process_text_content` | Function | `Skill/skills/skills/pptx/scripts/office/validators/base.py` | 820 |
| `process_text_content` | Function | `Skill/skills/skills/xlsx/scripts/office/validators/base.py` | 820 |
| `validate_xml` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 142 |
| `validate_namespaces` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 169 |
| `validate_unique_ids` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 198 |
| `validate_file_references` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 288 |
| `validate_all_relationship_ids` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 384 |
| `validate_content_types` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 491 |
| `validate_against_xsd` | Method | `Skill/skills/skills/docx/scripts/office/validators/base.py` | 635 |
| `validate` | Method | `Skill/skills/skills/docx/scripts/office/validators/docx.py` | 23 |

## How to Explore

1. `context({name: "process_text_content"})` — see callers and callees
2. `query({search_query: "validators"})` — find related execution flows
3. Read key files listed above for implementation details
4. `explain({target: "<file or symbol>"})` — persisted taint findings (source→sink data flows), when indexed with `--pdg`
