#!/bin/bash

docker run -it --env-file=.env -e "CONFIG=$(jq -r tostring <agolia.json)" typesense/docsearch-scraper
