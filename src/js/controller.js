import svgUrl from "../img/icons.svg";
import * as model from "./model";
const recipeContainer = document.querySelector(".recipe");
import reciepeView from "./views/reciepeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";
import paginationView from './views/paginationView'
import bookMarksView from "./views/bookMarksView";
import addRecipeView from "./views/addRecipeView";


function errorMessage(whereTodisplay, errorMessage) {
  whereTodisplay.innerHTML = "";

  whereTodisplay.insertAdjacentHTML("afterbegin", errorMessage);
}

const controlRecipes = async () => {
  let recipeID = window.location.hash.slice(1);

  if (!recipeID) return;
  reciepeView.loader(recipeContainer);

  try {
    // 1. fetching the recipes

    await model.loadRecipe(recipeID);


    // 2. Render The recipes

    reciepeView.render(model.state);
   


  } catch (error) {
    
   reciepeView.renderError(error.message)
  }
};


const controlSearchedRecipes = async () => {

  let query = searchView.searchedQuery()
  if(!query) return;
  resultsView.loader()

   try{
    await model.loadSearchedRecipes(query)
     
    resultsView.render(model.resultsPerPage())
    paginationView.render(model.state.searchedRecipe)
    
   }catch(err){
    resultsView.renderError(err)
   }
}


// 

function paginationController(index){


  resultsView.render(model.resultsPerPage(index))
  paginationView.render(model.state.searchedRecipe)
}


function servingController(newServ){

  model.updateServings(newServ)

// reciepeView.render(model.state);
reciepeView.update(model.state)

}

function updateActiveClass(val) {

  resultsView.update(model.resultsPerPage())
  bookMarksView.update(model.state.bookmarkedList)


  }

  function updateBookMark(){
    if(model.state.recipe.bookMarked){
      model.removeBookMarked(model.state.recipe.id)
    }else{
  model.addToBookMarked(model.state.recipe)
      
    }
    
bookMarksView.render(model.state.bookmarkedList)
reciepeView.update(model.state)
  }

  function uplodNewRecipe(data) {
console.log(data)
    }
/**
 * @function [init] for intialization
 * 
 */
function init(){
  reciepeView.addHandlerRander(controlRecipes);
  reciepeView.addHandlerAddBookmark(updateBookMark);

  searchView.addHandlerRender(controlSearchedRecipes);
  paginationView.addHendlerRender(paginationController);
  reciepeView.addHandlerUpdate(servingController);
  resultsView.addHandlerSearchResult(updateActiveClass)
  addRecipeView.addhandlerFormSubmit(uplodNewRecipe)
console.log('Unhappy')

if(model.state.bookmarkedList.length>0)bookMarksView.render(model.state.bookmarkedList)

}
init()
