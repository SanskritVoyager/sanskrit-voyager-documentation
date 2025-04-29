---
id: process
title: Process-Sanskrit
sidebar_position: 5
---

# Process-Sanskrit

**[Process-Sanskrit](https://github.com/Giacomo-De-Luca/Process-Sanskrit?tab=readme-ov-file) is a *python* open-source library for automatic Sanskrit text annotation and inflected dictionary search.**

The library has two main use cases: 

1. **Dictionary search:** multi dictionary lookup with grammatical annotation for words exactly as they are written in texts: in **any transliteration format, inflected, compounded and with sandhi**. x
2. **Automatic Text Annotation:** generate automatically version of Sanskrit texts without sandhi and with split compounds, with grammatical annotations and dictionary entries for each word. 

The architecture of the library is based on a cascading approach to Sanskrit text analysis, as described in our NAACL 2025 paper: [*`Accessible Sanskrit: A Cascading System for Text Analysis and Dictionary Access.`*](https://aclanthology.org/2025.alp-1.5/)

The library is one of the main components powering up the [***Sanskrit Voyager*** backend](https://www.sanskritvoyager.com/). It is used for dictionary searches, stemming, and to pre-process texts for the corpus search. 

:::note
*The following is the Quickstart guide. For a more detailed documentation and the advanced features see the next pages.* 
:::

## Installation

To install the library use the standard *pip install process-sanskrit* command, then call ***update-ps-database*** in the terminal to setup the database. 

```bash
pip install process-sanskrit
update-ps-database
```

`***update-ps-database***` downloads and setup the database with the dictionaries and the inflection tables (adjusted from [**CLS inflect**](https://github.com/sanskrit-lexicon/csl-inflect)
) in the resources folder (150 mb download, 583 mb uncompressed, released with [Creative Commons NC license](https://creativecommons.org/licenses/by-nc/4.0/)).

```python

## if inside jupyter or colab use:

!pip install process-sanskrit
!update-ps-database

```
:::warning
*only the **transliterate** function works without the database!*
:::

## Process Function:

The core of the library is the **process** function, that accepts as argument text in Sanskrit as input and executes an entire text processing pipeline. Let's see it in action with the technical term *'pratiprasava'*, counter-flowing. 

```python
import process_sanskrit as ps 

print(ps.process("pratiprasave"))
```


Process returns a list that contains for each root in the text: 


1. **Word stem**: ‘pratiprasava’
2. **Grammatical tagging**: masculine noun/adjective ending in a
3. **Case** (for nouns) **or Inflection** (for verbs): [('Loc', 'Sg')]
4. **Inflection table** for the word as a list:  ['pratiprasavaḥ', 'pratiprasavau', 'pratiprasavāḥ', 'pratiprasavam', 'pratiprasavau', 'pratiprasavān', 'pratiprasavena', 'pratiprasavābhyām', 'pratiprasavaiḥ', 'pratiprasavāya', 'pratiprasavābhyām', 'pratiprasavebhyaḥ', 'pratiprasavāt', 'pratiprasavābhyām', 'pratiprasavebhyaḥ', 'pratiprasavasya', 'pratiprasavayoḥ', 'pratiprasavānām', 'pratiprasave', 'pratiprasavayoḥ', 'pratiprasaveṣu', 'pratiprasava', 'pratiprasavau', 'pratiprasavāḥ']
5. **Original word**: 'pratiprasave’
6. **Word Components** according to the Monnier Williams: (in this case none) 'prati—prasava’
7. **Dictionary entries** in XML format. In the form of a dictionary for all the selected dictionaries: 'mw': 'pratiprasava': 
```xml 
['<s>prati—prasava</s> <hom>a</hom>   See under <s>prati-pra-</s> √ <hom>1.</hom> <s>sū</s>.', '<s>prati-°prasava</s> <hom>b</hom>   <lex>m.</lex> counter-order, suspension of a general prohibition in a particular case, <ls>Śaṃkarācārya  </ls>; <ls>Kātyāyana-śrauta-sūtra </ls>, <ab>Scholiast or Commentator</ab>; <ls>Manvarthamuktāvalī, KullūkaBhaṭṭa\'s commentary on Manu-smṛti </ls><info lex="m"/>', '  an exception to an exception, <ls>Taittirīya-prātiśākhya </ls>, <ab>Scholiast or Commentator</ab><info lex="inh"/>', '  return to the original state, <ls>Yoga-sūtra </ls><info lex="inh"/>']
```


:::note
Process automatically `detects transliteration scheme` and `transliterate to IAST`. If that is problematic, pre-transliterate to IAST first using the *transliterate* function. 

Also, ***the base version of Process is optimised for single words***, - if you have a sentence or book, split by spaces and pass each term to transliterate. 

In the online interface it is possible to retrive the entries for the components (in this case *'prati'* and *'prasava'*) by clicking on them. Clicking automatically sends to the dictionary entry of the components. 
:::

### Dictionary Selection:

The process function returns dictionary entries for the found roots. 

**By default, only the Monnier Williams dictionary is selected.** 

In the following example we search for a word that is not in the MW: 'dvandva'. The process function automatically check if any of the dictionaries has it and automatically select it. In this case the word is found in the Macdonnell dictionary. 


```python
 
import process_sanskrit as ps
print(ps.process('dvandva'))

```

**To use more dictionaries**, process accepts as optional *`arguments`* the dictionary abbreviation. In the following code example we retrieve the entries for the word *'saṃskāra'*  from the *Apte, Cappeller, Grassman, and Edgerton* dictionaries. 


```python 

import process_sanskrit as ps

print(ps.process('saṃskāra', 'ap90', 'cae', 'gra', 'bhs'))
```

### Available Dictionaries and Abbreviations 

Here is the list of all the currently available dictionaries with the abbreviations:

```
- 'mw': 'Monier-Williams Sanskrit-English Dictionary' ,
- 'ap90': 'Apte Practical Sanskrit-English Dictionary'
- ‘cae': 'Cappeller Sanskrit-English Dictionary'
- 'ddsa': 'Macdonell A Practical Sanskrit Dictionary'
- 'gra': 'Grassmann Wörterbuch zum Rig Veda'
- 'bhs': 'Edgerton Buddhist Hybrid Sanskrit Dictionary'
- 'cped': 'Concise Pali English Dictionary'
```

All the dictionaries are slightly modified version of the *Cologne Digital Sanskrit Dictionaries*, apart from the [The Concise Pali-English Dictionary By Buddhadatta Mahathera](https://buddhistuniversity.net/content/reference/concise-pali-dictionary). The Pali dictionary was added in to handle words that appears in the late Buddhist authors. 

```
Cologne Digital Sanskrit Dictionaries, version 2.7.286,
Cologne University, accessed on February 19, 2025,
https://www.sanskrit-lexicon.uni-koeln.de
```

### Stemming:

The process function can be used just for simple sandhi/compound split and stemming, adding the optional flag: *mode=’roots’*.

```python
import process_sanskrit as ps

print(ps.process('yamaniyamāsanaprāṇāyāmapratyāhāradhāraṇādhyānasamādhayo', mode='roots'))

## output:
## ['yama', 'niyama', 'asana', 'prāṇāyāma', 'pratyāhāra', 'dhāraṇa', 'dhyāna', 'samādhi']
```


:::note 

In case of ambiguity the process function does not select between the two (or three) possibilities, but returns all of them.

:::


### Transliteration:

The library offers a function to transliterate texts with auto-detection for the transliteration input format. This function is a slight adaptation from [*Indic-Transliteration Detect*](https://github.com/indic-transliteration/detect.py).

```python
import process_sanskrit as ps

# Transliteration
print(ps.transliterate("patañjali", "DEVANAGARI")) ## IAST 
print(ps.transliterate("pataJjali", "DEVANAGARI")) ## HK format

## same output:
## पतञ्जलि

## In case you need to manually select the input scheme, 
## force it using the optional 'input_scheme' flag
## the scheme it's not case sensitive (slp1=SLP1): 

print(ps.transliterate('pataYjali', 'tamil', input_scheme='slp1'))

## output: பதஞ்ஜலி
```

### Dictionary Search:

The library provides the *`dict_search`*  function to retrieve dictionary entries. 

The function accepts as argument a list of strings to be searched and optionally a list of dictionary tags (as outlined in "Available Dictionaries and Abbreviations").

:::warning

Unlike the *`process`* function, *`dict_search`* requires close to exact matches. 

The input should also be in IAST format. 

:::

The online version uses UTF-8 decomposition in *Javascript* to map entries with no diacritics to the correct entry with diacritics. 


```python
import process_sanskrit as ps

# example usage for Dictionary lookup
print(ps.dict_search(['pratiprasava', 'saṃskāra']))

# after a list of entries, optionally add dictionary tags to search in multiple dictionaries. 

# search in Edgerton Buddhist Hybrid Sanskrit Dictionary
# and Grassmann Wörterbuch zum Rig Veda:
print(ps.dict_search(['pratiprasava', 'saṃskāra'], 'gra', 'bhs'))
```

:::note

*The library automatically handles the fact that the `Apte Dictionary` records nominatives instead of un-inflected stems (i.E. yogaḥ instead of yoga)*. 

:::



