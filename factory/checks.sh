#!/usr/bin/env bash
# The repo's checks. Exit 0 only when the branch is fit to review.
#
# The gate runs this script from the main checkout with the job's worktree as
# the working directory. Keep it fast, deterministic and non-interactive: no
# watch modes, no prompts, nothing that rewrites files.
set -euo pipefail

# A fresh worktree has no node_modules; pnpm links them from its store, so this is quick
pnpm install --frozen-lockfile --prefer-offline

# Not `pnpm lint`: that script runs `eslint . --fix`, which rewrites files
pnpm exec eslint .

pnpm build
