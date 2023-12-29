import { async } from "regenerator-runtime";

export const state = {
    recipe:{}
};

export const loadRecipe = async function (id){
    
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      
        const data = await res.json();
        // console.log(data)
     
        const {recipe} = data.data;
        state.recipe={
         id:recipe.id,
         title:recipe.title,
         publisher:recipe.publisher,
         sourceUrl:recipe.source_url,
         serving:recipe.servings,
         cookingTime:recipe.cooking_time,
         ingredients:recipe.ingredients,
         image:recipe.image_url
        };
    
        // console.log(state.recipe)
        
    } catch (error) {
        alert(error)
    }

}