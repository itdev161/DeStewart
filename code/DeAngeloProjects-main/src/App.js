import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
  const APP_ID = "1186620a";
  const APP_KEY ="b795dfd41437955ec49258db4f5a8f35";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  
  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
};

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className = "App">
      
      <form onSubmit = {getSearch} className = "search-form" > 
        <input className = "search-bar"
          type = "text" 
          value = {search}
          onChange = {updateSearch}
          placeholder="Type ingredient for recipe"
        />
        <button className = "search-button" type = "submit">
          Search
        </button>
        </form>
        <div className ="title">
          <h1> Recipes </h1>
        </div>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          />
      ))}
      </div>
      <div className = "footer">
      <footer>
        <p>Created By DeAngelo Stewart</p>
      </footer>
      </div>
    </div>
    
  );
};

export default App;
