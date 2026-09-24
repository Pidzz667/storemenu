export default async function handler(req, res) {
  try {
    const { endpoint, ...params } = req.query;

    if (!endpoint) {
      return res.status(400).json({
        success: false,
        error: "Endpoint tidak ditemukan"
      });
    }

    const API_KEY = "PREMIUM04JFHDUDJAISKXNRNDIAKNX";

    const endpointName = endpoint.endsWith(".php")
      ? endpoint
      : `${endpoint}.php`;

    const url = new URL(
      `https://hyerls.my.id/api/${endpointName}`
    );

    url.searchParams.set("key", API_KEY);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && key !== "endpoint") {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString());

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({
        success: false,
        error: "Server HYERLS mengembalikan HTML, bukan JSON",
        preview: text.slice(0, 300)
      });
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error("Proxy error:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
