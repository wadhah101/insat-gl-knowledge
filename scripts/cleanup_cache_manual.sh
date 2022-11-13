#!/bin/bash

# Simple script to cleanup useless github action cache periodically
# requires bash > 4.4

mapfile -t BRANCHES < <(git ls-remote --heads | cut -d$'\t' -f2)
printf "branches :  %s\n" "${BRANCHES[@]}"
echo

for BRANCH in "${BRANCHES[@]}"; do
  mapfile -t CACHES < <(gh actions-cache list -B "$BRANCH" --limit 100 | grep Linux-webpack | cut -d$'\t' -f1)
  printf "%s : %s\n" "$BRANCH" "${#CACHES[@]}"
  if [ "${#CACHES[@]}" -lt 2 ]; then
    printf "no cache to delete\n\n"
  else
    printf "deleting irrelevant cache\n\n"
    parallel -j 5 gh actions-cache delete --confirm ::: "${CACHES[@]:1}"
  fi
done
