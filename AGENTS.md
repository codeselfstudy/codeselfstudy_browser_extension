Do not read, grep, cat, or otherwise look at or edit any files or directories that are blocked by `.gitignore`.

NEVER commit code that contains AI agent attribution. Do NOT add the agent name (e.g. Claude, Generated with Claude Code, Co-Authored-By Claude) anywhere in commit messages, PR descriptions, or other Git/GitHub messages.

Default to using Bun instead of Node.js. That means use commands like `bunx` instead of `npx`.

Use `kebab-case` for file and directory names. Use `UpperCamelCase` for component filenames (if using React). Use `snake_case` for non-frontend languages (e.g., Python, Bash).

Write tests for all code.

The task runner is [just](https://github.com/casey/just). `just` script names should be written in `snake_case`.

NEVER remove comments from the code without asking. They sometimes contain important notes that are needed for later.

When writing markdown, don't wrap lines in the middle of a paragraph with single line breaks. Let the lines run their full length.

Note that `rm` and `ls` might be overriden with another bash script so you might need to type out the full paths like `/bin/rm` and `/bin/ls` to use the normal commands.
