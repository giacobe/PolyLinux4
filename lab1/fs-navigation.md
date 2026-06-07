---
title: "PolyLinux File System Navigation"
short_title: "FS-Navigation"
panel_title: "Learning Path"
form_url: "https://forms.office.com/Pages/ResponsePage.aspx?id=RY30fNs9iUOpwcEVUm61LpTnj6hRZqRDuq_1EWvYxyBURUk3UkU4UFNSQ1JBRk1SM0lJTjlORVpKQy4u"
---

## START: PolyLinux File System Navigation

In this lab you will learn essential Linux command-line skills. You will explore the file system, inspect files and directories, and practice using common Linux commands.

Throughout the lab:

- Read each step carefully.
- Use the terminal on the right to complete tasks.
- Refer to the Quick Reference if you need help.

**Let's get started!**

## LOGIN: Get On the Machine

Wait for the VM on the right to finish booting. Once the login prompt appears, log in.

At the login prompt, type:

```text
root
```

No password is required. Just press **Enter**.

## REF: Quick Reference

| Task | Command |
| --- | --- |
| Show where you are | `pwd` |
| List files | `ls -la` |
| Move down into a directory | `cd /path` |
| Move back up one directory | `cd ..` |
| Display a file | `cat filename` |
| Show the first lines of a file | `head filename` |
| Show the last lines of a file | `tail filename` |
| Search for a file by name | `find . -name 'filename' -type f` |
| --- | --- |
| Change to the next level | `nextlevel` |
| Change to the previous level | `prevlevel` |


## INST: Instructions: Explore the File System

Start by seeing where you are and what is around you.

Run these commands:

```bash
pwd
ls
ls -la
```

What do you notice about the directories and files?

> **Hint:** Use `ls -la` to see hidden files and detailed information.

## INST: Instructions: Understand Directory Structure

Linux organizes everything in a tree starting from the root directory `/`.

Try these commands:

```bash
cd /
ls
cd /home
ls -la
```

Notice how each directory can contain files and other directories.

## INST: Instructions: Display File Contents

Many Linux tasks involve inspecting text files. Practice viewing file contents without changing them.

Useful commands:

```bash
cat README.txt
head README.txt
tail README.txt
```

> **Hint:** If a file is long, try `less filename` so you can scroll through it.

## 1: Level Basic1

### Goal

Display the contents of `inhere.txt`. The contents of that file are the code for this level.

### Steps

Start in the level directory:

```bash
ls
cat inhere.txt
```

### What to submit

Submit the text printed by `cat inhere.txt`.

### Go on to the next level

Enter the command `nextlevel`

## 2: Level Basic2

### Goal

Display the contents of `.inhere.txt`. The leading dot means the file is hidden from a normal `ls` listing.

### Steps

Start in the level directory:

```bash
ls -la
cat .inhere.txt
```

### What to submit

Submit the text printed by `cat .inhere.txt`.

### Go on to the next level

Enter the command `nextlevel`

## 3: Level Basic3

### Goal

One file in the directory contains the code. The hint says it is not `README.txt`.

### Steps

Start in the level directory:

```bash
ls -l
```

Identify the extra `.txt` file that is not `README.txt`, then display it:

```bash
cat name-of-the-other-file.txt
```

Replace `name-of-the-other-file.txt` with the actual filename you find.

### What to submit

Submit the contents of the non-README `.txt` file.

### Go on to the next level

Enter the command `nextlevel`

## 4: Level Basic4

### Goal

The directory contains several `.txt` files. One filename is different from the others. The contents of that file are the code.

### Steps

Start in the level directory:

```bash
ls -l
```

Look for the filename that does not seem to belong with the others. Then display that file:

```bash
cat different-file-name.txt
```

Replace `different-file-name.txt` with the actual filename you find.

A helpful way to inspect all text files is:

```bash
for f in *.txt; do echo "--- $f ---"; cat "$f"; done
```

### What to submit

Submit the contents of the different `.txt` file.

### Go on to the next level

Enter the command `nextlevel`

## 5: Level Basic5

### Goal

There are several directories. One directory has a name that is different from the others. Inside that directory is a file named `inhere.txt`. The contents of that file are the code.

### Steps

Start in the level directory:

```bash
ls -l
```

Identify the directory whose name does not fit with the others, then inspect it:

```bash
cd different-directory-name
ls -l
cat inhere.txt
```

Replace `different-directory-name` with the actual directory name you find.

### What to submit

Submit the contents of `inhere.txt` from the differently named directory.

### Go on to the next level

Enter the command `nextlevel`

## 6: Level Basic6

### Goal

The file `inhere.txt` is hidden somewhere inside one of the directories. The README indicates that there is no obvious way to know which directory contains it, so use `find`.

### Steps

Start in the level directory:

```bash
find . -name 'inhere.txt' -type f
```

After `find` prints the path, display the file:

```bash
cat ./path/to/inhere.txt
```

Replace `./path/to/inhere.txt` with the actual path printed by `find`.

You can also combine the search and display in one command:

```bash
find . -name 'inhere.txt' -type f -exec cat {} \;
```

### What to submit

Submit the contents of the discovered `inhere.txt` file.

### Go on to the next level

Enter the command `nextlevel`

## 7: Level Basic7

### Goal

The code is part of a directory name. Look for the directory that contains a dash (`-`). The code is the characters after the dash.

### Steps

Start in the level directory:

```bash
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

### Go on to the next level

Enter the command `nextlevel`

## 8: Level Basic8

### Goal

Each directory name contains a dash and a suffix. The code is the suffix after the dash in the directory whose name is different from the other directory names.

### Steps

Start in the level directory:

```bash
ls -l
```

Look for the directory that does not fit the naming pattern of the others. The code is after the dash.

Example pattern:

```text
specialword-ABCDEFGH
```

In that example, the code would be:

```text
ABCDEFGH
```

A clue from the setup is that the correct directory contains `inhere.txt`, so this may help:

```bash
find . -name 'inhere.txt' -type f
```

### What to submit

Submit only the characters after the dash in the correct directory name.

### Go on to the next level

Enter the command `nextlevel`

## 9: Level Basic9

### Goal

The code is part of a filename, not part of a directory name. Find the `.txt` filename that is different from the others. The code is the suffix in that filename.

### Steps

Start in the level directory:

```bash
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

### Go on to the next level

Enter the command `nextlevel`

## 10: Level Basic10

### Goal

The code is the filename of the `.txt` file in the directory. Ignore `README.txt`. Do not include the `.txt` extension.

### Steps

Start in the level directory:

```bash
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

```bash
cat ABCDEFGH.txt
```

### What to submit

Submit the filename without `.txt`.
