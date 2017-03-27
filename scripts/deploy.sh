#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  if [ "$TRAVIS_TAG" ]; then
    echo "Deploying tag=$TRAVIS_TAG to prod"
    sh scripts/robottxt-gen.sh allow
    npm run deploy -- --env PROD;
    exit 0;
  fi

  echo "Commit does not have a tag, bailing out!"
  exit 0;
fi

echo "Deploying to preview from $TRAVIS_BRANCH."
sh scripts/robottxt-gen.sh disallow
npm run deploy -- --env PREVIEW;
