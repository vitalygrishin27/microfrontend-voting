import MemberService from "../../../services/member.service"
import actions from "./member.actions"

export const loadMembersAsync = () => (dispatch) => {
    dispatch(actions.memberLoadStart())

    MemberService.getAllMembers()
        .then(response => dispatch(actions.memberLoadSuccess(response.data)))
        .catch(error => dispatch(actions.memberLoadError(error.response.data?error.response.data:error.message)))
};

export const updateMemberAsync = (member) => (dispatch) => {
    dispatch(actions.memberUpdateStart(member))

    MemberService.updateMember(member)
        .then(response => dispatch(actions.memberUpdateSuccess(member)))
        .catch(error => dispatch(actions.memberUpdateError(error.response.data?error.response.data:error.message)))
};

export const deleteMemberAsync = (member) => (dispatch) => {
    dispatch(actions.memberDeleteStart(member))

    MemberService.deleteMember(member.id)
        .then(response => dispatch(actions.memberDeleteSuccess(member)))
        .catch(error => dispatch(actions.memberDeleteError(error.response.data?error.response.data:error.message)))
};

export const createMemberAsync = (member) => (dispatch) => {
    dispatch(actions.memberCreateStart(member))

    MemberService.createMember(member)
        .then(response => {
           //Add Id from response
            member.id = 1;
            dispatch(actions.memberCreateSuccess(member))
        })
        .catch(error => dispatch(actions.memberCreateError(error.response.data?error.response.data:error.message)))
};

export const changeSelectedPerformances = (changePerformances) => (dispatch) => {
    dispatch(actions.changeSelectedPerformances(changePerformances))
};

export const updateSelectedPerformancesList = (performances) => (dispatch) => {
    dispatch(actions.updateSelectedPerformancesList(performances))
};

export const updateSelectedPerformance = (performance) => (dispatch) => {
    dispatch(actions.updateSelectedPerformance (performance))
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};