import styled from "styled-components"

const Receipt = ({ receipt, onPayment }) => {

    // Calculate the total price
    const total = receipt.reduce((sum, item) => {
        return sum + item.price
    }, 0)

  return (
    <Wrapper>
        <Title>Receipt</Title>
    
        <MainSection>
            {receipt.map((item, index) => (
                <Item key={index}>
                <span>{item.name}</span>
                <span>${item.price}</span>
                </Item>
            ))} 
            <Total>
                <strong>Total:</strong>
                <strong>${total}</strong>
            </Total>
        </MainSection>
        <PaymentSection>
            <CashButton onClick={onPayment}>Pay</CashButton>
            <QRButton>Pay & Send Receipt</QRButton>
        </PaymentSection>

    </Wrapper>
  )
}

export default Receipt

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
  margin-bottom: 10px;
  align-self: center;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2dfdf;
  padding-bottom: 5px;
  color: ${({ theme }) => theme.colors.accent};
`

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PaymentSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-top: auto;
`

const CashButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`

const QRButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
`