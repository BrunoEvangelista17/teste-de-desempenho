import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate==0.00"],
  },
};

export default function () {
  const res = http.get("http://localhost:3000/health");

  check(res, {
    "status é 200": (r) => r.status === 200,
  });
  sleep(1);
}

// Função para exportar o resumo automaticamente
export function handleSummary(data) {
  return {
    "results/smoke-summary.json": JSON.stringify(data, null, 2), // Salva JSON formatado
  };
}
