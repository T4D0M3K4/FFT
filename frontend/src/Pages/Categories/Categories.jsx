import React, {useEffect, useState} from "react";
import api from "../../API/API";
import Footer from "../../Components/Footer/Footer";

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
        <>
        <div className='container'>
            <h2>Create a New Category:</h2>
            <form onSubmit={handleCreate}>
                <label htmlFor="name">Category Name:</label>
                <input id="name" type="text" placeholder="Category Name" value={newCategory.CATEGORY_NAME} onChange={(e) => setNewCategory({...newCategory, CATEGORY_NAME: e.target.value})} required/>

                <label htmlFor="type">Category Type:</label>
                <select id="type" value={newCategory.CATEGORY_TYPE} onChange={(e) => setNewCategory({...newCategory, CATEGORY_TYPE: e.target.value})}>
                    <option value="Transaction">Transaction</option>
                    <option value="Budget">Budget</option>
                </select>
                <button type="submit">Add Category</button>
            </form><br /><hr />

            <h2>Current Categories:</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th></th>
                </tr>
                {categories.map(category => 
                    <tr id={category.CATEGORY_ID}>
                        <td>{category.CATEGORY_NAME}</td>
                        <td>{category.CATEGORY_TYPE}</td>
                        <td><button onClick={() => handleDelete(category.CATEGORY_ID)}>Delete</button></td>
                    </tr>
                )}
            </table>
        </div>
        <Footer/>
        </>
    );
};

export default Categories;