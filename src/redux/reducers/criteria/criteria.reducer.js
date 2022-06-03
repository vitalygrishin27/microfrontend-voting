import actionTypes from "./criteria.actionTypes"
import initialState from "./criteria.initialStates"

const criteriaReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.CRITERIA_LOAD_START:
            return {
                ...state,
                isLoading: true,
                criteria: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CRITERIA_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                criteria: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.CRITERIA_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                criteria: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.CRITERIA_CREATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CRITERIA_CREATE_SUCCESS:
            const criteriaWithNewOne = state.criteria
            if (criteriaWithNewOne) {
                criteriaWithNewOne.push(payload);
            }
            return {
                ...state,
                criteria: criteriaWithNewOne,
                isSaving: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.CRITERIA_CREATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.CRITERIA_UPDATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.CRITERIA_UPDATE_SUCCESS:
            const updatedCriteria = state.criteria.map(criteria => criteria.id === payload.id ? payload : criteria);
            return {
                ...state,
                criteria: updatedCriteria,
                isSaving: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.CRITERIA_UPDATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.CRITERIA_DELETE_START:
            return {
                ...state,
                isDeleting: true,
                error: null,
            };
        case actionTypes.CRITERIA_DELETE_SUCCESS:
            const updatedCriteriaAfterDeleting = state.criteria.filter((criteria) => criteria.id !== payload.id);
            return {
                ...state,
                criteria: updatedCriteriaAfterDeleting,
                isDeleting: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.CRITERIA_DELETE_ERROR:
            return {
                ...state,
                isDeleting: false,
                error: payload,
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

export default criteriaReducer;