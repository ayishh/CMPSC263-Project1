import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import UserInfo from "./UserInfo"

const Sidebar = () => {
  const router = useRouter()

  return (
    <Wrapper>
        <TopSection>
            <Logo>JUAL</Logo>
            <NavItem href="/pos" active={router.pathname === "/pos"}>
            POS
            </NavItem>
            <NavItem href="/inventory" active={router.pathname === "/inventory"}>
            Inventory
            </NavItem>
            <NavItem href="/sales" active={router.pathname === "/sales"}>
            Sales
            </NavItem>
        </TopSection>

        <LogOutButton onClick={() => logOut(setUser)}>Logout</LogOutButton>
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled.div`
  width: 200px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  gap: 20px;
  justify-content: space-between;
`;

const Logo = styled.h2`
  color: white;
  margin-bottom: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItem = styled(Link)`
  color: ${({ active }) => (active ? "white" : "#cbd5e1")};
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;

  background: ${({ active }) =>
    active ? "${({ theme }) => theme.colors.accent}" : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
  }
`;

const LogOutButton = styled.button`
  font-weight: 600;
  font-size: 1rem;
//   background: red;
  background: ${({ theme }) => theme.colors.accent};
//   border: 1px solid ${({ theme }) => theme.colors.accent};
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  color: white;
  cursor: pointer;
`;