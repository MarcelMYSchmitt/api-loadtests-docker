#!/bin/bash

sed -i -e "s/\${DS_INFLUX}/Influx/g" /var/lib/grafana/dashboards/*

./run.sh
