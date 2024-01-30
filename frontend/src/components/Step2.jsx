import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { useIngredientCreation } from "../contexts/IngredientCreationContext";

export default function Step2({ ingredient }) {
  const { setIngredientList, ingredientList } = useIngredientCreation();

  // eslint-disable-next-line no-unused-vars
  const [addIngredient, setAddIngredient] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [kcal, setKcal] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(ingredient);
  }, [ingredient]);
  const handleAddIngredient = () => {
    const ingredientToAdd = {
      index: ingredientList.length,
      name: ingredientName,
      quantity,
      unit,
      kcal,
      totalKcal: quantity * kcal,
      id: ingredient.find((i) => i.name === ingredientName)?.id,
    };
    setAddIngredient((prev) => [...prev, ingredientToAdd]);
    setIngredientList((prev) => [...prev, ingredientToAdd]);
  };
  const handleInputChange = (event, newInputValue) => {
    setIngredientName(newInputValue);
    const ingredientItem = ingredient.find(
      (item) => item.name === newInputValue
    );
    if (ingredientItem) {
      setKcal(ingredientItem.kcal);
      setUnit(ingredientItem.unit);
    }
  };
  /* const handleInputChange = (e) => {
    setIngredientName(e.target.value);
    const ingredientItem = ingredient.find(
      (item) => item.name === e.target.value
    );
    if (ingredientItem) {
      setKcal(ingredientItem.kcal);
      setUnit(ingredientItem.unit);
    }
  }; */
  const handleReset = () => {
    setIngredientName("");
    setQuantity("");
    setUnit("");
    setKcal("");
  };

  const handleDeleteIngredient = (id) => {
    setIngredientList(ingredientList.filter((object) => object.id !== id));
  };

  const combineHandler = async () => {
    handleReset();
    await handleAddIngredient();
  };

  return (
    <div>
      <h1>Step 2</h1>
      <Autocomplete
        value={ingredientName}
        onChange={handleInputChange}
        id="ingredient-autocomplete"
        options={ingredient.map((option) => option.name)}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        renderInput={(params) => <TextField {...params} label="Ingrédient" />}
      />
      <TextField
        className="quantity"
        id="Quantité"
        label="Quantité"
        helperText="Quantité requise pour la recette"
        variant="filled"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        name="quantity"
      />
      <TextField
        className="unit"
        id="Unité"
        label="Unité"
        helperText="L'unité de mesure de l'ingrédient"
        variant="filled"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        name=" unit"
      />
      <TextField
        className="kcal"
        id="Kcal"
        label="Kcal"
        variant="filled"
        value={kcal}
        name="kcal"
      />
      <Button onClick={() => combineHandler()}> Ajouter l'ingrédient</Button>
      <div className="ingredient-list">
        {ingredientList.map((item) => (
          <div key={item.index}>
            <span>{item.name}</span>
            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
            <span>{item.unit}</span>
            <button
              type="button"
              onClick={() => handleDeleteIngredient(item.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
Step2.propTypes = {
  ingredient: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      totalKcal: PropTypes.number.isRequired,
    })
  ).isRequired,
};
