import actionTypes from './category.actionTypes'

const categoriesLoadStart = () => ({
    type: actionTypes.CATEGORIES_LOAD_START
})

const categoriesLoadSuccess = (categories) => ({
    type: actionTypes.CATEGORIES_LOAD_SUCCESS,
    payload: categories
})

const categoriesLoadError = (error) => ({
    type: actionTypes.CATEGORIES_LOAD_ERROR,
    payload: error

})

const categoryCreateStart = (category) => ({
    type: actionTypes.CATEGORY_CREATE_START,
    payload: category
})

const categoryCreateSuccess = (category) => ({
    type: actionTypes.CATEGORY_CREATE_SUCCESS,
    payload: category
})

const categoryCreateError = (error) => ({
    type: actionTypes.CATEGORY_CREATE_ERROR,
    payload: error

})

const categoryUpdateStart = (category) => ({
    type: actionTypes.CATEGORY_UPDATE_START,
    payload: category
})

const categoryUpdateSuccess = (category) => ({
    type: actionTypes.CATEGORY_UPDATE_SUCCESS,
    payload: category
})

const categoryUpdateError = (error) => ({
    type: actionTypes.CATEGORY_UPDATE_ERROR,
    payload: error
})


const categoryDeleteStart = (category) => ({
    type: actionTypes.CATEGORY_DELETE_START,
    payload: category
})

const categoryDeleteSuccess = (category) => ({
    type: actionTypes.CATEGORY_DELETE_SUCCESS,
    payload: category
})

const categoryDeleteError = (error) => ({
    type: actionTypes.CATEGORY_DELETE_ERROR,
    payload: error
})

const changeSelectedCriteria = (changeCriteria) => ({
    type: actionTypes.CHANGE_SELECTED_CRITERIA,
    payload: changeCriteria
})

const clearSelectedCriteria = () => ({
    type: actionTypes.CLEAR_SELECTED_CRITERIA,
})

const updateSelectedCriteriaList = (data) => ({
    type: actionTypes.UPDATE_SELECTED_CRITERIA_LIST,
    payload: data
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

const actions = {
    categoriesLoadStart,
    categoriesLoadSuccess,
    categoriesLoadError,
    categoryCreateStart,
    categoryCreateSuccess,
    categoryCreateError,
    categoryUpdateStart,
    categoryUpdateSuccess,
    categoryUpdateError,
    categoryDeleteStart,
    categoryDeleteSuccess,
    categoryDeleteError,
    changeSelectedCriteria,
    updateSelectedCriteriaList,
    clearSelectedCriteria,
    setToastShowing
}

export default actions;