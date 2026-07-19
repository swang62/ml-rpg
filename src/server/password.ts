/**
 * Password hashing using Web Crypto (PBKDF2 + SHA-256).
 *
 * Worker-safe: no native addons. Uses only Web Crypto API.
 *
 * Hash format: `pbkdf2:sha256:<base64-salt>:<base64-derived-key>`
 */

const HASH_PREFIX = "pbkdf2:sha256:";
const KEY_LENGTH = 32; // 256 bits
const ITERATIONS = 10_000;
const SALT_LENGTH = 16;

function base64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(str: string): ArrayBuffer {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer as ArrayBuffer;
}

/** Hash a password using PBKDF2 (Web Crypto). */
export async function createHash(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey", "deriveBits"],
  );

  const key = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt.buffer as ArrayBuffer,
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );

  return `${HASH_PREFIX}${base64(salt.buffer as ArrayBuffer)}:${base64(key)}`;
}

/**
 * Verify a password against a stored PBKDF2 hash.
 */
export async function checkPassword(
  storedPassword: string,
  providedPassword: string,
): Promise<void> {
  if (!storedPassword.startsWith(HASH_PREFIX)) {
    throw new Error(
      "Unsupported password hash format — only PBKDF2 is accepted",
    );
  }

  const parts = storedPassword.slice(HASH_PREFIX.length).split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid password hash format");
  }
  const [saltB64, keyB64] = parts;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(providedPassword),
    "PBKDF2",
    false,
    ["deriveKey", "deriveBits"],
  );

  const key = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: fromBase64(saltB64),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );

  const derivedB64 = base64(key);

  // Constant-time comparison
  const a = derivedB64;
  const b = keyB64;
  if (a.length !== b.length) {
    throw new Error("Invalid password");
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  if (mismatch) {
    throw new Error("Invalid password");
  }
}
