import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "2m", target: 200 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 1000 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
  },
};

export default function () {
  const payload = JSON.stringify({ email: "teste@teste.com" });
  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post(
    "http://localhost:3000/checkout/crypto",
    payload,
    params
  );

  check(res, {
    "status é 201": (r) => r.status === 201,
  });
  sleep(1);
}

export function handleSummary(data) {
  return {
    "results/stress-summary.json": JSON.stringify(data, null, 2),
  };
}
