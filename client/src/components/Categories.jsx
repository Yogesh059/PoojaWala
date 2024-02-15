import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { CategoriesData } from "../data"; // Rename the import

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const StyledSearchContainer = styled.div`
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

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
`;

const StyledTopButton = styled.button`
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

const Categories = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResultsMessage, setSearchResultsMessage] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSearchResultsMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredCategories = CategoriesData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredCategories.length === 0) {
      setSearchResultsMessage("No results found.");
    } else {
      setSearchResultsMessage("");
    }
  };

  return (
    <>
      <StyledSearchContainer>
        <StyledInput
          type="text"
          placeholder="Search Your Favourite Pooja here on just one click"
          value={searchText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <StyledTopButton onClick={handleSearch}>Search</StyledTopButton>
      </StyledSearchContainer>

      {searchResultsMessage && (
        <ResultsMessage>{searchResultsMessage}</ResultsMessage>
      )}

      <Container>
        {CategoriesData.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
