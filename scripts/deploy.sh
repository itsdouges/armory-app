#!/bin/bash

if [ "$TRAVIS_BRANCH" == "master" ]; then
  echo ""
  echo "=> $TRAVIS_BRANCH not allowed to deploy"
  echo ""
elif [ "$TRAVIS_TAG" ]; then
  echo ""
  echo "=> Deploying $TRAVIS_TAG to gw2armory.com"
  echo ""

  sh scripts/robottxt-gen.sh allow
  npm run deploy -- --env PROD;

  # Easiest way to get embeds built and deployed only on a tagged commit.
  rm -rf dist
  npm run build:embeds
  npm run deploy:embeds
else
  echo ""
  echo "=> Deploying $TRAVIS_BRANCH to preview.gw2armory.com"
  echo ""

  sh scripts/robottxt-gen.sh disallow
  npm run deploy -- --env PREVIEW;
fi
