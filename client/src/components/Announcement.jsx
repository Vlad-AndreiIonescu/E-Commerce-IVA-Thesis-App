import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #ED555A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Incepand de astazi orice livrare este gratuita!!!</Container>;
};

export default Announcement;
