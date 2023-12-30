import { async } from "regenerator-runtime";
import {API_URL,RES_PER_PAGE} from "./config";
import { getJSON } from "./helper";

export const state = {
    recipe:{},
    search:{
        query:'',
        result:[],
        page:1,
        resultsPerPage:RES_PER_PAGE,
       
    },
    
};

export const loadRecipe = async function (id){
    
    try {
        const data = await getJSON(`${API_URL}${id}`)
        
       
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
        
    } catch (error) {
       throw error;
    }

}

export const loadSearchResults = async(query)=>{

    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
    //  console.log(data);

      state.search.result = data.data.recipes.map(rec=>{
            return {
                id:rec.id,
                title:rec.title,
                publisher:rec.publisher,
                image:rec.image_url
            }
        })
        // console.log(state.search.result)
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getSearchResultsPage = function(page= state.search.page){
    state.search.page = page;

    const start =(page-1) * state.search.resultsPerPage  // 0;
    const end = page * state.search.resultsPerPage; // 9
    const res = state.search.result.slice(start,end)
    // console.log(res)
    return res;
}

export const updateServing = function(newServing){
state.recipe.ingredients.forEach(ing=>{
    ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
    // newQut = oldQut*newServing/oldServing;
});

state.recipe.serving = newServing;

}