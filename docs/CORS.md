# CORS Error Explained

## What you saw

```
Access to XMLHttpRequest at 'https://api.greenbeam.online/api/v1/products' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## What it means

- Your **browser** is loading the app from `http://localhost:3000` (or another frontend origin).
- The **JavaScript** on that page sends a request to a **different origin**: `https://api.greenbeam.online`.
- Browsers enforce **CORS**: the **API server** must explicitly allow your frontend origin by sending a response header like:
  - `Access-Control-Allow-Origin: http://localhost:3000`
- If the API does **not** send that header (or doesn’t allow your origin), the browser **blocks** the response and you see the error above.

So the “block” is done by the **browser** for security; the **fix** is on the **API server** (api.greenbeam.online), not in the Next.js app.

## Fix on the API (production / proper fix)

Whoever controls **https://api.greenbeam.online** must configure CORS there. Examples:

**Node/Express:**

```js
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-production-site.com'
  ],
  credentials: true  // if you send cookies/auth headers
}));
```

**Other backends:** Add a response header for allowed origins, e.g.:

- `Access-Control-Allow-Origin: http://localhost:3000` (or a list handled by your framework).
- For preflight: `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` as needed.

Until the API allows your frontend origin, **direct** browser requests from that origin to the API will keep failing with CORS.

## Avoid CORS in local development (proxy)

So you don’t depend on API CORS for local dev, this project can **proxy** API requests through the Next.js server:

- The **browser** only talks to the same origin (e.g. `http://localhost:3000`).
- Next.js **rewrites** e.g. `/api/v1/*` to `https://api.greenbeam.online/api/v1/*` and returns the response.
- No cross-origin request from the browser → no CORS.

See **“Using the dev proxy”** in the main README or env example. **In this repo:** Main site and admin use a Next.js rewrite in dev: `/api/v1/*` is proxied to the API. If you leave `NEXT_PUBLIC_API_URL` unset in dev, the app uses `/api/v1` (same-origin), so no CORS. In production, set `NEXT_PUBLIC_API_URL` to your API URL.
