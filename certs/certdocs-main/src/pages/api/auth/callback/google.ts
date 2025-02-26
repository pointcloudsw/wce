import type { APIContext } from "astro";

const tokenUrl = "https://www.googleapis.com/oauth2/v4/token";

const formData = new URLSearchParams();
formData.append("grant_type", "authorization_code");
formData.append("client_id", import.meta.env.GOOGLE_AUTH_CLIENT);
formData.append("client_secret", import.meta.env.GOOGLE_AUTH_SECRET);
formData.append("redirect_uri", import.meta.env.GOOGLE_AUTH_CALLBACK_URL);
formData.append("code", code);
formData.append("code_verifier", codeVerifier);

const fetchToken = await fetch(tokenUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formData,
});

const fetchTokenRes = await fetchToken.json();

console.log("fetch token res ", fetchToken.status, fetchTokenRes);

const fetchUser = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
  headers: { Authorization: `Bearer ${fetchTokenRes.access_token}` },
});
const fetchUserRes = await fetchUser.json();

console.log("fetchUserRes", fetchUser.status, fetchUserRes);


const userExists = await db.query.users.findFirst({
  where: eq(users.email, fetchUserRes.email),
  with: {
    oauthTokens: {
      where: eq(oauthTokens.strategy, "google"),
    },
  },
});

console.log("userExists", userExists);


export async function GET({ request,clientAddress, url }: APIContext) {
  const code = new URL(request.url).searchParams?.get("code");
  const state = new URL(request.url).searchParams?.get("state");
  const storedState = cookies.get("google_oauth_state")?.value;
  const codeVerifier = cookies.get("google_code_challenge")?.value;

  if (storedState !== state || !codeVerifier || !code) {
    cookies.delete("google_oauth_state", { path: "/" });
    cookies.delete("google_code_challenge", { path: "/" });

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=Server+Error",
      },
    });
  }
}


