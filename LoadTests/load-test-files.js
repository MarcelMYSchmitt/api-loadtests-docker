import http from "k6/http";
import encoding from "k6/encoding";
import { check, fail, group, sleep } from "k6";
import { Rate, Counter } from "k6/metrics";

export let unexpectedStatusCodeCounter = new Counter("unexpected status codes");

export let options = {
  vus: 5,
  duration: "5s"
};

export function setup() {
}

export default function() {
  let requestHeaders = {
    "Authorization": "Basic " + encoding.b64encode(__ENV.BasicAuthToken),
  };

  // front page in general, testing loading of files
  group ("Get assets test", function() {
    let responses = http.batch([
      __ENV.LandingPageUrl,
      __ENV.JsAsset1FileUrl,
      __ENV.JsAsset2FileUrl
    ]);
    check(responses[0], {
      "main page status was 200": res => res.status === 200,
    });
  });
};