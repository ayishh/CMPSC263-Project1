import styled from "styled-components"
import { useStateContext } from "@/context/StateContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const UserInfo = () => {
  const { user } = useStateContext()

  if (!user) return <div>Loading...</div>

  const [holiday, setHoliday] = useState(null)
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    fetch("/api/holiday")
      .then(res => res.json())
      .then(data => {
        if (data.holiday) {
          setHoliday(data.holiday)
        }
      })
    fetch("/api/weather")
      .then(res => res.json())
      .then(data => setWeather(data))
  }, [])

  return (
    <Wrapper>
      <Left>
        <Banner>
          <WidgetTitle>Today's Holiday</WidgetTitle>
          {holiday && holiday.name}
        </Banner>
        <Banner>
          <WidgetTitle>Today's Weather</WidgetTitle>
          {weather?.current?.condition?.text || "Weather unavailable"}
        </Banner>
      </Left>
      <Right>
        <Avatar>
          {user.email?.charAt(0).toUpperCase()}
        </Avatar>
        <Info>
          <Name>Welcome back</Name>
          <Email>{user.email?.split('@')[0]}</Email>
        </Info>
      </Right>

    </Wrapper>
  )
}

export default UserInfo

const Wrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px 40px;
//   margin-top: 0.5vh;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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



const Banner = styled.div`
  // background: #ffcc00;
  border : 2px solid ${({ theme }) => theme.colors.accent};
  color: #000;
  padding: 10px;
  // margin: 10px 0;
  margin-bottom: 30px;
  border-radius: 6px;
  // font-weight: 200;
  text-align: center;
  font-size: 1rem;
`

const WidgetTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  // margin-bottom: 10px;
`;