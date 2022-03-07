import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <div>
          <input type="text" placeholder="Search Reciper" data-testid="search-input" />
        </div>

        <div>
          <label htmlFor="ingredient">
            <input
              id="ingredient"
              type="radio"
              name="filter"
              value="Ingredient"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>

          <label htmlFor="name">
            <input
              id="name"
              type="radio"
              name="filter"
              value="Name"
              data-testid="name-search-radio"
            />
            Name
          </label>

          <label htmlFor="firstLetter">
            <input
              id="firstLetter"
              type="radio"
              name="filter"
              value="FirstLetter"
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
        </div>

        <div>
          <button type="submit" data-testid="exec-search-btn">Search</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
