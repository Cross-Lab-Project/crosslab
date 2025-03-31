#!/bin/sh

mkdir -p dependencies
cp ../../api/python/dist/python-latest.tar.gz ./dependencies/api-client.tar.gz
cp ../../soa/python/dist/python-latest.tar.gz ./dependencies/soa-client.tar.gz
cp ../../../helper/python-test-helper/dist/python-latest.tar.gz ./dependencies/python-test-helper.tar.gz

tox --recreate --skip-env lint

rm -r dependencies