import React, { useState, useEffect } from 'react';
import {
    _getElements,
    _createElement,
    _updateElement,
    _deleteElement
} from '../dataService/data.service';
import '../Styles/Form.css';

function FormIngredient() {
    const initialIngredient = { name: '', is_allergen: false };
    const [Ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState(initialIngredient);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        _getElements()
            .then(data => {
                setIngredients(data);
            }
            );
    }, []);

    function handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setCurrentIngredient(prevIngredient => ({ ...prevIngredient, [name]: value }));
    }

    function handleEdit(Ingredient) {
        setIsEditing(true);
        setCurrentIngredient(Ingredient);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditing) {
            _updateElement(currentIngredient)
                .then(data => {
                    setIngredients(data);
                    setCurrentIngredient(currentIngredient);
                    setIsEditing(false);
                    console.log(data);
                }
                );
        } else {
            _createElement(currentIngredient)
                .then(data => {
                    setIngredients(data);
                    setCurrentIngredient(initialIngredient);
                }
                );
        }
    }

    function handleDelete(ingredientId) {
        _deleteElement(ingredientId).then(
            data => {
                setIngredients(data);
            }
        );
    }

    function listRender() {
        return Ingredients.map(I => (
            <tr key={I.id}>
                <td>{I.name}</td>
                <td>{I.surname}</td>
                <td>{I.is_allergen ? 'Yes' : 'No'}</td>
                <td>
                    <button onClick={() => handleEdit(I)}>Edit</button>
                    <button onClick={() => handleDelete(I.id)}>Delete</button>
                </td>
            </tr>
        ));
    }

    function formRender() {
        return (
            <form className="form-inline" onSubmit={handleSubmit}>
                <div >
                    <label> Nom de l'ingredient</label>
                    <input
                        type='text'
                        name='name'
                        required
                        value={currentIngredient.name}
                        onChange={handleChange}
                    />

                </div>
                <div>
                    <label>Allergène
            <input
                            style={{ margin: '10px' }}
                            type='checkbox'
                            name='is_allergen'
                            value={Ingredients.is_allergen}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button>Submit</button>
            </form>
        );
    }
    return (
        <div>
            {formRender()}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Allergène</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{listRender()}</tbody>
            </table>
        </div>
    );
}

export default FormIngredient;
