#!/bin/sh

set -e

# pnpm install --frozen-lockfile
# pnpm update

pnpm build

cd ../dist/bvite-ui
npm publish --access publish
cd -

echo "publish completed"
