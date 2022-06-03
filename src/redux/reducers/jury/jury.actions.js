import actionTypes from './jury.actionTypes'

const juriesLoadStart = () => ({
    type: actionTypes.JURIES_LOAD_START
})

const juriesLoadSuccess = (contests) => ({
    type: actionTypes.JURIES_LOAD_SUCCESS,
    payload: contests
})

const juriesLoadError = (error) => ({
    type: actionTypes.JURIES_LOAD_ERROR,
    payload: error
})

const juryCreateStart = (contest) => ({
    type: actionTypes.JURY_CREATE_START,
    payload: contest
})

const juryCreateSuccess = (contest) => ({
    type: actionTypes.JURY_CREATE_SUCCESS,
    payload: contest
})

const juryCreateError = (error) => ({
    type: actionTypes.JURY_CREATE_ERROR,
    payload: error
})

const juryUpdateStart = (contest) => ({
    type: actionTypes.JURY_UPDATE_START,
    payload: contest
})

const juryUpdateSuccess = (contest) => ({
    type: actionTypes.JURY_UPDATE_SUCCESS,
    payload: contest
})

const juryUpdateError = (error) => ({
    type: actionTypes.JURY_UPDATE_ERROR,
    payload: error
})


const juryDeleteStart = (contest) => ({
    type: actionTypes.JURY_DELETE_START,
    payload: contest
})

const juryDeleteSuccess = (contest) => ({
    type: actionTypes.JURY_DELETE_SUCCESS,
    payload: contest
})

const juryDeleteError = (error) => ({
    type: actionTypes.JURY_DELETE_ERROR,
    payload: error
})

const changeSelectedContests = (changeContests) => ({
    type: actionTypes.CHANGE_SELECTED_CONTESTS,
    payload: changeContests
})

const clearSelectedContests = () => ({
    type: actionTypes.CLEAR_SELECTED_CONTESTS,
})

const updateSelectedContestsList = (data) => ({
    type: actionTypes.UPDATE_SELECTED_CONTESTS_LIST,
    payload: data
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

const actions = {
    juriesLoadStart,
    juriesLoadSuccess,
    juriesLoadError,
    juryCreateStart,
    juryCreateSuccess,
    juryCreateError,
    juryUpdateStart,
    juryUpdateSuccess,
    juryUpdateError,
    juryDeleteStart,
    juryDeleteSuccess,
    juryDeleteError,
    changeSelectedContests,
    updateSelectedContestsList,
    clearSelectedContests,
    setToastShowing
}

export default actions;