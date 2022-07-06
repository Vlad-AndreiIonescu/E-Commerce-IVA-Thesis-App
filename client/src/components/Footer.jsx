import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  margin-left:50px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: column-gap;
  display: flex;
  flex-wrap: wrap;

`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  margin-left:50px;
  text-decoration:none;
  color:black;
  
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>IVA</Logo>
        <Desc>
        Acceptarea diferentelor este cheia spre un viitor deschis spre progres. 
        Si cum acesta incepe de la fiecare in parte, la IVA diferentele ne apropie,
        de aceea produsele noastre sunt variate, orientate spre satisfacerea nevoilor si croite pentru toate dimensiunile.
        </Desc>
        <SocialContainer>
         
        </SocialContainer>
      </Left>
      <Center>
        <Title>Diferite link-uri</Title>
       
          <Link to="/home" style={{textDecoration: 'none'}}><ListItem >Home</ListItem></Link>
          <Link to="/cart" style={{textDecoration: 'none'}}><ListItem>Cos de cumparaturi</ListItem></Link>
          <Link to="/products/Barbati" style={{textDecoration: 'none'}}><ListItem>Produse pentru barbati</ListItem></Link> 
          <Link to="/products/Femei" style={{textDecoration: 'none'}}><ListItem>Produse pentru femei</ListItem></Link>
        
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/>  STR. IACOBENI nr. 53, BUCURESTI - SECTOR 5, 52035
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> 0725546606
        </ContactItem>
     
      </Right>
    </Container>
  );
};

export default Footer;
