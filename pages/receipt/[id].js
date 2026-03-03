import { useRouter } from "next/router"

export default function ReceiptPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Receipt</h1>
      <p>Receipt ID: {id}</p>
    </div>
  )
}