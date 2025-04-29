---
id: sources
title: Sources
sidebar_position: 6
---

This section describes the sources used in building the application. 

### Dictionaries

All the dictionaries used, apart from the *Pali Concise Dictionary*, are taken from the *Cologne Digital Sanskrit Dictionaries*. 

>Cologne Digital Sanskrit Dictionaries, version 2.7.286,
>Cologne University, accessed on February 19, 2025,
>https://www.sanskrit-lexicon.uni-koeln.de

I made some semi-manual modification to the dictionaries to remove abbreviations and to display the full text of the references. 

The *Concise Pali-English Dictionary* was downloaded from the link provided [Online Buddhist University](https://buddhistuniversity.net/content/reference/concise-pali-dictionary) 

>The Concise Pali-English Dictionary
>By Buddhadatta Mahathera

I included this dictionary since Vasubandhu and other Buddhist authors sometimes use words that don't appear in conventional Sanskrit dictionary. 

### Books

The books accessible from the Navbar are taken from [GRETIL - Göttingen Register of Electronic Texts in Indian Languages](https://gretil.sub.uni-goettingen.de/gretil.html).

To original texts are in XML format. They are served in JSON format. Since the actual conversion is not perfect, some of the books are still not served. 

It is currently possible to download the file from the *public* folder, even if it's not recommended until I upload the correctly parsed ones. 

The full text search uses the book present in the public github repository of **Buddhanexus** to which I am more than indebted. They can be downloaded [here](https://github.com/BuddhaNexus/segmented-sanskrit). 


### Python Libraries 

This application would not be possible without the great contributions of the Sanskrit computational linguistic community. I have drawn inspiration by all the websites online. I list here just the works that are currently being used. 

**CLS inflect** for the inflection tables: [https://github.com/sanskrit-lexicon/csl-inflect](https://github.com/sanskrit-lexicon/csl-inflect)

The **Sanskrit Parser** library handles part of the Sandhi Splitting: [https://github.com/kmadathil/sanskrit_parser?tab=readme-ov-file](https://github.com/kmadathil/sanskrit_parser?tab=readme-ov-file)

### BYT-5 Model

I list here separately the BYT5 model for Sanskrit [https://huggingface.co/buddhist-nlp/byt5-sanskrit](https://huggingface.co/buddhist-nlp/byt5-sanskrit), as it elegantly solves the tokenisation bottleneck that the conventional LLMs were having. 

>**One Model is All You Need: ByT5-Sanskrit, a Unified Model for Sanskrit NLP Tasks**
>[Sebastian Nehrdich](https://arxiv.org/search/cs?searchtype=author&query=Nehrdich,+S), [Oliver Hellwig](https://arxiv.org/search/cs?searchtype=author&query=Hellwig,+O), [Kurt Keutzer](https://arxiv.org/search/cs?searchtype=author&query=Keutzer,+K)
>
>[https://arxiv.org/abs/2409.13920](https://arxiv.org/abs/2409.13920)

