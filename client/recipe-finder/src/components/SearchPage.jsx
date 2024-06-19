import { useState } from "react";
import { Link } from "react-router-dom";

export function SearchPage() {
    const [ingredient, setIngredient] = useState("");

    function handleInputChange(event) {
        setIngredient(event.target.value);
    }

    return <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="jumbotron text-center">
            <h1 className="display-4">Recipe Finder</h1>
            <p className="lead">Search Recipes by Ingredients</p>
            <hr className="my-4" />
            <div className="row">
                <div className="col-8">
                    <input type="text" className="form-control" placeholder="Enter ingredient name...." onChange={handleInputChange}/>
                </div>
                <div className="col-4">
                    <Link to = {`/recipes/${ingredient}`}><button className="btn btn-primary">Search</button></Link>
                </div>
            </div>
        </div>
    </div>


}