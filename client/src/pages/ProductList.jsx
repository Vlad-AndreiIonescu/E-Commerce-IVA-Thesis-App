import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
 };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filtrare produse:</FilterText>
          <Select name="color" onChange={handleFilters}>
          <Option hidden>Culoare</Option>
            <Option value={"White"}>Alb</Option>
            <Option value={"Black"}>Negru</Option>
            <Option value={"Red"}>Rosu</Option>
            <Option value={"Blue"}>Albastru</Option>
            <Option value={"Yellow"}>Galben</Option>
            <Option value={"Green"}>Verde</Option>
           
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option hidden>Marime</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>2XL</Option>
            <Option>3XL</Option>
            <Option>4XL</Option>
            <Option>5XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sortare produse:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
          <Option value="asc">Pret ascendent</Option>
            <Option value="desc">Pret descentent</Option>
            <Option value="newest">Cele mai noi</Option>
            
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;
