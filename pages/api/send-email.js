import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { email, receipt } = req.body

    const total = receipt.reduce((sum, item) => sum + item.price, 0)

    let receiptText = ""

    receipt.forEach(item => {
      receiptText += `${item.name} - $${item.price}\n`
    })

    await resend.emails.send({
      from: "JUAL <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for your purchase from!",
      text: `
Thank you for your purchase! Here is your receipt:

${receiptText}

Total: $${total}

Thanks for shopping with us!
            `,
          })

    console.log("Email being sent to:", email)
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to send email" })
  }
}