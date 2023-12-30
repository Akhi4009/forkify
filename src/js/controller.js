 import * as model from "./model.js";
 import recipeView from "./views/recipeView.js";
 import searchView from "./views/searchView.js";
 import resultView from "./views/resultView.js";
 import 'core-js/stable';
 import 'regenerator-runtime/runtime'
 import paginationView from "./views/paginationView.js";


// https://forkify-api.herokuapp.com/v2



const controlRecipes = async function(){

try {
   const id = window.location.hash.slice(1);
  if(!id) return;
  recipeView.renderSpinner()

  // 1) Loading Recipe

  await model.loadRecipe(id);

  // Rendering recipe
  
  recipeView.render(model.state.recipe);
 
  
 
  } catch (error) {
 recipeView.renderError()
 }

}

const controlSearchResult = async function(){

   try {
      resultView.renderSpinner()
      // 1) Get search query
      const query = searchView.getQuery();
      // console.log(query)
      if(!query || query === '') return;
      // console.log(query)
    
      // 2) Load search result
      await model.loadSearchResults(query) 
   
      // 3) Render Results
   
    
      resultView.render(model.getSearchResultsPage())

     // 4) render initial pagination button 

     paginationView.render(model.state.search)


   } catch (error) {
      resultView.renderError();
   }
}

const controlPagination = function(goToPage){

 //  Render new Results
   
    
 resultView.render(model.getSearchResultsPage(goToPage))

 //  render new  pagination button 

 paginationView.render(model.state.search)
}

const controlServing = function(newServing){
   // update the recipe serving (in state)
   model.updateServing(newServing);
   // update the recipe view
   recipeView.update(model.state.recipe);
}




const init = function(){
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServing(controlServing);
searchView.addHandlerSearch(controlSearchResult);
paginationView.addHandlerClick(controlPagination);

};

init()



