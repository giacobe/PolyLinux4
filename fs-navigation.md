---
title: "PolyLinux Lab 1"
panel_title: "File System Navigation"
form_url: "about:blank"
---

## START: File System Navigation

Welcome to **PolyLinux Lab 1**. In this lab, you will practice moving around the Linux file system from the command line.

Use the VM panel on the right to run the commands. The instructions panel can be hidden without hiding the VM.

> Tip: Linux commands are case-sensitive.

## 1: Show Your Current Location

The `pwd` command prints your current working directory.

Run:

```bash
pwd
```

You should see the directory where your shell session is currently located.

## 2: List Files and Directories

The `ls` command lists files and directories.

Run:

```bash
ls
ls -la
```

The `-la` option shows a longer listing and includes hidden files.

## 3: Change Directories

The `cd` command changes your current directory.

Try moving to the root of the file system:

```bash
cd /
pwd
ls
```

Then return to your home directory:

```bash
cd ~
pwd
```

## 4: Explore Carefully

Use `cd`, `pwd`, and `ls` together to explore the file system.

For example:

```bash
cd /bin
pwd
ls
```

Look for command names that you recognize.

## 5: Find the Code

Some labs may hide secret codes in files or directories. Use the commands from this lab to explore the file system and locate anything unusual.

When you find a code, submit it using the code submission panel.

## REF: Command Reference

| Command | Meaning |
| --- | --- |
| `pwd` | Print current working directory |
| `ls` | List files |
| `ls -la` | List files with details, including hidden files |
| `cd /path` | Change to a directory |
| `cd ..` | Move up one directory |
| `cd ~` | Return to the home directory |
| `clear` | Clear the terminal screen |
