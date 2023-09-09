import { API_URL } from "./config";
import { getJson } from "./hooks";

export let state = {
  recipe: {},
  searchedRecipe: {
    query: "",
    recipeList: [],
    currentPage: 1,
    resultsPerPage: 10,
  },
  bookmarkedList:JSON.parse(localStorage.getItem('wishLists')) || [],
};

export async function loadRecipe(recipeID) {
  try {
    let data = await getJson(`${API_URL}get?rId=${recipeID}`);

    let { recipe } = data;
    state.recipe = {
      id: Number(recipe.recipe_id),
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients.map((val) => {
        return { ingridient: val, qty: Math.floor(Math.random() * 10) + 1 };
      }),
      servings: Math.floor(Math.random() * 4) + 1,
      bookMarked: state.bookmarkedList.find(val=> Number(recipe.recipe_id) === val.id) ? true : false,
    };
    
  } catch (err) {
    throw err;
  }
}

export async function loadSearchedRecipes(query) {
  state.searchedRecipe.query;
  try {
    let data = await getJson(`${API_URL}search?q=${query}`);
    state.searchedRecipe.recipeList = data.recipes;
    state.searchedRecipe.currentPage = 1;

    // let { recipe } = data;
    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
  } catch (err) {
    throw err;
  }
}

export function resultsPerPage(page = state.searchedRecipe.currentPage) {
  state.searchedRecipe.currentPage = Number(page);
  let start = (page - 1) * 10;
  let end = page * 10;
  let recipeList = state.searchedRecipe.recipeList;
  return recipeList.slice(start, end);
}

export function updateServings(newServings) {
  state.recipe.ingredients.forEach((ing) => {
    let perPersonQuantity = (ing.qty / state.recipe.servings) * +newServings;
    ing.qty = perPersonQuantity;
  });
  state.recipe.servings = +newServings;
}

export function addToBookMarked(recipe){

  state.bookmarkedList.push(recipe)
  localStorage.setItem('wishLists',JSON.stringify(state.bookmarkedList))
  
  if(recipe.id == state.recipe.id) state.recipe.bookMarked = true;
}

export function removeBookMarked(id){

let indexofID = state.bookmarkedList.findIndex(val => val.id === id )
state.bookmarkedList.splice(indexofID,1);
localStorage.setItem('wishLists',JSON.stringify(state.bookmarkedList))

if(id == state.recipe.id) state.recipe.bookMarked = false;

}
