import type { SiteContent } from "./types";

export const ADMIN_USER = "KranthiYadavE";
export const REPO_OWNER = "KranthiYadavE";
export const REPO_NAME = "portfolio";
export const CONTENT_PATH = "content/site.json";
export const TOKEN_KEY = "ke-admin-token";

const API = "https://api.github.com";

function headers(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function verifyAdmin(token: string) {
  const res = await fetch(`${API}/user`, { headers: headers(token) });
  if (!res.ok) {
    throw new Error("GitHub rejected that token. Create a new one with repo access.");
  }
  const user = (await res.json()) as { login: string };
  if (user.login.toLowerCase() !== ADMIN_USER.toLowerCase()) {
    throw new Error(`Only @${ADMIN_USER} can edit this site.`);
  }
  return user.login;
}

type GitFile = { sha: string; content: string; encoding: string };

export async function loadSiteFile(token: string) {
  const res = await fetch(
    `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
    { headers: headers(token), cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error("Could not load site content from GitHub.");
  }
  const file = (await res.json()) as GitFile;
  const decoded = decodeBase64(file.content.replace(/\n/g, ""));
  return { sha: file.sha, data: JSON.parse(decoded) as SiteContent };
}

export async function saveSiteFile(token: string, data: SiteContent, sha: string) {
  const body = JSON.stringify(data, null, 2) + "\n";
  const res = await fetch(
    `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CONTENT_PATH}`,
    {
      method: "PUT",
      headers: { ...headers(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Update portfolio content from admin",
        content: encodeBase64(body),
        sha,
        branch: "main",
      }),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message =
      typeof err === "object" && err && "message" in err
        ? String((err as { message: string }).message)
        : "Save failed.";
    throw new Error(message);
  }
  const json = (await res.json()) as { content: { sha: string } };
  return json.content.sha;
}

function encodeBase64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(b64: string) {
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
