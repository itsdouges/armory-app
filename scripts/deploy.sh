#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Deploying to prod from master."
  sh scripts/robottxt-gen.sh allow
  npm run deploy -- --env PROD;
  exit 0;
fi

echo "Deploying to preview from $TRAVIS_BRANCH."
sh scripts/robottxt-gen.sh disallow
npm run deploy -- --env PREVIEW;
