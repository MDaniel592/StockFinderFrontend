// Server Side Rendering -> Hidden from user
import Custom404 from "../../404";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userData = req.body;
    if (!userData) {
      return res.status(401).json({ userData });
    }

    const userIp = req.headers["cf-connecting-ip"] || "127.0.0.1";

    try {
      let rawResponse = await fetch(process.env.BACKEND_API_URL + `/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, userIp }),
      });
      let jsonResponse = await rawResponse.json();
      return res.status(rawResponse.status).json(jsonResponse);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  }
  return <Custom404 />;
}
