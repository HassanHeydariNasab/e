import fetch from "node-fetch";

interface OpenexchangeratesResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: "USD";
  rates: Record<string, number>;
}

export async function getExchangeRates() {
  const result = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPENEXCHANGERATES_APIKEY}`
  );
  const json: OpenexchangeratesResponse =
    (await result.json()) as OpenexchangeratesResponse;
  return json.rates;
}
