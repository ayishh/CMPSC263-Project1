import styled from "styled-components"

const SalesHistory = ({ history }) => {

  return (
    <Wrapper>
      {history.map(order => (
        <OrderCard key={order.id}>

          <OrderHeader>
            <Left>
              <div>Order ID: {order.id}</div>
              <SubHeader>Cashier: {order.userId || "Unknown"}</SubHeader>
            </Left>

            <Right>
              {order.createdAt?.toDate
                ? order.createdAt.toDate().toLocaleString()
                : ""}
            </Right>
          </OrderHeader>

          {order.receipt?.map((item, index) => (
            <OrderItem key={index}>
              <span>{item.name}</span>
              <span>${item.price}</span>
            </OrderItem>
          ))}

          <OrderTotal>
            Total: ${order.total}
          </OrderTotal>

        </OrderCard>
      ))}
    </Wrapper>
  )
}

export default SalesHistory

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
`

const OrderCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
`

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
`

const SubHeader = styled.span`
  font-size: 0.85rem;
  font-weight: normal;
  color: gray;
`

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`

const OrderTotal = styled.div`
  margin-top: 10px;
  font-weight: bold;
  text-align: right;
`