import http from "k6/http";
import encoding from "k6/encoding";
import { check, fail, group, sleep } from "k6";
import { Rate, Counter } from "k6/metrics";

export let unexpectedStatusCodeCounter = new Counter("unexpected status codes");

export let options = {
  vus: 200,
  duration: "20s"
};

export function setup() {
}

export default function() {
  let requestHeaders = {
    "Authorization": "Basic " + encoding.b64encode(__ENV.BasicAuthToken),
  };

  // get request, testing api
  group("Get <<methodPath>> load test", function() {
    
    let bffUrl = __ENV.BackendForFrontendBaseUrl;
    let result = http.get(bffUrl + "/<<methodPath>>", { headers: requestHeaders});

    check(result, {
      "is status 200 for the page": (r) => r.status === 200,
      "transaction time OK": (r) => r.timings.duration < 200
    }) || unexpectedStatusCodeCounter.add(1);
  });
  
};