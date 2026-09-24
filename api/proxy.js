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

    const url = new URL(`https://hyerls.my.id/api/${endpoint}`);

    url.searchParams.set("key", API_KEY);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString());

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        success: false,
        error: text
      };
    }

    return res.status(response.status).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
