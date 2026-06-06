---
title: PolyLinux File System Navigation
short_title: FS-Navigation
panel_title: Learning Path
form_url: "https://forms.office.com/Pages/ResponsePage.aspx?id=RY30fNs9iUOpwcEVUm61LpTnj6hRZqRDuq_1EWvYxyBURUk3UkU4UFNSQ1JBRk1SM0lJTjlORVpKQy4u"
sections:
  - label: START
    title: Welcome to PolyLinux!
    icon: 🚀
  - label: LOGIN
    title: Get On the Machine
    icon: >_
  - label: INST
    title: Instructions: Explore the File System
    icon: 📁
  - label: INST
    title: Instructions: Understand Directory Structure
    icon: ☰
  - label: INST
    title: Instructions: Display File Contents
    icon: ⌕
  - label: 1
    title: Level Basic1
    icon: 📁
  - label: 2
    title: Level Basic2
    icon: 📁
  - label: 3
    title: Level Basic3
    icon: 📁
  - label: 4
    title: Level Basic4
    icon: 📁
  - label: 5
    title: Level Basic5
    icon: 📁
  - label: 6
    title: Level Basic6
    icon: 📁
  - label: 7
    title: Level Basic7
    icon: 📁
  - label: 8
    title: Level Basic8
    icon: 📁
  - label: 9
    title: Level Basic9
    icon: 📁
  - label: 10
    title: Level Basic10
    icon: 📁
  - label: REF
    title: Quick Reference
    icon: ✓
---
## PolyLinux File System Navigation Practice

In this lab you will learn essential Linux command line skills. You will explore the file system, inspect files and directories, and practice using common Linux commands.

Throughout the lab:

- Read each step carefully
- Use the terminal on the right to complete tasks
- Refer to the Quick Reference if you need help

**Let's get started!**

## Get On the Machine

Wait for the VM on the right to finish booting. Once the login prompt appears, log in.

At the login prompt, type:

`root`

No password. Just hit **Enter**.

## Explore the File System

Start by seeing where you are and what's around you.

Run these commands:

* `pwd`

* `ls`

* `ls -la`

What do you notice about the directories and files?

* Hint: Use `ls -la` to see hidden files and detailed information.*

### Understand Directory Structure

Linux organizes everything in a tree starting from the root directory `/`.

Try these commands:

* `cd /`

* `ls`

* `cd /home`

* `ls -la`

Notice how each directory can contain files and other directories.

## Read File Contents

Many Linux tasks involve inspecting text files. Practice viewing file contents without changing them.

Useful commands:

* `cat README.txt`

* `head README.txt`

* `tail README.txt`

* Hint: If a file is long, try `less filename` so you can scroll through it. *

## PolyBandit3 Basic Levels 1–10 Instructions

These instructions are based on the `basic1.sh` through `basic10.sh` setup scripts in the `giacobe/polybandit3` repository. Each level places a code somewhere in that level's directory. Your job is to inspect the files and directories, locate the code, and record it for that level.

> Assumption: each level is available under `/home/basicN`, where `N` is the level number. For example, Basic Level 1 is in `/home/basic1`.

1. Start each level by changing into that level's directory.
2. Read `README.txt` first.
3. Use Linux command-line tools to locate the code.
4. Do not include extra spaces, newlines, or file extensions unless the instructions say to.
5. When a level says the code is in a filename, the code is the filename text only, not the file contents.

Useful commands:

* `pwd`

* `ls`

* `ls -l`

* `ls -la`

* `cat README.txt`

* `cat filename.txt`

* `cd directoryname`

* `find . -name 'inhere.txt' -type f`

---

## Basic Level 1 — Read a normal file

### Goal
Display the contents of `inhere.txt`. The contents of that file are the code for this level.

### Steps

* `ls`

* `cat inhere.txt`
  
### What to submit
Submit the text printed by `cat inhere.txt`.

---

## Basic Level 2 — Read a hidden file

### Goal
Display the contents of `.inhere.txt`. The leading dot means the file is hidden from a normal `ls` listing.

### Steps

* `ls -la`

* `cat .inhere.txt`

