export const generateCodeChallenge = async (verifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeVerifier = () => {
  const randomBytes = new Uint8Array(32);

  crypto.getRandomValues(randomBytes);

  return Array.from(randomBytes)
    .map((byte) => String.fromCharCode((byte % 26) + 97))
    .join("");
};
