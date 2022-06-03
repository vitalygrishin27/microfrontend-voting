import actionTypes from "./jury.actionTypes"
import initialState from "./jury.initialStates"

const juryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.JURIES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                juries: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.JURIES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                juries: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.JURIES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                juries: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.JURY_CREATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.JURY_CREATE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.JURY_CREATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.JURY_UPDATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.JURY_UPDATE_SUCCESS:
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.JURY_UPDATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.JURY_DELETE_START:
            return {
                ...state,
                isDeleting: true,
                error: null,

            };
        case actionTypes.JURY_DELETE_SUCCESS:
            const updatedJuries = state.juries.filter((jury) => jury.id !== payload.id);
            //  return state;
            return {
                ...state,
                juries: updatedJuries,
                isDeleting: false,
                error: null,
                isToastShowing: true
            };
        case actionTypes.JURY_DELETE_ERROR:
            return {
                ...state,
                isDeleting: false,
                error: payload,
                isToastShowing: true
            };
        case actionTypes.UPDATE_SELECTED_CONTESTS_LIST:
            const needToSelectContests = []
            payload.currentJury.contests.forEach(item => {
                needToSelectContests.push(payload.contests.find(contest1 => contest1.id === item.id))
            })
            return {
                ...state,
                selectedContests: needToSelectContests
            };
        case actionTypes.CHANGE_SELECTED_CONTESTS:
            let updatedContestsList = state.selectedContests;
            if (payload.checked) {
                updatedContestsList.push(payload.contest);
            } else {
                updatedContestsList = updatedContestsList.filter((item) => item.id !== payload.contest.id);
            }
            return {
                ...state,
                selectedContests: updatedContestsList
            };
        case actionTypes.CLEAR_SELECTED_CONTESTS:
            return {
                ...state,
                selectedContests: []
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

export default juryReducer;