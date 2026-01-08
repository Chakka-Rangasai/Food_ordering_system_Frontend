
// src/app/utils/idempotency-key.util.ts
const NS = 'idem:'; // namespace prefix in localStorage

/** Generate a new opaque idempotency key (64 chars or less) */
export function generateIdempotencyKey(prefix = 'order'): string {
  // ~36-40 chars total; adjust to your DB length (you set 64)
  return `${prefix}-${cryptoRandom()}-${Date.now()}`;
}

/** Get existing key or create & persist a new one for the given operation */
export function getOrCreateIdempotencyKey(operation: string, prefix = 'order'): string {
  const keyName = NS + operation;
  const existing = localStorage.getItem(keyName);
  if (existing) return existing;

  const newKey = generateIdempotencyKey(prefix);
  localStorage.setItem(keyName, newKey);
  return newKey;
}

/** Clear the key for the given operation (call after success) */
export function clearIdempotencyKey(operation: string): void {
  localStorage.removeItem(NS + operation);
}

/** Override the key manually for testing duplicate submissions */
export function setIdempotencyKey(operation: string, key: string): void {
  localStorage.setItem(NS + operation, key);
}

/** Helper: use crypto if available, else fallback */
function cryptoRandom(): string {
  if (window.crypto && 'getRandomValues' in window.crypto) {
    const arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    return arr[0].toString(36) + arr[1].toString(36);
  }
  // Fallback (still fine for idempotency keys)
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

/**
 * Dummy function with the SAME NAME as the payload field: `idempotencyKey`.
 * This simply returns the current key from localStorage for the operation.
 * You can paste a key to localStorage and confirm it's used in the payload.
 */
export function idempotencyKey(operation: string): string {
  const key = localStorage.getItem(NS + operation);
  return key ?? ''; // return empty if not present
}
