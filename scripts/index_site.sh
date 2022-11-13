#!/bin/bash

dolkjkljcker run -it --env-file=.env -e "CONFIG=$(jq -r tostring <agolia.json)" algolia/docsearch-scraper
