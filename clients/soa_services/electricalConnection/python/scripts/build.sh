#!/bin/bash
set -e

npx ../../../../helper/openapi-codegeneration -i ../schemas/*.yml -t ./template python -o ./src/crosslab/soa_services/electrical