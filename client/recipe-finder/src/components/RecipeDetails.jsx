import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeDetail } from "../models/RecipeDetail";

export function RecipeDetails() {
    const { recipeId } = useParams();
    const [recipeDetail, setRecipeDetail] = useState();
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    async function fetchRecipeDetails() {
        console.log("Hello")
        try {
            const response = await axios.get(`http://127.0.0.1:5000/get-recipe-details?id=${recipeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            console.log(response)
            if(response.status === 200) {
                const recipeData = response.data.meals[0];
                setRecipeDetail(new RecipeDetail(recipeData.idMeal, recipeData.strMeal, recipeData.strMealThumb, recipeData.strInstructions));
            } else if(response.status === 401 || response.status === 422) {
                navigate("/login")
            }
        }
        catch(error) {
            navigate("/login")
        }

    }

    useEffect(() => {
        fetchRecipeDetails();
    }, []);

    return <div className="container">
        <p className="display-4 text-center">Recipe Details</p>
        <br />
        {recipeDetail && 
        <div className="row">
            <div className="col-6">
                <img src={recipeDetail.recipeImg} width={500} height={500}/>
            </div>
            <div className="col-6">
                <div className="row">
                    <h4>{recipeDetail.recipeName}</h4>
                </div>
                <div className="row">
                    <p>{recipeDetail.recipeInstruction}</p>
                </div>
            </div>
        </div>
    }
    </div>
}