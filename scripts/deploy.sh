#!/bin/bash

if [ "$TRAVIS_TAG" ]; then
  echo ""
  echo "\n=> Deploying $TRAVIS_TAG to gw2armory.com"
  echo ""

  sh scripts/robottxt-gen.sh allow
  npm run deploy -- --env PROD;
  exit 0;
fi

echo ""
echo "=> Deploying $TRAVIS_BRANCH to preview.gw2armory.com"
echo ""

sh scripts/robottxt-gen.sh disallow
npm run deploy -- --env PREVIEW;
