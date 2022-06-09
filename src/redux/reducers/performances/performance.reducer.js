import actionTypes from "./performance.actionTypes"
import initialState from "./performance.initialStates"
import {isNull} from "lodash";

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
        case actionTypes.REQUEST_ACTIVE_PERFORMANCE_ERROR:
            return {
                ...state,
                requestActivePerformanceError: payload,
            };
        case actionTypes.ADD_ACTIVE_TIMER:
            const updatedActiveTimers = state.activeTimers;
            updatedActiveTimers.push(payload)
            return {
                ...state,
                activeTimers: updatedActiveTimers,
            };
        case actionTypes.REMOVE_ACTIVE_TIMER:
            const updatedActiveTimersAfterRemoving = state.activeTimers;
            const index = updatedActiveTimersAfterRemoving.indexOf(payload);
            if (index > -1) {
                updatedActiveTimersAfterRemoving.splice(index); // 2nd parameter means remove one item only
            }
            return {
                ...state,
                activeTimers: updatedActiveTimersAfterRemoving,
            };
        case actionTypes.CLEAR_ACTIVE_TIMER:
            state.activeTimers.forEach(id => clearTimeout(id))
            return {
                ...state,
                activeTimers: [],
            };
        case actionTypes.UPDATE_ACTIVE_PERFORMANCE_DATA:
            let updatedPerformances = state.performances;
            if (!isNull(payload))
                updatedPerformances = state.performances.map(performance => performance.id === payload.id ? payload : performance);
            return {
                ...state,
                performances: updatedPerformances,
                activePerformance: payload
            };
        default:
            return state;
    }
};

export default performanceReducer;