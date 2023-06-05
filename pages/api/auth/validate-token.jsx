export default async function handler(req, res) {
  if (req.method !== "POST") { return null; }

  const token = req.body;
  if (!token) { return null; }

  const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

  let rawResponse = await fetch(`${process.env.BACKEND_API_URL}/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...token, userIp }),
  });

  let jsonResponse = await rawResponse.json();
  return res.status(rawResponse.status).json(jsonResponse);

}
