# File System Navigation

form_url:

## START

Welcome to the PolyLinux file-system navigation lab.

Your goal is to explore the Linux file system, move between directories, inspect files, and discover the hidden codes placed throughout the system.

Begin by figuring out where you are in the file system.

:::details Step-by-step help
1. Click inside the Linux terminal.
2. Type the command below and press Enter:

   ```sh
   pwd
   ```

3. The output shows your current working directory.
4. Next, list the files and directories in that location:

   ```sh
   ls
   ```

5. Look for file or directory names that seem like they may lead to the next clue.
:::

## 1

List the contents of the current directory and identify anything that looks useful or unusual.

You should be looking for a file or folder that may contain the next instruction, hint, or code.

:::details Step-by-step help
1. Use `ls` to list the visible files:

   ```sh
   ls
   ```

2. Use `ls -l` to see more detail about each item:

   ```sh
   ls -l
   ```

3. If you see a directory, move into it with `cd`:

   ```sh
   cd directoryname
   ```

4. After moving, use `pwd` again to confirm your new location:

   ```sh
   pwd
   ```
:::

## 2

Hidden files are common in Linux. Find out whether this directory contains files that are not shown by the normal `ls` command.

:::details Step-by-step help
1. Use the `-a` option to show hidden files:

   ```sh
   ls -a
   ```

2. For a more detailed listing, combine options:

   ```sh
   ls -la
   ```

3. Files that begin with a period, such as `.hidden`, are hidden files.
4. If you find a hidden file, inspect it with `cat`:

   ```sh
   cat .filename
   ```
:::

## 3

Read the contents of a text file that appears to contain a clue.

:::details Step-by-step help
1. Use `cat` followed by the filename:

   ```sh
   cat filename
   ```

2. If the filename contains spaces, put the filename in quotation marks:

   ```sh
   cat "file name with spaces"
   ```

3. If the output is too long, try reading it one screen at a time:

   ```sh
   less filename
   ```

4. Press `q` to exit `less`.
:::

## 4

Move up one level in the directory tree and continue exploring from there.

:::details Step-by-step help
1. Use this command to move to the parent directory:

   ```sh
   cd ..
   ```

2. Confirm where you are:

   ```sh
   pwd
   ```

3. List the contents of the new location:

   ```sh
   ls -la
   ```

4. Continue moving through directories with `cd directoryname`.
:::

## 5

Use an absolute path to move directly to a directory instead of moving one step at a time.

:::details Step-by-step help
1. An absolute path starts with `/`.
2. Try moving to the root of the file system:

   ```sh
   cd /
   ```

3. List the top-level directories:

   ```sh
   ls
   ```

4. Move to another directory by giving the full path:

   ```sh
   cd /home
   ```

5. Use `pwd` to verify your location.
:::

## 6

Search for files by name when you do not know exactly where they are located.

:::details Step-by-step help
1. Use `find` to search from your current location:

   ```sh
   find . -name "filename"
   ```

2. To search for files containing part of a name, use wildcards:

   ```sh
   find . -name "*clue*"
   ```

3. To search from the root directory, use `/` as the starting point:

   ```sh
   find / -name "*clue*" 2>/dev/null
   ```

4. The `2>/dev/null` part hides permission errors so the useful results are easier to see.
:::

## 7

Search inside files for useful words or phrases.

:::details Step-by-step help
1. Use `grep` to search inside a file:

   ```sh
   grep "word" filename
   ```

2. Search all files in the current directory:

   ```sh
   grep "word" *
   ```

3. Search recursively through directories:

   ```sh
   grep -R "word" .
   ```

4. If you are looking for a code, try searching for words such as `code`, `secret`, `password`, or `clue`.
:::

## 8

Use file permissions and file types to decide what to inspect next.

:::details Step-by-step help
1. Use a long listing:

   ```sh
   ls -l
   ```

2. The first character tells you the type:
   - `d` means directory
   - `-` means regular file
   - `l` means symbolic link

3. The remaining permission characters show who can read, write, or execute the item.
4. If a file is readable, inspect it with `cat`, `less`, or `grep`.
:::

## 9

Use command history and command editing to work more efficiently.

:::details Step-by-step help
1. Press the Up Arrow key to recall your previous command.
2. Press Enter to run the recalled command again.
3. Use the Left and Right Arrow keys to edit a command before running it.
4. Use Tab completion to finish file and directory names:

   ```sh
   cd fir<Tab>
   ```

5. If there is only one matching name, the shell will complete it for you.
:::

## REF

Reference commands for this lab:

| Task | Command |
|---|---|
| Show current directory | `pwd` |
| List files | `ls` |
| List all files, including hidden files | `ls -a` |
| Long detailed listing | `ls -l` |
| Long listing with hidden files | `ls -la` |
| Change directory | `cd directoryname` |
| Move up one directory | `cd ..` |
| Move to root directory | `cd /` |
| Show file contents | `cat filename` |
| Read file one page at a time | `less filename` |
| Search for files | `find . -name "*text*"` |
| Search inside files | `grep "text" filename` |

:::details Extra reference notes
- A relative path starts from your current location.
- An absolute path starts from `/`.
- Hidden files begin with a period, such as `.secret`.
- Use `pwd` often so you do not lose track of where you are.
- Use `ls -la` when the normal `ls` output does not show what you need.
:::
