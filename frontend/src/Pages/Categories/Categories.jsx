import React, {useEffect, useState} from "react";
import api from "../../API/API";
import styles from './Categories.module.css';

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
        <div className={styles.container}>
            <h2>Categories</h2>
            <form className={styles.categoriesform} onSubmit={handleCreate}>
                <input className={styles.categoriesinput} type="text" placeholder="Category Name" value={newCategory.CATEGORY_NAME} onChange={(e) => setNewCategory({...newCategory, CATEGORY_NAME: e.target.value})} required/>
                <select className={styles.categoriesselect} value={newCategory.CATEGORY_TYPE} onChange={(e) => setNewCategory({...newCategory, CATEGORY_TYPE: e.target.value})}>
                    <option value="Transaction">Transaction</option>
                    <option value="Budget">Budget</option>
                </select>
                <button className={styles.categoriesbutton} type="submit">Add Category</button>
            </form>
            <ul className={styles.categoriesul}>
                {categories.map(category =>
                    <li className={styles.categoriesli} key={category.CATEGORY_ID}>
                        {category.CATEGORY_NAME} ({category.CATEGORY_TYPE})
                        <button className={styles.categoriesbutton} onClick={() => handleDelete(category.CATEGORY_ID)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Categories;