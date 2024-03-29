import React from 'react';
import { Add, Remove, DeleteOutline, Visibility, SpaceBar, Today } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useCallback, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { deleteProduct, emptyCart } from '../redux/cartRedux';
import { Link
} from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  margin-bottom:20px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
 
    border-color: green;
 
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  // const typePackaging = useSelector((state) => state.typePackaging)
  const [typePackaging, setTypePackiging] = useState('default');
  const [view, setView] = useState('');

  const onToken = (token) => {
    setStripeToken(token);
  };


  const onAddCommand = async () => {
    console.log("s-a apasat")
    console.log(cart);
    try {
      console.log("a mers");
      const command = {
        userId: "62ab3de4adfef06d316bcdd3",
        products: cart.products,
        amount: cart.total,
        typePackaging: typePackaging,
        shippingDate: selectedDate
      }
      console.log("command: ", command);
      console.log("shippingDate: ", selectedDate)
      const res = await userRequest.post("/orders", command);

    } catch {
      console.log("sorry boss");
    }
  }

  const handleDelete = useCallback((product) => {
    dispatch(
      deleteProduct({
        id: product._id,
        total: product.price * product.quantity,
      })
    );
    console.log(product);
  }, []);




  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log("a mers");
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
          type: typePackaging
        });
        console.log("res is: " + res.data);
        history.push("/success", {
          stripeData: res.data,
          products: cart,
        });

      } catch {
        console.log("sorry boss");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history, typePackaging]);
  const [selectedDate, setSelectedDate] = useState(null);

  function disableDays(date) {
    var todayDate = new Date();
    var today = todayDate.getUTCDate()
    var day = date.getUTCDate()
    console.log('day: ' + day)
    console.log('today: ' + today)
    // var tdate=todayDate.getDate();
    // console.log(date)
    return date.getDay() === 0 || date.getDay() === 6 || day === today - 1 || day === today || day === today + 1 
    
    
  }
 

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Cosul tau</Title>
        <Top>
          <Link to="/">
            <TopButton>Continua cumparaturile</TopButton>
          </Link>
          <TopButton type="filled" onClick={() => dispatch(emptyCart())} >Goleste cosul</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />

                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor><b>Culoare:</b>{product.color} </ProductColor>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>

                  <ProductPrice>
                    {product.price * product.quantity} RON
                  </ProductPrice>
                  <DeleteOutline onClick={() => handleDelete(product)} />
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Detalii comanda</SummaryTitle>


            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tip Ambalaj</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typePackaging}
                label="tipAmbalaj"
                onChange={e => setTypePackiging(e.target.value)}
              >
                <MenuItem value='default'>Default</MenuItem>
                <MenuItem value='nastere'>Zi de nastere</MenuItem>
                <MenuItem value='cadou'>Cadou</MenuItem>
                <MenuItem value='indragostitilor'>Ziua Indragostitilor</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <br></br>

            {/* <DateTimePicker /> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                value={selectedDate}
               // variant="inline"
            inputVariant="outlined"
                format="MM/dd/yyyy"
                label="Alege data livrarii!"
                onChange={value => setSelectedDate(value)}
                
                disablePast={true}
                shouldDisableDate={disableDays}
                
                

              />
            </MuiPickersUtilsProvider>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total} RON</SummaryItemPrice>
            </SummaryItem>



            <StripeCheckout
              name="IVA"
              image="AvatarStripe.jpeg"
              billingAddress
              shippingAddress
              description={`Aveți de plătit  ${cart.total} RON`}
              currency="RON"
              amount={cart.total *100}

              token={onToken}
              stripeKey={KEY}
            >
            <Button onClick={onAddCommand}>Plateste</Button>            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );

};

export default Cart;