export default async function handler(req, res) {
  const today = new Date()
  const year = today.getFullYear()

  try {

    if (process.env.DISABLE_EXTERNAL_APIS === "true") {
      return res.status(200).json({
        holiday: { name: "Developer Mode" }
      })
    }

    const response = await fetch(
      `https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFIC_KEY}&country=US&year=${year}`
    )

    const data = await response.json()

    const todayStr = today.toISOString().split("T")[0]

    const holidayToday = data.response.holidays.find(
      h => h.date.iso === todayStr
    )

    return res.status(200).json({ holiday: holidayToday || null })

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch holiday" })
  }
}