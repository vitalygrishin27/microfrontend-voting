import actionTypes from './contest.actionTypes'

const contestLoadStart = () => ({
    type: actionTypes.CONTEST_LOAD_START
})

const contestLoadSuccess = (contests) => ({
    type: actionTypes.CONTEST_LOAD_SUCCESS,
    payload: contests
})

const contestLoadError = (error) => ({
    type: actionTypes.CONTEST_LOAD_ERROR,
    payload: error

})

const contestCreateStart = (contest) => ({
    type: actionTypes.CONTEST_CREATE_START,
    payload: contest
})

const contestCreateSuccess = (contest) => ({
    type: actionTypes.CONTEST_CREATE_SUCCESS,
    payload: contest
})

const contestCreateError = (error) => ({
    type: actionTypes.CONTEST_CREATE_ERROR,
    payload: error

})

const contestUpdateStart = (contest) => ({
    type: actionTypes.CONTEST_UPDATE_START,
    payload: contest
})

const contestUpdateSuccess = (contest) => ({
    type: actionTypes.CONTEST_UPDATE_SUCCESS,
    payload: contest
})

const contestUpdateError = (error) => ({
    type: actionTypes.CONTEST_UPDATE_ERROR,
    payload: error
})


const contestDeleteStart = (contest) => ({
    type: actionTypes.CONTEST_DELETE_START,
    payload: contest
})

const contestDeleteSuccess = (contest) => ({
    type: actionTypes.CONTEST_DELETE_SUCCESS,
    payload: contest
})

const contestDeleteError = (error) => ({
    type: actionTypes.CONTEST_DELETE_ERROR,
    payload: error
})

const changeSelectedCategories = (changeCategories) => ({
    type: actionTypes.CHANGE_SELECTED_CATEGORIES,
    payload: changeCategories
})

const clearSelectedCategories = () => ({
    type: actionTypes.CLEAR_SELECTED_CATEGORIES,
})

const updateSelectedCategoriesList = (data) => ({
    type: actionTypes.UPDATE_SELECTED_CATEGORIES_LIST,
    payload: data
})

const submitPerformanceToAssessmentSuccess = (data) => ({
    type: actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_SUCCESS,
    payload: data
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})

export default {
    contestLoadStart,
    contestLoadSuccess,
    contestLoadError,
    contestCreateStart,
    contestCreateSuccess,
    contestCreateError,
    contestUpdateStart,
    contestUpdateSuccess,
    contestUpdateError,
    contestDeleteStart,
    contestDeleteSuccess,
    contestDeleteError,
    changeSelectedCategories,
    updateSelectedCategoriesList,
    clearSelectedCategories,
    submitPerformanceToAssessmentSuccess,
    setToastShowing
}