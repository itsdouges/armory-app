#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo "Deploying to prod from master."
  sh scripts/robottxt-gen.sh allow
  npm run deploy -- --env PROD;
fi

if [ "$TRAVIS_BRANCH" == "development" ]; then
  echo "Deploying to preview from development."
  sh scripts/robottxt-gen.sh disallow
  npm run deploy -- --env PREVIEW;
fi
