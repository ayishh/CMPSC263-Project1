import styled from "styled-components"
import { useStateContext } from "@/context/StateContext"

const UserInfo = () => {
  const { user } = useStateContext()

  if (!user) return <div>Loading...</div>

  return (
    <Wrapper>
      <Avatar>
        {user.email?.charAt(0).toUpperCase()}
      </Avatar>

      <Info>
        <Name>Welcome back 👋</Name>
        <Email>{user.email?.split('@')[0]}</Email>
      </Info>
    </Wrapper>
  )
}

export default UserInfo

const Wrapper = styled.div`
  width: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 40px;
//   margin-top: 0.5vh;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;
`;

const Email = styled.p`
  margin: 0;
  font-size: 14px;
  color: gray;
`;