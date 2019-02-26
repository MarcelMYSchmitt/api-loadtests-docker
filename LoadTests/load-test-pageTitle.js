import http from "k6/http";
import encoding from "k6/encoding";
import { check, fail, group, sleep } from "k6";
import { Rate, Counter } from "k6/metrics";

export let unexpectedStatusCodeCounter = new Counter("unexpected status codes");

export let options = {
  vus: 15,
  duration: "5s"
};

export function setup() {
}

export default function() {
  let requestHeaders = {
    "Authorization": "Basic " + encoding.b64encode(__ENV.BasicAuthToken),
  };

  // page title, testing content
  group ("Get PageTitle load test", function() {

    let landingPageUrl = http.get(__ENV.LandingPageUrl);
    let result = http.get(landingPageUrl, { headers: requestHeaders});

    check(result, {
      "status is 200": (r) => r.status == 200, 
      "header is correct": (r) => r.html("h1").text() == "Token Output",
    })
  });
};