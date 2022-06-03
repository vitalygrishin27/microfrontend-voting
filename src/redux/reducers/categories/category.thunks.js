import actions from "./category.actions"
import CategoryService from "../../../services/category.service";

export const loadCategoriesAsync = () => (dispatch) => {
    dispatch(actions.categoriesLoadStart())

    CategoryService.getAllCategories()
        .then(response => dispatch(actions.categoriesLoadSuccess(response.data)))
        .catch(error => dispatch(actions.categoriesLoadError(error.response.data ? error.response.data : error.message)))
};

export const updateCategoryAsync = (category) => (dispatch) => {
    dispatch(actions.categoryUpdateStart(category))

    CategoryService.updateCategory(category)
        .then(response => dispatch(actions.categoryUpdateSuccess(category)))
        .catch(error => dispatch(actions.categoryUpdateError(error.response.data ? error.response.data : error.message)))
};

export const deleteCategoryAsync = (category) => (dispatch) => {
    dispatch(actions.categoryDeleteStart(category))

    CategoryService.deleteCategory(category.id)
        .then(response => dispatch(actions.categoryDeleteSuccess(category)))
        .catch(error => dispatch(actions.categoryDeleteError(error.response.data ? error.response.data : error.message)))
};

export const createCategoryAsync = (category) => (dispatch) => {
    dispatch(actions.categoryCreateStart(category))

    CategoryService.createCategory(category)
        .then(response => {
            category.id = response.data
            dispatch(actions.categoryCreateSuccess(category))
        })
        .catch(error => dispatch(actions.categoryCreateError(error.response.data ? error.response.data : error.message)))
};

export const changeSelectedCriteria = (changeCriteria) => (dispatch) => {
    dispatch(actions.changeSelectedCriteria(changeCriteria))
};

export const updateSelectedCriteriaList = (data) => (dispatch) => {
    dispatch(actions.updateSelectedCriteriaList(data))
};


export const clearSelectedCriteria = () => (dispatch) => {
    dispatch(actions.clearSelectedCriteria())
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};