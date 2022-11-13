#!bin/bash

# Simple script to cleanup useless github action cache periodically

BRANCHES=($(git ls-remote --heads | cut -d$'\t' -f2))

for BRANCH in $BRANCHES
do
  CACHES=($(gh actions-cache list -B $BRANCH --limit 100 | grep Linux-webpack |  cut -d$'\t' -f1))

  echo $CACHES

  if [ ${#CACHES[@]:1} -eq 0 ]; then
    echo "$BRANCH : no cache to delete"
  else
    echo "$BRANCH : deleting irrelevant cache"
    parallel -j 5 gh actions-cache delete --confirm ::: ${CACHES[@]:1}
  fi

done

