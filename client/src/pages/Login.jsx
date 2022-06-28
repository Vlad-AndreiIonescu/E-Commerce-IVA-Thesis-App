import { useState, useCallback } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import{useRouteMatch} from 'react-router-dom'
import { Alert } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://content.fortune.com/wp-content/uploads/2014/09/170887350.jpg?resize=1200,600")
  
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-left:115px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #ED555A;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left:115px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }

`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  
`;

const Error = styled.span`
  color: red;
  margin-left:115px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const router = useRouteMatch();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   login(dispatch, { username, password });
  // };
  const handleLogin = useCallback(
    (e) => {
      if(validateUser()){
        e.preventDefault();
        login(dispatch, { username, password });
      }
      
    },
    [username, password]
  );

  const validateUser=async(user)=>{
    let check=true;
    console.log("password: ", password)
    if(password.length>=5){
      setPasswordError("")
    }else{
      setPasswordError("Parola gresita")
    }
    if(username.length>=5){
      setUsernameError("")
    }
    else{
      setUsernameError("Username gresit")
    }
    return check;
  }


  if (currentUser) {
    router.replace('/home');
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <Title>Autentificare</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {
            usernameError ? <Alert sx={{color:"red"}} variant={'danger'}>{usernameError} </Alert> : null
          }
          
          <Input
            placeholder="parola"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />{
            passwordError ? <Alert sx={{color:"red"}} variant={'danger'}>{passwordError} </Alert> : null
          }
        <Link to="/home">
       <Button onClick={handleLogin} disabled={isFetching}  >
            Autentificare
          </Button></Link> 

          {/* {error && <Error>Credentiale invalide</Error>} */}
      
          <a href="/register" style={{ textDecoration: 'none', color:'black', marginLeft:'128px'}}>Creeaza un cont</a> 
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;