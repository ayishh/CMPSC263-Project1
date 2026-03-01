import styled from "styled-components"

const ItemGrid = ({ items, addToReceipt }) => {
  return (
    <Grid>
      {items.map(item => (
        <ItemButton
          key={item.id}
          onClick={() => addToReceipt(item)}
        >
          {item.name}
          {/* <br />
          ${item.price} */}
        </ItemButton>
      ))}
    </Grid>
  )
}

export default ItemGrid

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
`

const ItemButton = styled.button`
  padding: 20px;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  background-color: ${({ theme }) => theme.colors.secondary};
//   color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`