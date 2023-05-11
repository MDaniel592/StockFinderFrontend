// Server Side Rendering -> Hidden from user

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userData = req.body;
    if (!userData) {
      return null;
    }

    const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

    let rawResponse = await fetch(process.env.BACKEND_API_URL + "/delete_alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userData, userIp }),
    });
    let jsonResponse = await rawResponse.json();
    return res.status(rawResponse.status).json(jsonResponse);
  }
  return null;
}
