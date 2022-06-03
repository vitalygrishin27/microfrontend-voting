import apiClient from "../helper/apiClient";

class CategoryService {
    getAllCategories = () => apiClient().get('/category');
    createCategory = (category) => apiClient().post('category', category);
    updateCategory = (category) => apiClient().put('category', category);
    deleteCategory = (id) => apiClient().delete('category/' + id);
}

export default new CategoryService();