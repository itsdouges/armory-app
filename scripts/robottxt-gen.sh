#!/bin/bash

case "$1" in
  allow)
    printf "User-agent: *\nDisallow:" > dist/robots.txt;;
  disallow)
    printf "User-agent: *\nDisallow: /" > dist/robots.txt;;
  *)
    echo "Available tasks: {allow|disallow}"
    exit 1;;
esac
