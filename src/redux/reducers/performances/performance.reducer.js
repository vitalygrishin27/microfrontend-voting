import actionTypes from "./performance.actionTypes"
import initialState from "./performance.initialStates"

const performanceReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.PERFORMANCES_LOAD_START:
            return {
                ...state,
                isLoading: true,
                performances: null,
                error: null,
                isToastShowing: false,
                orderWasChanged: false,
            };
        case actionTypes.PERFORMANCES_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                performances: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.PERFORMANCES_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                criteria: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.PERFORMANCES_RESORT:
            let i = 1;
            payload.forEach(item => {
                item.turnNumber = i;
                i++;
            })
            return {
                ...state,
                performances: payload,
                orderWasChanged: true,
            };
        case actionTypes.PERFORMANCES_SAVE_ORDER_START:
            return {
                ...state,
                isSaving: true,
                isToastShowing: false,
                error: null,
            };
        case actionTypes.PERFORMANCES_SAVE_ORDER_SUCCESS:
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true,
                orderWasChanged: false,
            };
        case actionTypes.PERFORMANCES_SAVE_ORDER_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_START:
            return {
                ...state,
                isSaving: true,
                isToastShowing: false,
                error: null,
            };
        case actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_SUCCESS:
     /*       console.log("!!!!!!!!!!!!!!");
            console.log(payload);
            console.log(state.contests);
            const updatedContest= state.contests.map(contest => contest.id === payload.id ? payload : contest);
            console.log(updatedContest);*/
            return {
                ...state,
                isSaving: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_ERROR:
            return {
                ...state,
                isSaving: false,
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

export default performanceReducer;