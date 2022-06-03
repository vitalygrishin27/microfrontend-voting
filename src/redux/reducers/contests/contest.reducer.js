import actionTypes from "./contest.actionTypes"
import initialState from "./contest.initialStates"

const contestReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CONTEST_LOAD_START:
            return {
                ...state,
                isLoading: true,
                contests: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CONTEST_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contests: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CONTEST_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                contests: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.CONTEST_CREATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CONTEST_CREATE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.CONTEST_CREATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.CONTEST_UPDATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CONTEST_UPDATE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.CONTEST_UPDATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.CONTEST_DELETE_START:
            return {
                ...state,
                isDeleting: true,
                error: null,

            };
        case actionTypes.CONTEST_DELETE_SUCCESS:
            const updatedContests = state.contests.filter((contest) => contest.id !== payload.id);
            //  return state;
            return {
                ...state,
                contests: updatedContests,
                isDeleting: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.CONTEST_DELETE_ERROR:
            return {
                ...state,
                isDeleting: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.UPDATE_SELECTED_CATEGORIES_LIST:
            const needToSelectCategories = []
            payload.currentContest.categories.forEach(item => {
                needToSelectCategories.push(payload.categories.find(category1 => category1.id === item.id))
            })
            return {
                ...state,
                selectedCategories: needToSelectCategories
            };
        case actionTypes.CHANGE_SELECTED_CATEGORIES:
            let updatedCategoriesList = state.selectedCategories;
            if (payload.checked) {
                updatedCategoriesList.push(payload.category);
            } else {
                updatedCategoriesList = updatedCategoriesList.filter((item) => item.id !== payload.category.id);
            }
            return {
                ...state,
                selectedCategories: updatedCategoriesList
            };
        case actionTypes.CLEAR_SELECTED_CATEGORIES:
            return {
                ...state,
                selectedCategories: []
            };
        case actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_SUCCESS:
            const updatedContestsList = state.contests.map(contest => contest.id === payload.id ? payload : contest);
            return {
                ...state,
                contests: updatedContestsList,
                isSaving: false,
                error: null,
                isToastShowing: true,
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

export default contestReducer;