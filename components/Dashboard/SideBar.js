import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import {useState} from "react"
import {FaCashRegister, FaBars, FaChartLine } from "react-icons/fa"
import { MdInventory2, MdLogout} from "react-icons/md";
import { logoutUser } from "@/backend/Auth"
import { useStateContext } from "@/context/StateContext"


// const { setUser } = useStateContext()
// const router = useRouter()

const handleLogout = async () => {
  await logoutUser()
  setUser(null)
  router.push("/")
}

const Sidebar = () => {
  const router = useRouter()
  const { setUser } = useStateContext()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    router.push("/")
  }
  return (
    <Wrapper collapsed={collapsed}>
        <TopSection>
            <ToggleButton onClick={() => setCollapsed(!collapsed)}>
              <FaBars />
            </ToggleButton>

            {!collapsed && <Logo>JUAL</Logo>}

            <NavItem href="/pos" active={router.pathname === "/pos"}>
              {collapsed && <FaCashRegister />}
              {!collapsed && "POS"}
            </NavItem>

            <NavItem href="/inventory" active={router.pathname === "/inventory"}>
              {collapsed && <MdInventory2 />}
              {!collapsed && "Inventory"}
            </NavItem>

            <NavItem href="/sales" active={router.pathname === "/sales"}>
              {collapsed && <FaChartLine />}
              {!collapsed && "Sales"}
            </NavItem>

        </TopSection>

        {!collapsed &&(
        <LogOutButton onClick={handleLogout}><MdLogout/></LogOutButton>
        )}
        {collapsed &&(
          <LogOutButton onClick={handleLogout}><MdLogout/></LogOutButton>
        )}
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled.div`
  width: ${({ collapsed }) => (collapsed ? "70px" : "200px")};
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: ${({ collapsed }) => (collapsed ? "10px" : "30px 20px")};
  // gap: 20px;
  justify-content: space-between;
  transition: 0.3s ease;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 20px;
  padding : 10px;
`;

const Logo = styled.h2`
  color: white;
  margin-bottom: 40px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
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

  background: ${({ active, theme }) =>
    active ? theme.colors.accent : "transparent"};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: white;
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