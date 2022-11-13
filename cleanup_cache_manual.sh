#!/bin/bash

# Simple script to cleanup useless github action cache periodically

mapfile -t BRANCHES < <(git ls-remote --heads | cut -d$'\t' -f2)
printf "branches :  %s\n" "${BRANCHES[@]}"

for BRANCH in "${BRANCHES[@]}"; do
  mapfile -t CACHES < <(gh actions-cache list -B "$BRANCH" --limit 100 | grep Linux-webpack | cut -d$'\t' -f1)
  printf "%s : %s" "$BRANCH" "${#CACHES[@]}"
  if [ "${#CACHES[@]}" -lt 2 ]; then
    echo "no cache to delete"
  else
    echo "deleting irrelevant cache"
    parallel -j 5 gh actions-cache delete --confirm ::: "${CACHES[@]:1}"
  fi
  echo
done
