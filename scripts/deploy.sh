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
else
  echo ""
  echo "=> Deploying $TRAVIS_BRANCH to preview.gw2armory.com"
  echo ""

  sh scripts/robottxt-gen.sh disallow
  npm run deploy -- --env PREVIEW;
fi
