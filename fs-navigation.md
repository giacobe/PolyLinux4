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
  - label: FIN
    title: Complete the Challenge
    icon: ✓
  - label: REF
    title: Quick Reference
    icon: ?
---

# PolyBandit3 Basic Levels 1–10 Instructions

These instructions are based on the `basic1.sh` through `basic10.sh` setup scripts in the `giacobe/polybandit3` repository. Each level places a code somewhere in that level's directory. Your job is to inspect the files and directories, locate the code, and record it for that level.

> Assumption: each level is available under `/home/basicN`, where `N` is the level number. For example, Basic Level 1 is in `/home/basic1`.

## General Rules

1. Start each level by changing into that level's directory.
2. Read `README.txt` first.
3. Use Linux command-line tools to locate the code.
4. Do not include extra spaces, newlines, or file extensions unless the instructions say to.
5. When a level says the code is in a filename, the code is the filename text only, not the file contents.

Useful commands:

```sh
pwd
ls
ls -l
ls -la
cat README.txt
cat filename.txt
cd directoryname
find . -name 'inhere.txt' -type f
```

---

## Basic Level 1 — Read a normal file

### Goal
Display the contents of `inhere.txt`. The contents of that file are the code for this level.

### Steps

```sh
cd /home/basic1
cat README.txt
ls
cat inhere.txt
```

### What to submit
Submit the text printed by `cat inhere.txt`.

---

## Basic Level 2 — Read a hidden file

### Goal
Display the contents of `.inhere.txt`. The leading dot means the file is hidden from a normal `ls` listing.

### Steps

```sh
cd /home/basic2
cat README.txt
ls -la
cat .inhere.txt
```

### What to submit
Submit the text printed by `cat .inhere.txt`.

---

## Basic Level 3 — Find the file that is not `README.txt`

### Goal
One file in the directory contains the code. The hint says it is not `README.txt`.

### Steps

```sh
cd /home/basic3
cat README.txt
ls -l
```

Identify the extra `.txt` file that is not `README.txt`, then display it:

```sh
cat name-of-the-other-file.txt
```

### What to submit
Submit the contents of the non-README `.txt` file.

---

## Basic Level 4 — Find the different `.txt` file

### Goal
The directory contains several `.txt` files. One filename is different from the others. The contents of that file are the code.

### Steps

```sh
cd /home/basic4
cat README.txt
ls -l
```

Look for the filename that does not seem to belong with the others. Then display that file:

```sh
cat different-file-name.txt
```

A helpful way to inspect all text files is:

```sh
for f in *.txt; do echo "--- $f ---"; cat "$f"; done
```

### What to submit
Submit the contents of the different `.txt` file.

---

## Basic Level 5 — Find `inhere.txt` inside the differently named directory

### Goal
There are several directories. One directory has a name that is different from the others. Inside that directory is a file named `inhere.txt`. The contents of that file are the code.

### Steps

```sh
cd /home/basic5
cat README.txt
ls -l
```

Identify the directory whose name does not fit with the others, then inspect it:

```sh
cd different-directory-name
ls -l
cat inhere.txt
```

### What to submit
Submit the contents of `inhere.txt` from the differently named directory.

---

## Basic Level 6 — Use `find` to locate `inhere.txt`

### Goal
The file `inhere.txt` is hidden somewhere inside one of the directories. The README indicates that there is no obvious way to know which directory contains it, so use `find`.

### Steps

```sh
cd /home/basic6
cat README.txt
find . -name 'inhere.txt' -type f
```

After `find` prints the path, display the file:

```sh
cat ./path/to/inhere.txt
```

You can also combine the search and display in one command:

```sh
find . -name 'inhere.txt' -type f -exec cat {} \;
```

### What to submit
Submit the contents of the discovered `inhere.txt` file.

---

## Basic Level 7 — Read the code from a directory name

### Goal
The code is part of a directory name. Look for the directory that contains a dash (`-`). The code is the characters after the dash.

### Steps

```sh
cd /home/basic7
cat README.txt
ls -l
```

Example pattern:

```text
someword-ABCDEFGH
```

In that example, the code would be:

```text
ABCDEFGH
```

### What to submit
Submit only the characters after the dash in the directory name.

---

## Basic Level 8 — Find the different directory name, then read the suffix

### Goal
Each directory name contains a dash and a suffix. The code is the suffix after the dash in the directory whose name is different from the other directory names.

### Steps

```sh
cd /home/basic8
cat README.txt
ls -l
```

Look for the directory that does not fit the naming pattern of the others. The code is after the dash:

```text
specialword-ABCDEFGH
```

In that example, the code would be:

```text
ABCDEFGH
```

A clue from the setup is that the correct directory contains `inhere.txt`, so this may help:

```sh
find . -name 'inhere.txt' -type f
```

### What to submit
Submit only the characters after the dash in the correct directory name.

---

## Basic Level 9 — Read the code from a different file name

### Goal
The code is part of a filename, not part of a directory name. Find the `.txt` filename that is different from the others. The code is the suffix in that filename.

### Steps

```sh
cd /home/basic9
cat README.txt
ls -l
```

Look for the `.txt` file whose name is different from the rest. The pattern is similar to:

```text
someword-ABCDEFGH.txt
```

In that example, the code would be:

```text
ABCDEFGH
```

Do not use the suffix from a directory name.

### What to submit
Submit only the characters after the dash and before `.txt` in the correct filename.

---

## Basic Level 10 — The code is the filename

### Goal
The code is the filename of the `.txt` file in the directory. Ignore `README.txt`. Do not include the `.txt` extension.

### Steps

```sh
cd /home/basic10
cat README.txt
ls -l
```

Find the `.txt` file that is not `README.txt`. For example, if the file is:

```text
ABCDEFGH.txt
```

Then the code is:

```text
ABCDEFGH
```

You may view the file to confirm:

```sh
cat ABCDEFGH.txt
```

### What to submit
Submit the filename without `.txt`.

---

## Summary Table

| Level | Main Skill | Key Command or Idea |
|---|---|---|
| Basic 1 | Read a file | `cat inhere.txt` |
| Basic 2 | Show hidden files | `ls -la`, `cat .inhere.txt` |
| Basic 3 | Identify a non-README file | `ls -l`, `cat file.txt` |
| Basic 4 | Compare filenames/files | inspect `.txt` files |
| Basic 5 | Navigate directories | `cd`, `cat inhere.txt` |
| Basic 6 | Search recursively | `find . -name 'inhere.txt' -type f` |
| Basic 7 | Extract text from a directory name | read text after `-` |
| Basic 8 | Identify a different directory name | read suffix after `-` |
| Basic 9 | Identify a different filename | read suffix before `.txt` |
| Basic 10 | Use filename as code | filename without `.txt` |

## Complete the Challenge

Use what you learned to locate the requested file, inspect its contents, and submit the answer requested by the terminal instructions.

Use the value you discovered in the VM, not the examples in this guide.

## Quick Reference

- Where am I? `pwd`
- List files: `ls -la`
- Change directory (move down into directory called path): `cd /path`
- Change to parent directory (move back up one directory): `cd ..`
- Display contents of a file called filename: `cat filename`
