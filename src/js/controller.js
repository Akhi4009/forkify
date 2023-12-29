 import * as model from "./model.js";
 import recipeView from "./views/recipeView.js";
 import searchView from "./views/searchView.js";
 import 'core-js/stable';
 import 'regenerator-runtime/runtime'


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
      // 1) Get search query
      const query = searchView.getQuery();
      if(!query) return;
      // console.log(query)
    
      // 2) Load search result
      await model.loadSearchResults(query) 
   
      // 3) Render Results
   
      console.log(model.state.search)
      
   } catch (error) {
      console.log(error)
   }
}


controlSearchResult()


const init = function(){
recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResult);
}

init()



