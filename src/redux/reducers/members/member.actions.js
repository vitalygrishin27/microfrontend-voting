import actionTypes from './member.actionTypes'

const memberLoadStart = () => ({
    type: actionTypes.MEMBER_LOAD_START
})

const memberLoadSuccess = (members) => ({
    type: actionTypes.MEMBER_LOAD_SUCCESS,
    payload: members
})

const memberLoadError = (error) => ({
    type: actionTypes.MEMBER_LOAD_ERROR,
    payload: error

})

const memberCreateStart = (member) => ({
    type: actionTypes.MEMBER_CREATE_START,
    payload: member
})

const memberCreateSuccess = (member) => ({
    type: actionTypes.MEMBER_CREATE_SUCCESS,
    payload: member
})

const memberCreateError = (error) => ({
    type: actionTypes.MEMBER_CREATE_ERROR,
    payload: error

})

const memberUpdateStart = (member) => ({
    type: actionTypes.MEMBER_UPDATE_START,
    payload: member
})

const memberUpdateSuccess = (member) => ({
    type: actionTypes.MEMBER_UPDATE_SUCCESS,
    payload: member
})

const memberUpdateError = (error) => ({
    type: actionTypes.MEMBER_UPDATE_ERROR,
    payload: error
})


const memberDeleteStart = (member) => ({
    type: actionTypes.MEMBER_DELETE_START,
    payload: member
})

const memberDeleteSuccess = (member) => ({
    type: actionTypes.MEMBER_DELETE_SUCCESS,
    payload: member
})

const memberDeleteError = (error) => ({
    type: actionTypes.MEMBER_DELETE_ERROR,
    payload: error
})

const changeSelectedPerformances = (changePerformances) => ({
    type: actionTypes.CHANGE_SELECTED_PERFORMANCES,
    payload: changePerformances
})

const updateSelectedPerformance = (performance) => ({
    type: actionTypes.UPDATE_SELECTED_PERFORMANCE,
    payload: performance
})

const updateSelectedPerformancesList = (performances) => ({
    type: actionTypes.UPDATE_SELECTED_PERFORMANCES_LIST,
    payload: performances
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})
export default {
    memberLoadStart,
    memberLoadSuccess,
    memberLoadError,
    memberCreateStart,
    memberCreateSuccess,
    memberCreateError,
    memberUpdateStart,
    memberUpdateSuccess,
    memberUpdateError,
    memberDeleteStart,
    memberDeleteSuccess,
    memberDeleteError,
    changeSelectedPerformances,
    updateSelectedPerformance,
    updateSelectedPerformancesList,
    setToastShowing
}