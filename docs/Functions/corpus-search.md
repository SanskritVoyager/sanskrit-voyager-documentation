---
id: corpus-search
title: Corpus Search
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The *Corpus Search* allows to search for terms or passages in the corpus of the Sanskrit literature. 

At the moment the corpus search uses the [Buddhanexus Sanskrit Corpus](https://github.com/BuddhaNexus/segmented-sanskrit) as a database. 

:::note

While the corpus-search works on mobile, usage on desktop is recommended. 

:::

### Accessing the Corpus search interface


There are three ways to access the feature: 

1. Select "Corpus Search on the navbar";
2. Click on the *Text Search Icon* on the header;
3. Press ctrl + s (or cmd + s on mac);

<Tabs className="unique-tabs">
  <TabItem value="Corpus Search Interface"> ![CorpusSearch](/img/CorpusSearch.png)</TabItem>
  <TabItem value="Corpus Search with Filters">![CorpusSearchFilters](/img/CorpusSearchFilters.png)</TabItem>
</Tabs>


## Basic Usage


Write a term or passage in the search bar to press search for searching. 

- you can search with any transliteration scheme;
- queries with no diacritics are accepted and welcomed;
- short queries work better, if you have no results, try shortening the query; 
- clicking on **Filter**, it's possible to filter by author, book title and collection; 
- press search to start searching! 


:::warning

Result highlighting is only supported for IAST and no diacritics. 

:::


### Search Mode


There are two main search modes: *Individual segments* and *Grouped by Book*. By default *Grouped by Book* is selected.

**Grouped by Book** groups results by books, and it shows the number of match in each book. By clicking on the book title it is possible to look at the individual passages. 


**Individual segments** shows each matched segment directly. 

*In the images are shown the result for the query 'alayavijnana'.*


<Tabs className="unique-tabs">
  <TabItem value="Grouped By Books"> ![GroupedByBook](/img/GroupedByBook.png)</TabItem>
  <TabItem value="Individual Semgments">![IndividualSegments](/img/IndividualSegments.png)</TabItem>
</Tabs>

## Accessing the results, scrollbar ticks

Clicking on the *Book* or *Link* icon in the matched results opens the book. 

In the case of the *Link Icon* it scrolls directly to the matched passage. 

On the scrollbar are automatically added *scrollbar ticks* indicating where the matches are in the text. You can click on the marks to directly scroll on the passages. 

At the moment there is a little bug causing the matched segment(s) to not be clickable for text analysis. The rest of the text can be clicked to directly access text analysis. 

*In the image are shown the marks for the query 'alayavijnana' on the ***Yogācārabhūmi***.

![ScrollbarMarks](/img/ScrollbarMarks.png)






