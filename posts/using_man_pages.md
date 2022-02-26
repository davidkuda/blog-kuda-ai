---
title: 'How to look up your command options in the man pages'
slug: 'navigating_man_pages'
date: '2021-08-16'
---

I often need to look up commands and their respective options. Normally, I would google my question. Let me give three recent examples from this morning: 

- _"How to set path with wget"_
- _"What is the d option in unzip?"_
- _"adduser gecos"_

Eventually I will find some stackoverflow or any other stackexchange website that delivers good answers. [One of these answers](https://askubuntu.com/questions/420784/what-do-the-disabled-login-and-gecos-options-of-adduser-command-stand) has changed my behaviour. I knew about the man pages, but I have found it always rather cumbersome to skim through the man pages. I now learned how it can actually be easy to navigate the man pages.

As "Radu Rădeanu" answered in 2014, type `/<word>` to highlight the every "word" in the man page, and press `n` to go to the next occurence. That's a really nice feature of the man page, and I think it's worth investing more time into getting man page behaviours straight. Thank you, Radu!

- `/word` -> search "word" after the cursor
- `?word` -> search "word" before the cursor
- `n` -> Go to next occurence of word
- `N` -> Go to previous occurence of word

```bash
man cp # open the manual page for the cp command
/-d # search "-d" inside the man page
n # go to the next occurence of "-d"
n # ...
N # go to previous occurence of "-d"
?-r # Look for occurences of "-r" before the cursor
```