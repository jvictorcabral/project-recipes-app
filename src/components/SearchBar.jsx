import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../services/mealsApi';
import '../styles/SearchBar.css';

const state = {};

function onChangeSearchText(event) {
  state.setSearchText(event.target.value);
}

function onChangeOption(event) {
  state.setOption(event.target.value);
}

function getRequest(event) {
  event.preventDefault();

  if (state.option === 'firstLetter' && state.searchText.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    api(state.option, state.searchText)
      .then((response) => console.log(response));
  }
}

function SearchBar() {
  [state.searchText, state.setSearchText] = useState('');
  [state.option, state.setOption] = useState('');

  return (
    <form className="search-form">
      <div>
        <Form.Control
          type="text"
          value={ state.searchText }
          onChange={ onChangeSearchText }
          placeholder="Search Recipe"
          data-testid="search-input"
        />
      </div>

      <div className="radio-btn">
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="filter"
            value="ingredient"
            onChange={ onChangeOption }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="filter"
            value="name"
            onChange={ onChangeOption }
            data-testid="name-search-radio"
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            type="radio"
            name="filter"
            value="firstLetter"
            onChange={ onChangeOption }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <div>
        <Button
          type="submit"
          onClick={ getRequest }
          data-testid="exec-search-btn"
          className="search-btn"
          variant="outline-light"
        >
          Search
        </Button>
      </div>
    </form>
  );
}

export default SearchBar;
