import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { Search } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  border: 0.5px solid teal;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 20px;
  width: 50%;
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: #ececee;
  }

  ${mobile({
    width: "100%",
  })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
`;

const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  ${mobile({
    marginLeft: 0,
    marginTop: "10px",
    position: "static",
    width: "100%",
  })}
`;

const ResultsMessage = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState(popularProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResultsMessage, setSearchResultsMessage] = useState("");

  useEffect(() => {
    getProducts();
  }, [cat]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      getProducts();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(
        cat
          ? `http://localhost:5000/api/products?category=${cat}`
          : "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handleSearch = () => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filtered.length > 0) {
      setFilteredProducts(filtered);
      setSearchResultsMessage(`Showing results for: "${searchText}"`);
    } else {
      setSearchResultsMessage(`No results found for: "${searchText}"`);
    }

    setSearchText("");
  };

  return (
    <>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search Your Favourite Pooja here on just one click"
          value={searchText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <TopButton onClick={handleSearch}>
          <Search />
        </TopButton>
      </SearchContainer>

      {searchResultsMessage && (
        <ResultsMessage>{searchResultsMessage}</ResultsMessage>
      )}

      <Container>
        {filteredProducts.slice(0, 20).map((item, index) => (
          <Product item={item} key={`${item.id}-${index}`} cat={cat} />
        ))}
      </Container>
    </>
  );
};

export default Products;
