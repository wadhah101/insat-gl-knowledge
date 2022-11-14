#!/bin/bash

# Simple script to cleanup useless github action cache periodically
# requires bash > 4.4

mapfile -t BRANCHES < <(gh actions-cache list | grep -E "Linux-webpack.*ref" | cut -d$'\t' -f3 | uniq)
printf "branches :  %s\n" "${BRANCHES[@]}"
echo

for BRANCH in "${BRANCHES[@]}"; do
  # useless calls to gh api, if we group "gh actions-cache list" by branch name and then filter the array from the latest element, too much work, this script works fast enough
  mapfile -t CACHES < <(gh actions-cache list -B "$BRANCH" --limit 100 | grep Linux-webpack | cut -d$'\t' -f1)
  printf "%s : %s\n" "$BRANCH" "${#CACHES[@]}"
  if [ "${#CACHES[@]}" -lt 2 ]; then
    printf "no cache to delete\n\n"
  else
    printf "deleting irrelevant cache\n\n"
    parallel -j 5 gh actions-cache delete --confirm ::: "${CACHES[@]:1}"
  fi
done
