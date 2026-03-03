export default async function handler(req, res) {
  try {

    if (process.env.DISABLE_EXTERNAL_APIS === "true") {
      return res.status(200).json({
        current: {
          condition: { text: "Developer Mode" },
          temp_f: 70
        }
      })
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=State College`
    )

    const data = await response.json()

    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather" })
  }
}