import actionTypes from "./category.actionTypes"
import initialState from "./category.initialStates"

const categoryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CATEGORIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                categories: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CATEGORIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CATEGORIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                categories: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.CATEGORY_CREATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CATEGORY_CREATE_SUCCESS:
            const categoriesWithNewOne = state.categories
            categoriesWithNewOne.push(payload);
            return {
                ...state,
                categories: categoriesWithNewOne,
                isSaving: false,
                error: null,
                isToastShowing: true,
                selectedCriteria: []
            };
        case actionTypes.CATEGORY_CREATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.CATEGORY_UPDATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CATEGORY_UPDATE_SUCCESS:
            const updatedCategories = state.categories.map(category => category.id === payload.id ? payload : category);
            return {
                ...state,
                categories: updatedCategories,
                isSaving: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.CATEGORY_UPDATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.CATEGORY_DELETE_START:
            return {
                ...state,
                isDeleting: true,
                error: null,
            };
        case actionTypes.CATEGORY_DELETE_SUCCESS:
            const updatedCategoriesAfterDelete = state.categories.filter((category) => category.id !== payload.id);
            return {
                ...state,
                categories: updatedCategoriesAfterDelete,
                isDeleting: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.CATEGORY_DELETE_ERROR:
            return {
                ...state,
                isDeleting: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.UPDATE_SELECTED_CRITERIA_LIST:
            const needToSelectCriteria = []
            payload.currentCategory.criteria.forEach(item => {
                needToSelectCriteria.push(payload.criteria.find(criteria1 => criteria1.id === item.id))
            })
            return {
                ...state,
                selectedCriteria: needToSelectCriteria
            };
        case actionTypes.CHANGE_SELECTED_CRITERIA:
            let updatedCriteriaList = state.selectedCriteria;
            if (payload.checked) {
                updatedCriteriaList.push(payload.criteria);
            } else {
                updatedCriteriaList = updatedCriteriaList.filter((item) => item.id !== payload.criteria.id);
            }
            return {
                ...state,
                selectedCriteria: updatedCriteriaList
            };
        case actionTypes.CLEAR_SELECTED_CRITERIA:
            return {
                ...state,
                selectedCriteria: []
            };
        case actionTypes.CHANGE_TOAST_SHOWING:
            return {
                ...state,
                isToastShowing: payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;