### What to submit
Submit the text printed by `cat .inhere.txt`.

---

## Basic Level 3 — Find the file that is not `README.txt`

### Goal
One file in the directory contains the code. The hint says it is not `README.txt`.

### Steps

* `ls -l`

Identify the extra `.txt` file that is not `README.txt`, then display it:

* `cat name-of-the-other-file.txt`

### What to submit
Submit the contents of the non-README `.txt` file.

---

## Basic Level 4 — Find the different `.txt` file

### Goal
The directory contains several `.txt` files. One filename is different from the others. The contents of that file are the code.

### Steps

* `ls -l`

Look for the filename that does not seem to belong with the others. Then display that file:

* `cat different-file-name.txt`

A helpful way to inspect all text files is:

* `for f in *.txt; do echo "--- $f ---"; cat "$f"; done`


### What to submit
Submit the contents of the different `.txt` file.

---

## Basic Level 5 — Find `inhere.txt` inside the differently named directory

### Goal
There are several directories. One directory has a name that is different from the others. Inside that directory is a file named `inhere.txt`. The contents of that file are the code.

### Steps

* `ls -l`

Identify the directory whose name does not fit with the others, then inspect it:

* `ls l`

* `cat inhere.txt`

### What to submit
Submit the contents of `inhere.txt` from the differently named directory.

---

## Basic Level 6 — Use `find` to locate `inhere.txt`

### Goal
The file `inhere.txt` is hidden somewhere inside one of the directories. The README indicates that there is no obvious way to know which directory contains it, so use `find`.

### Steps

* `find . -name 'inhere.txt' -type f`

After `find` prints the path, display the file:

* `cat ./path/to/inhere.txt`

You can also combine the search and display in one command:

* `find . -name 'inhere.txt' -type f -exec cat {} \;`

### What to submit
Submit the contents of the discovered `inhere.txt` file.

---

## Basic Level 7 — Read the code from a directory name

### Goal
The code is part of a directory name. Look for the directory that contains a dash (`-`). The code is the characters after the dash.

### Steps

* `ls -l`

Example pattern:

* `text`

* `someword-ABCDEFGH`

In that example, the code would be:

* `text`

* `ABCDEFGH`

### What to submit
Submit only the characters after the dash in the directory name.

---

## Basic Level 8 — Find the different directory name, then read the suffix

### Goal
Each directory name contains a dash and a suffix. The code is the suffix after the dash in the directory whose name is different from the other directory names.

### Steps

* `ls -l`

Look for the directory that does not fit the naming pattern of the others. The code is after the dash:

* `text`

* `specialword-ABCDEFGH`

In that example, the code would be:

* `text`

* `ABCDEFGH`

A clue from the setup is that the correct directory contains `inhere.txt`, so this may help:

* `find . -name 'inhere.txt' -type f`

### What to submit
Submit only the characters after the dash in the correct directory name.

---

## Basic Level 9 — Read the code from a different file name

### Goal
The code is part of a filename, not part of a directory name. Find the `.txt` filename that is different from the others. The code is the suffix in that filename.

### Steps

* `ls -l`

Look for the `.txt` file whose name is different from the rest. The pattern is similar to:

* `text`

* `someword-ABCDEFGH.txt`

In that example, the code would be:

* `text`

* `ABCDEFGH`

Do not use the suffix from a directory name.

### What to submit
Submit only the characters after the dash and before `.txt` in the correct filename.

---

## Basic Level 10 — The code is the filename

### Goal
The code is the filename of the `.txt` file in the directory. Ignore `README.txt`. Do not include the `.txt` extension.

### Steps

* `ls -l`

Find the `.txt` file that is not `README.txt`. For example, if the file is:

* `text`

* `ABCDEFGH.txt`

Then the code is:

* `text`

* `ABCDEFGH`

You may view the file to confirm:

* `sh`

* `cat ABCDEFGH.txt`

### What to submit
Submit the filename without `.txt`.

---

## Quick Reference

- Where am I? `pwd`
- List files: `ls -la`
- Change directory (move down into directory called path): `cd /path`
- Change to parent directory (move back up one directory): `cd ..`
- Display contents of a file called filename: `cat filename`
