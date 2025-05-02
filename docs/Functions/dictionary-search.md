---
id: dictionary-search
title: Dictionary Search
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The purpose of the dictionary search is to search words exactly as they appear in the books.

***Words can be searched inflected, sandhi-ed, compounded, in any transliteration format.*** 

Searching with no diacritics is also supported for non-inflected matches. 

## Basic Usage

To use the dictionary search, type on the upper search bar or press *ctrl + k* (or *cmd + k* on Mac) and type. 

*Try typing 'eṣyāmi' or 'eSyAmi' or 'samskara' and see what happens!*

<Tabs className="unique-tabs">
  <TabItem value="Search Result"> ![SearchResult](/img/SearchResult.png)</TabItem>
  <TabItem value="With Inflection Table">![SearchResultInflection](/img/SearchResultInflection.png)</TabItem>
</Tabs>

### Search Results

When we search for a word, the system tries to multiple information for the word, if available. 

For example if we search for 'pratiprasave' 

1. *Word stem*: i.E: ‘pratiprasava’
2. *Grammatical tagging*: masculine noun/adjective ending in a
3. *Declension: Case (for nouns) or Inflection (for verbs)*: 'locative, singular'
4. *Inflection table*
5. *Original word*: 'pratiprasave’;
6. *Word Components* according to the Monnier Williams: 'prati—prasava’;
7. *Dictionary entries*: for all the selected dictionaries, by default only the MW dictionary is selected;

:::note 

To open up the inflection table click on the orange *Sheet* icon in the grammar section of the results. 

*Word Components can be clicked!* Clicking them open up the word entry. 

*Sanskrit words in the results can be clicked as well!* 

:::

### Select Dictionaries 

By default, only the Monnier Williams dictionary is selected. To access multiple or alternative dictionaries, you can select them on the navbar 'Dictionary' Input. 

Here is the list of the currently available dictionaries, with abbreviation: 

- 'mw': 'Monier-Williams Sanskrit-English Dictionary' 
- 'ap90': 'Apte Practical Sanskrit-English Dictionary'
- ‘cae': 'Cappeller Sanskrit-English Dictionary'
- 'ddsa': 'Macdonell A Practical Sanskrit Dictionary'
- 'gra': 'Grassmann Wörterbuch zum Rig Veda'
- 'bhs': 'Edgerton Buddhist Hybrid Sanskrit Dictionary'
- 'cped': 'Concise Pali English Dictionary'

### Out of dictionary words

If a word outside the selected dictionaries is searched, the system automatically selects a dictionary that has the entry. 

In the image we can see the results of searching for the word 'dvanva' with only the default MW selected. 

![dvandva](/img/Dvandva.png)





