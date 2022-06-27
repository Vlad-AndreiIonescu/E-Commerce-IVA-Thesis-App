import { Link, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';
import { useForm } from 'react-hook-form'
import { Alert, Stack, FormControl } from '@mui/material';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://heygents.com.au/wp-content/uploads/2018/02/sqd1.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`

  // // width: 27%;
  // display:contents ;
  // padding: 20px;
  // background-color: white;
  // ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 10;
  min-width: 50%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 25px;
`;

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [confirmPassError, setConfirmPassError] = useState('');

  const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);
  const router = useRouteMatch();
  const history = useHistory();

  // const intialValues={username: "", email: "", password: ""};
  // const [formValues, setFormValues]=useState(initialValues);
  // const [formErrors, setFormErrors]=useState({});
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateUser()) {
      register(dispatch, { username, email, password });
      // history.push('/');
      console.log("yay")

    }
    else {
      console.log("nope")
    }
  };


  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateUser = async () => {
    let check = true;
    console.log("email: ", email)
    if (!validateEmail(email)) {
      setEmailError("Email invalid.")
      check = false;
    }
    else {
      setEmailError("")
    }
    console.log("pass: ", password)

    if (password.length < 8 || password.trim() === "") {
      setPasswordError("Parola trebuie sa contina cel putin 8 caractere.");
      check = false;
    }
    else {
      setPasswordError("");
    }
    console.log("name: ", name)

    if (name.length <= 3 || name.trim() === "") {
      setNameError("Prenume invalid! Trebuie sa contina cel puutin 3 litere");
      check = false;
    }
    else {
      setNameError("");
    }
    console.log("lastname: ", lastname)

    if (lastname.length <= 3 || lastname.trim() === "") {
      setLastnameError("Nume invalid! Trebuie sa contina cel puutin 3 litere");
      check = false;
    }
    else {
      setLastnameError("");
    }
    console.log("username: ", username)

    if (username.length <= 3 || username.trim() === "") {
      setUsernameError("Username invalid! Trebuie sa contina cel puutin 3 litere");
      check = false;
    }
    else {
      setUsernameError("");
    }

    console.log("confirmpass: ", confirmPass)

    if (confirmPass !== password) {
      setConfirmPassError("Parolele nu coincid!")
      check = false;
    }
    else {
      setConfirmPassError("")
    }


    return check;
  }

  return (
    <Container>
      <Wrapper>
      <Stack
  alignItems="center"
  spacing={0.01}
>
        <Title>CREATE AN ACCOUNT</Title >
        <Form onSubmit={handleRegister}>

        <FormControl>

             <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            {
              nameError ? (
                <Alert sx={{color:"red"}} variant={'danger'}>
                  {nameError}
                </Alert>
              ) : null
            }
            <Input placeholder="last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            {
              lastnameError ? (
                <Alert sx={{color:"red"}} variant={'danger'}>
                  {lastnameError}
                </Alert>
              ) : null
            }
            <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            {
              usernameError ? (
                <Alert variant={'danger'}>
                  {usernameError}
                </Alert>
              ) : null
            }
            <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {
              emailError ? (
                <Alert variant={'danger'}>
                  {emailError}
                </Alert>
              ) : null
            }
            <Input placeholder="password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {
              passwordError ? (
                <Alert variant={'danger'}>
                  {passwordError}
                </Alert>
              ) : null
            }
            <Input placeholder="confirm password" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
            {
              confirmPassError ? (
                <Alert variant={'danger'}>
                  {confirmPassError}
                </Alert>
              ) : null
            }

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button type="submit" onClick={handleRegister}>CREATE</Button>
            </Link>
            </FormControl>
        </Form>
        </Stack>
      </Wrapper>
    </Container>
  );
};

export default Register;
