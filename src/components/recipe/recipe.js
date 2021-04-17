import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Recipe extends Component {
    state = {
        activeRecipe: []
    };

    componentDidMount = async () => {
        console.log(this.props)
        const title = this.props.location.state.recipe;
        const request = await fetch(`https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=${title}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "c1be953602msh45a492b5f15b51cp137872jsn4e7d27d70353",
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com"
            }
        });

        const response = await request.json();
        const results = response.results.map((item, i) => {
            return {
                publisher: item.title.split(" ")[0] + " Jack",
                f2f_url: "",
                ingredients: [
                    "1 1/2 cups shredded rotisserie chicken",
                    "1 1/2 cups grated Gruyre",
                    "1 cup frozen peas",
                    "2 sheets (one 17.25-ounce package) frozen puff pastry, thawed",
                    "1 large egg, beaten",
                    "1/4 cup Dijon mustard "
                ],
                title: item.title,
                publisher_url: item.href,
                social_rank: 99.84842829206659,
                image_url: item.thumbnail,
                recipe_id: i,
                source_url: item.href
            }
        });
        this.setState({
            activeRecipe: results[0],
        });
    };

    render() {
        const recipe = this.state.activeRecipe;
        return (
            <div className="container">
                {
                    recipe.length !== 0 &&
                    <div className="active-recipe">
                        <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title}/>
                        <h3 className="active-recipe__title">{recipe.title}</h3>
                        <h4 className="active-recipe__publisher">Publisher: <span>{recipe.publisher}</span></h4>
                        <p className="active-recipe__website">
                            Website: <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                        </p>
                        <button className="active-recipe__button"><Link to="/">Go home</Link></button>
                    </div>
                }
            </div>
        );
    }
}

export default Recipe;