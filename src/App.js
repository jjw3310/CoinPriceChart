import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";
import CoinTable from "./components/CoinTable";
// import SearchResults from "./components/SearchResults";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  width: 800px;
  height: 100%;
  /* background-color: black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  /* background-color: pink; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const TableContainer = styled.div`
  height: 610px;
  width: 100%;
  /* background-color: aliceblue; */
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <HeaderContainer>
            <h1>실시간 코인 가격 Chart</h1>
          </HeaderContainer>
          <TableContainer>
            <CoinTable />
          </TableContainer>
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
