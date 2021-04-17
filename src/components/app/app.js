import React, {Component} from 'react';

import Form from "../form";
import Recipes from "../recipes";

class App extends Component {

    state = {
        recipes: [],
    };

    getRecipe = async (event) => {
        event.preventDefault();

        const recipeName = event.target.elements.recipeName.value;
        if (!recipeName) {
            return;
        }

        const api_call = await fetch(`https://recipe-puppy.p.rapidapi.com/?p=1&i=onions%2Cgarlic&q=${recipeName}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "c1be953602msh45a492b5f15b51cp137872jsn4e7d27d70353",
                "x-rapidapi-host": "recipe-puppy.p.rapidapi.com"
            }
        });

        const data = await api_call.json();
        const results = data.results.map((item, i) => {
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
            recipes: results,
        });
    };

    render() {
        const {recipes} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Recipe Search</h1>
                </header>

                <Form getRecipe={this.getRecipe}/>
                <Recipes recipes={recipes}/>
            </div>
        );
    }
}

export default App;