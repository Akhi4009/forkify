 import * as model from "./model.js";
 import recipeView from "./views/recipeView.js";
 
 import icons from 'url:../img/icons.svg';
 import 'core-js/stable';
 import 'regenerator-runtime/runtime'


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async ()=>{

try {
   const id = window.location.hash.slice(1);
  if(!id) return;
  recipeView.renderSpinner()

  // 1) Loading Recipe

  await model.loadRecipe(id);

  // Rendering recipe
  
  recipeView.render(model.state.recipe);
  
 
  } catch (error) {
  alert(error)
 }

}

 ['hashchange', 'load'].forEach(ev=>window.addEventListener(ev, controlRecipes))



