import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "10s", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "10s", target: 10 },
  ],
};

export default function () {
  const payload = JSON.stringify({ produtoId: 123 });
  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post(
    "http://localhost:3000/checkout/simple",
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
    "results/spike-summary.json": JSON.stringify(data, null, 2),
  };
}
