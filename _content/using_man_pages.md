---
title: 'How to look up your command options in the man pages'
slug: 'using_man_pages'
date: '2021-08-16T20:44:05.872Z'
---

I often need to look up commands and their respective options. Normally, I would google my question. Let me give two recent examples from this morning: 

- _"How to set path with wget"_
- _"What is the d option in unzip?"_
- _"adduser gecos"_

Eventually I will find some stackoverflow or any other stackexchange website that delivers good answers. [One of these answers](https://askubuntu.com/questions/420784/what-do-the-disabled-login-and-gecos-options-of-adduser-command-stand) has changed my behaviour. I knew about the man pages, but I have found it always rather cumbersome to skim through the man pages. Skimming through the man pages has just got a lot easier, because I have changed my behavious how I can use the man pages. 

As "Radu Rădeanu" answered in 2014, type `/<option to look for>` to highlight the given keywords in the man page, and press `n` for every hit. That's a really nice feature of the man page, and I think it's worth investing more time into getting man page behaviours straight. Thank you, Radu!

```bash
man curl # open the manual page for wget
/-o # search "-o" inside the man page
n # go to the next search result
n # go to the next search result
```

```bash
man unzip # open the manual page for wget
/-o # search "-o" inside the man page
n # go to the next search result
n # go to the next search result
```