import actionTypes from "./member.actionTypes"
import initialState from "./member.initialStates"
import {isEmpty, isNull} from "lodash";

const memberReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.MEMBER_LOAD_START:
            return {
                ...state,
                isLoading: true,
                members: null,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.MEMBER_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                members: payload,
                error: null,
                isToastShowing: false,
            };
        case actionTypes.MEMBER_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                members: null,
                error: payload,
                isToastShowing: false,
            };
        case actionTypes.MEMBER_CREATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.MEMBER_CREATE_SUCCESS:
            //  const membersWithNewOne = state.members
            //    membersWithNewOne.push(payload);
            return {
                ...state,
                //     members: membersWithNewOne,
                isSaving: false,
                error: null,
                isToastShowing: true,
                selectedPerformances: []
            };
        case actionTypes.MEMBER_CREATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.MEMBER_UPDATE_START:
            return {
                ...state,
                isSaving: true,
                error: null,
            };
        case actionTypes.MEMBER_UPDATE_SUCCESS:
            const updatedMembers = state.members.map(member => member.id === payload.id ? payload : member);
            return {
                ...state,
                members: updatedMembers,
                isSaving: false,
                error: null,
                isToastShowing: true,
                selectedPerformances: []
            };
        case actionTypes.MEMBER_UPDATE_ERROR:
            return {
                ...state,
                isSaving: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.MEMBER_DELETE_START:
            return {
                ...state,
                isDeleting: true,
                error: null,
            };
        case actionTypes.MEMBER_DELETE_SUCCESS:
            const updatedMembersAfterDelete = state.members.filter((member) => member.id !== payload.id);
            return {
                ...state,
                members: updatedMembersAfterDelete,
                isDeleting: false,
                error: null,
                isToastShowing: true,
            };
        case actionTypes.MEMBER_DELETE_ERROR:
            return {
                ...state,
                isDeleting: false,
                error: payload,
                isToastShowing: true,
            };
        case actionTypes.CHANGE_SELECTED_PERFORMANCES:
            let updatedPerformances = state.selectedPerformances;
            if (payload.needToAdd) {
                updatedPerformances.push(payload.performance);
            } else {
                updatedPerformances = updatedPerformances.filter((item) => (!isNull(item.tempId) && item.tempId !== payload.performance.tempId) || (!isNull(item.id) && item.id !== payload.performance.id));
            }
            return {
                ...state,
                selectedPerformances: updatedPerformances
            };
        case actionTypes.UPDATE_SELECTED_PERFORMANCES_LIST:
            return {
                ...state,
                selectedPerformances: payload
            };
        case actionTypes.UPDATE_SELECTED_PERFORMANCE:
            const updatedPerformancesList = state.selectedPerformances.map(performance => payload.tempId === performance.tempId && performance.id === payload.id ? payload : performance);
            return {
                ...state,
                selectedPerformances: updatedPerformancesList,
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

export default memberReducer;