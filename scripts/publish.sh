#!/bin/sh

set -e

pnpm install --frozen-lockfile
pnpm update

pnpm build

echo "publish completed"
