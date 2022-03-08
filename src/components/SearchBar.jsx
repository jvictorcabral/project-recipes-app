import React, { useState } from 'react';
import api from '../services/mealsApi';

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
    <form>
      <div>
        <input
          type="text"
          value={ state.searchText }
          onChange={ onChangeSearchText }
          placeholder="Search Reciper"
          data-testid="search-input"
        />
      </div>

      <div>
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
        <button
          type="submit"
          onClick={ getRequest }
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
