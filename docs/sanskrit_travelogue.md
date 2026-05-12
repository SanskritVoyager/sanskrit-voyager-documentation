---
title: Sanskrit Travelogue Corpus
description: A unified corpus of 12,395 Sanskrit texts (73M words) from 8 digital libraries, normalised to IAST and deduplicated
sidebar_label: Corpus Overview
sidebar_position: 6
---

# Sanskrit Travelogue Corpus

The Sanskrit Travelogue corpus unifies texts from 8 major Sanskrit digital libraries into a single, deduplicated dataset with standardised formatting. It is the largest openly available aggregated Sanskrit text corpus.

## At a Glance

| | |
|---|---|
| **Unique texts** | 12,395 |
| **Segments** | 9,092,023 |
| **Words** | 73,089,921 |
| **Transliteration** | IAST (International Alphabet of Sanskrit Transliteration) |
| **Format** | TSV (tab-separated values) + Parquet |
| **Duplicates removed** | 693 texts (5.3%), 1.9M segments (17.4%) |
| **License** | CC-NC (Creative Commons Non-Commercial) |

## Source Collections

The corpus aggregates texts from 8 independent digitisation projects. Each collection specialises in a different subset of the Sanskrit literary tradition.

| Collection | Texts | Share | Description |
|------------|-------|-------|-------------|
| **SanskritDocuments** | 8,614 | 69.5% | Community-contributed texts from [sanskritdocuments.org](https://sanskritdocuments.org/). Broad coverage of stotras, puranas, upanishads, and miscellaneous works |
| **Dharmanexus** | 1,398 | 11.3% | Buddhist and Hindu texts from the Dharmamitra project. Richest categorisation system (77 genre codes) |
| **GRETIL** | 800 | 6.5% | Gottingen Register of Electronic Texts in Indian Languages. Scholarly TEI XML editions from the University of Gottingen |
| **DSBC** | 751 | 6.1% | Digital Sanskrit Buddhist Canon. Canonical Buddhist texts from the University of the West |
| **Muktabodha** | 495 | 4.0% | Muktabodha Indological Research Institute. Specialised Tantric and Shaiva texts |
| **DCS** | 231 | 1.9% | Digital Corpus of Sanskrit (Oliver Hellwig). Linguistically annotated texts with morphological analysis |
| **SARIT** | 85 | 0.7% | Search and Retrieval of Indic Texts. Scholarly critical editions of the highest editorial quality |
| **YogaVaisaradi** | 21 | 0.2% | Foundation dedicated to Krishnamacarya. Yoga and philosophy texts with commentaries |

:::info Two collections excluded
**CTS** (Classical Text Server) is excluded due to copyright restrictions. **UOH** (University of Hyderabad) is excluded because it contains modern texts not suitable for a classical Sanskrit corpus.
:::

## Data Format

The corpus is distributed as two paired TSV files (or Parquet equivalents):

### Metadata (`metadata.tsv`)

One row per text. Identifies each work and its provenance.

| Column | Type | Description | Fill Rate |
|--------|------|-------------|-----------|
| `text_id` | int | Unique identifier | 100% |
| `collection` | string | Source collection name | 100% |
| `title` | string | Book/text title in IAST | 100% |
| `author` | string | Author name | 12.0% |
| `category` | string | Genre/category label | 38.6% |
| `word_count` | int | Total words in the text | 100% |
| `segment_count` | int | Number of segments | 100% |
| `avg_segment_length` | float | Words per segment | 100% |
| `source` | string | Source identifier | 100% |
| `notes` | string | Free-text notes | 3.6% |

:::note On metadata sparsity
Author and category fill rates are limited by what the source collections provide. SanskritDocuments (69% of the corpus) has no author metadata. Category coverage is strongest for Dharmanexus (77-code system) and DCS (subject field). See the [Metadata Enrichment](#metadata-enrichment) section for details.
:::

### Segments (`segments.tsv`)

One row per text segment (verse, prose paragraph, or structural unit).

| Column | Type | Description |
|--------|------|-------------|
| `segment_id` | string | `{text_id}_{segment_number}` |
| `text_id` | int | Foreign key to metadata |
| `segment_number` | int | Position within the text |
| `text` | string | Sanskrit text content in IAST |
| `type` | string | Segment type: `verse`, `prose`, `note`, `text` |
| `chapter` | string | Chapter identifier (if available) |
| `section` | string | Section identifier (if available) |
| `verse_number` | string | Verse number (if available) |
| `page_number` | string | Page number (if available) |

## Processing Pipeline

The corpus is built through a multi-stage pipeline:

```
Raw sources           Cleaned TSVs           Unified corpus
(HTML, XML,    --->   (per-collection   ---> (metadata.tsv
 TEI, ITX)             metadata.tsv           + segments.tsv)
                       + segments.tsv)
                                                    |
                                         +----------+----------+
                                         |                     |
                                   Deduplication        Metadata Enrichment
                                   (693 texts           (author, category,
                                    removed)              word counts)
                                         |                     |
                                         +----------+----------+
                                                    |
                                              Final corpus
                                            (12,395 texts,
                                             9.09M segments)
```

### Stage 1: Download

Four automated scrapers download texts from DSBC, SanskritDocuments, UOH, and YogaVaisaradi. The remaining collections (DCS, GRETIL, Dharmanexus, Muktabodha, SARIT) are obtained from pre-existing datasets.

### Stage 2: Convert

Each collection has a dedicated converter that transforms its native format (HTML, XML, TEI, ITX, plain text, CSV) into standardised TSV. All converters inherit from a shared `BaseConverter` class and are configured via a central `config.yaml`. All text is normalised to IAST transliteration.

### Stage 3: Merge

The `CorpusMerger` class incrementally merges 9 per-collection TSV files into a single unified corpus. The merger uses streaming writes and chunked reads to handle the full dataset without memory issues.

### Stage 4: Deduplicate

Because the 8 source projects often digitised the same canonical works, cross-source overlap is significant. Deduplication uses three complementary pipelines:

1. **Title-based matching** -- Fuzzy title comparison (SequenceMatcher at 90% threshold) with cross-transliteration normalisation
2. **LLM-verified content comparison** -- Agent-based segment comparison for candidates found by lowered title thresholds (70%) and content fingerprinting
3. **GRETIL HTML cross-check** -- Specialised pipeline for 682 HTML-only GRETIL texts that needed verification against the merged corpus

When two texts are confirmed duplicates, the copy from the higher-quality collection is kept, following a priority ranking: SARIT > GRETIL > Muktabodha > YogaVaisaradi > DCS > DSBC > Dharmanexus > SanskritDocuments.

**Result:** 693 texts (5.3%) and 1.9M segments (17.4%) removed.

### Stage 5: Enrich Metadata

The enrichment pipeline pulls author, category, and other metadata from per-collection source files that were discarded during the merge step. It also computes text-level statistics (word count, segment count, average segment length) and exports to Parquet format.

## Transliteration

All texts in the corpus are normalised to **IAST** (International Alphabet of Sanskrit Transliteration), the standard romanisation scheme for Sanskrit. The source collections use a variety of schemes:

| Scheme | Example | Used by |
|--------|---------|---------|
| IAST | Viṣṇupurāṇa | Target format |
| Devanagari | विष्णुपुराण | Muktabodha titles, some DSBC |
| SLP1 | viRNupurARa | DCS |
| Harvard-Kyoto | ViSNupurANa | GRETIL HTML |
| ITRANS | vishhNupurANa | SanskritDocuments |

The pipeline auto-detects input transliteration schemes and converts to IAST using the `indic-transliteration` and `aksharamukha` libraries, with custom converters for non-standard schemes (Kyoto-Harvard, SV).

## Deduplication Methodology

Sanskrit duplicate detection faces unique challenges:

- **Transliteration diversity** -- The same title can appear as `Viṣṇupurāṇa` (IAST), `ViSNupurANa` (HK), or विष्णुपुराण (Devanagari)
- **Collection-specific naming** -- Muktabodha appends IDs (`ānandatantra-M00066`), GRETIL prefixes authors (`nāgārjuna-ratnāvalī`), Dharmanexus prefixes `Unknown:`
- **Segmentation differences** -- The same text may be segmented by verse, chapter, or paragraph across collections
- **Near-duplicates** -- Variant editions, commentaries, and abridgements share content without being identical

Title normalisation strips collection-specific prefixes and suffixes, then removes diacritics and lowercases for cross-scheme comparison. Content fingerprinting hashes head/middle/tail segment blocks to catch duplicates with entirely different titles but identical content.

## Metadata Enrichment

The raw merged corpus has very sparse metadata (5.5% author fill rate, 11.3% category). The enrichment pipeline recovers metadata from per-collection source files:

| Collection | Key contribution |
|------------|-----------------|
| DCS | Author (128 texts), dates (208), subject (227) |
| Dharmanexus | Category codes (1,398 texts) with 77-code classification system |
| GRETIL | Author (437 texts) from TEI metadata |
| DSBC | Limited (sparse source metadata) |
| Muktabodha | Author (176) via catalog number matching |
| SARIT | Author and title from nested TEI/JSON metadata |
| SanskritDocuments | Genre (2,620) inferred from folder structure |
| YogaVaisaradi | Static category ("Yoga") |

### Dharmanexus Category System

The richest categorisation comes from Dharmanexus, which uses a hierarchical 77-code system:

| Prefix | Domain | Examples |
|--------|--------|----------|
| K | Buddhist Scripture | K01 Vinaya, K10 Sutra, K14 Tantra |
| T | Buddhist Treatise | T01 Stotra, T04 Madhyamaka |
| GV | Veda | GV00 Samhita, GV04 Upanishad |
| GE | Epic | GE07 Mahabharata, GE09 Ramayana |
| GP | Purana | GP10 Bhagavata, GP12 Other |
| GR | Religion | GR12 Jaina, GR13 Shaiva, GR14 Vaishnava |
| GK | Literature | GK16 Poetry, GK19 Drama |
| GS | Shastra | GS24 Grammar, GSP Philosophy |

## Corpus Statistics

### Collection distribution

```
SanskritDocuments ████████████████████████████████████  69.5%
Dharmanexus       ██████                                11.3%
GRETIL            ███                                    6.5%
DSBC              ███                                    6.1%
Muktabodha        ██                                     4.0%
DCS               █                                      1.9%
SARIT                                                    0.7%
YogaVaisaradi                                            0.2%
```

### Text sizes

The corpus spans a wide range of text sizes, from short stotras (devotional hymns) with a handful of verses to massive epics with tens of thousands of segments.

## Acknowledgements

This corpus aggregates texts from multiple digitisation projects. All credit for the original texts and their digital editions goes to:

- **GRETIL** (Gottingen Register of Electronic Texts in Indian Languages) -- University of Gottingen
- **SARIT** (Search and Retrieval of Indic Texts) -- Collaborative scholarly project
- **Muktabodha Indological Research Institute** -- Digital library of Sanskrit texts
- **Digital Sanskrit Buddhist Canon (DSBC)** -- University of the West
- **Digital Corpus of Sanskrit (DCS)** -- Oliver Hellwig
- **Dharmanexus** -- Dharmamitra project
- **[sanskritdocuments.org](https://sanskritdocuments.org/)** -- Community-contributed texts
- **University of Hyderabad** -- Sanskrit text collection
- **Yoga Vaisharadi** -- Foundation dedicated to Krishnamacarya
