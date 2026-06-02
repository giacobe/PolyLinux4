---
title: PolyLinux File System Navigation
short_title: FS-Navigation
panel_title: Learning Path
form_url: "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=RY30fNs9iUOpwcEVUm61LpTnj6hRZqRDuq_1EWvYxyBURUk3UkU4UFNSQ1JBRk1SM0lJTjlORVpKQy4u"
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

## Welcome to PolyLinux!

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

`pwd`

`ls`

`ls -la`

What do you notice about the directories and files?

* Hint: Use `ls -la` to see hidden files and detailed information.*

## Understand Directory Structure

Linux organizes everything in a tree starting from the root directory `/`.

Try these commands:

`cd /`

`ls`

`cd /home`

`ls -la`

Notice how each directory can contain files and other directories.

## Read File Contents

Many Linux tasks involve inspecting text files. Practice viewing file contents without changing them.

Useful commands:

`cat README.txt`

`head README.txt`

`tail README.txt`

* Hint: If a file is long, try `less filename` so you can scroll through it. *

## Level 1

Display the contents of the file called `inhere.txt` The contents of this file will be the answer code for this level.

*hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 2

Display the contents of the file in the directory, but is hidden. The contents of this file will be the answer code for
this level. Hidden files don't show up when you try to use the `ls` command. You will need some additional flags for this
command to display the hidden files.

*hint: Try using the `ls -la` command with the -l and -a option flags. The order doesn't matter.*
*Then, try using the cat command on the file. Don't forget the special character at the*
*beginning of the file name.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 3

Display the contents of the one file that is in this directory. You might see other files
in addition to this one. You can display their contents, too, but they won't have the code you
want. The contents of the one file you're looking for will be the answer code for this level.

*hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 4

There are a lot of files in this directory. All of them have a code inside. However, it's the one file
that is named differently than the others that has the correct code. Figure out which one of the files
has a different name. The contents of this file will be the answer code for this level.

*hint: Look carefully at the file names. One doesn't match.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 5

There are a lot of subdirectories in this directory. All of them contain a txt file. However, one directory
is named differently than the others. It has a txt file with the correct code. Figure out which one of the
subdirectories has a name that is different. The contents of the txt file will be the answer code for this level.

*hint: Look carefully at the directory names. One doesn't match.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 6

There are a lot of subdirectories in this directory. All of them contain a txt file. However, one directory
has an "inhere.txt" file with the correct code. The other files are named differently. Try using the `find`
command.

* hint: `find` has a lot of flags/options. Consider which of these options will give you just the file you're looking for.

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 7

Display the contents of the file called `inhere.txt` The contents of this file will be the answer code for this level.

* hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 8

Display the contents of the file called `inhere.txt` The contents of this file will be the answer code for this level.

* hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 9

Display the contents of the file called `inhere.txt` The contents of this file will be the answer code for this level.

* hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Level 10

Display the contents of the file called `inhere.txt` The contents of this file will be the answer code for this level.

* hint: try using the `cat` command.*

When you are done getting this code, you can go to the next level with the command `nextlevel`

## Complete the Challenge

Use what you learned to locate the requested file, inspect its contents, and submit the answer requested by the terminal instructions.

Use the value you discovered in the VM, not the examples in this guide.

## Quick Reference

- Where am I? `pwd`
- List files: `ls -la`
- Change directory (move down into directory called path): `cd /path`
- Change to parent directory (move back up one directory): `cd ..`
- Display contents of a file called filename: `cat filename`
