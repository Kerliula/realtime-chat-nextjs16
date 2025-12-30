import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

function normalizeApiUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }
  try {
    new URL(url);
    return url;
  } catch {
    throw new Error(`Invalid API URL: ${url}`);
  }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "localhost:3000";
const normalizedApiUrl = normalizeApiUrl(apiUrl);

export const client = treaty<App>(normalizedApiUrl).api;
