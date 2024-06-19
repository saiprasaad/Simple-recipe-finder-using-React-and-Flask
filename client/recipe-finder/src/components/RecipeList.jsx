import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Recipe } from "../models/Recipe";

export function RecipeList() {
    const { ingredient } = useParams();
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    async function fetchRecipes() {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/get-recipes?category=${ingredient}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                const recipeData = response.data.meals.map(recipe => new Recipe(recipe.strMeal, recipe.strMealThumb, recipe.idMeal));
                setRecipes(recipeData);
            } else if (response.status === 401 || response.status === 422) {
                navigate("/login")
            }
        } catch (error) {
            navigate("/login")
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [])

    return <div className="container">{recipes.length > 0 && <><p className="display-4">Showing results for: {ingredient}</p>
        <div className="row">
            {recipes.map(recipe => {
                return (<div className="col-4 p-4"> <div className="card" style={{ width: "18rem;" }}>
                    <img className="card-img-top" src={recipe.recipeImg} />
                    <div className="card-body">
                        <h5 className="card-title">{recipe.recipeName}</h5>
                        <Link to={`/recipe-details/${recipe.recipeId}`}><button className="btn btn-dark">Get Recipe Details</button></Link>
                    </div>
                </div>
                </div>);

            })}
        </div>
    </>
    }
    </div>
}