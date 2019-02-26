## Important info
This is the repository containing the load tests and required infrastructure for load test execution and continous monitoring

- load test is implemented using https://k6.io/ and https://sitespeed.io
- the tests in k6 is "normal" JS code, and you can use whatever external library you need. However, beware, there is no npm / TS support
- the test in sitespeed is no implemented test, you use the tool itself and add some flags, depending on what you want to test 


## Setup for k6
Create `.env` file with the following values.
```
BackendForFrontendBaseUrl=
BasicAuthToken=
K6_OUT=influxdb=http://influx:8086/k6
LandingPageUrl=
JsAsset1FileUrl=
JsAsset2FileUrl=
```
Note: 
If you want to extend the env values, then feel free. You just have to add new values the `.env` and the docker-compose-load-monitoring file.
In the k6.io test files there is basic authentication defined. This is not necessary, just an example to show where it has to be placed. 

## Running the test(s)
- start the load testing infrastructure with
```
docker-compose -f docker-compose-load-monitoring.yml up
```
– Grafana will locally be available at `http://localhost:3000`
- SitespeedIO and Graphite (for storing metrics) will be created.  Besides example sitespeedIO dashboards will be added to Grafana.

- run the desired k6 tests with
```
docker-compose -f docker-compose-load-test.yml run k6 run /sources/load-test.js
docker-compose -f docker-compose-load-test.yml run k6 run /sources/...
```

- run sitespeedIO with 
```
docker-compose -f .\docker-compose-load-monitoring.yml run sitespeed.io https://<<URL_TO_TEST>> --graphite.host=graphite
```

