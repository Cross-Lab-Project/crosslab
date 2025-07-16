#!/bin/sh

mkdir -p dependencies
cp ../../api/python/dist/python-latest.tar.gz ./dependencies/api-client.tar.gz
cp ../../soa/python/dist/python-latest.tar.gz ./dependencies/soa-client.tar.gz

tox -e lint

rm -r dependencies