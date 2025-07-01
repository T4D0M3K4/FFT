import React, {useEffect, useState} from "react";
import api from "../../API/API";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        CATEGORY_NAME: '',
        CATEGORY_TYPE: 'Transaction'
    });

    const loadCategories = async () => {
        await api.get('/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        await api.post('/categories', newCategory);
        setNewCategory({
            CATEGORY_NAME: '',
            CATEGORY_TYPE: 'Transaction'
        });
        loadCategories();
    };

    const handleDelete = async (id) => {
        await api.delete(`/categories/${id}`);
        loadCategories();
    }

    return(
        <div>
            <h2>Categories</h2>
            <form onSubmit={handleCreate}>
                <input type="text" placeholder="Category Name" value={newCategory.CATEGORY_NAME} onChange={(e) => setNewCategory({...newCategory, CATEGORY_NAME: e.target.value})} required/>
                <select value={newCategory.CATEGORY_TYPE} onChange={(e) => setNewCategory({...newCategory, CATEGORY_TYPE: e.target.value})}>
                    <option value="Transaction">Transaction</option>
                    <option value="Budget">Budget</option>
                </select>
            </form>
            <ul>
                {categories.map(category =>
                    <li key={category.CATEGORY_ID}>
                        {category.CATEGORY_NAME} ({category.CATEGORY_TYPE})
                        <button onClick={() => handleDelete(category.CATEGORY_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Categories;