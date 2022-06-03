import actionTypes from './criteria.actionTypes'

const criteriaLoadStart = () => ({
    type: actionTypes.CRITERIA_LOAD_START
})

const criteriaLoadSuccess = (criteria) => ({
    type: actionTypes.CRITERIA_LOAD_SUCCESS,
    payload: criteria
})

const criteriaLoadError = (error) => ({
    type: actionTypes.CRITERIA_LOAD_ERROR,
    payload: error

})

const criteriaCreateStart = (criteria) => ({
    type: actionTypes.CRITERIA_CREATE_START,
    payload: criteria
})

const criteriaCreateSuccess = (criteria) => ({
    type: actionTypes.CRITERIA_CREATE_SUCCESS,
    payload: criteria
})

const criteriaCreateError = (error) => ({
    type: actionTypes.CRITERIA_CREATE_ERROR,
    payload: error

})

const criteriaUpdateStart = (criteria) => ({
    type: actionTypes.CRITERIA_UPDATE_START,
    payload: criteria
})

const criteriaUpdateSuccess = (criteria) => ({
    type: actionTypes.CRITERIA_UPDATE_SUCCESS,
    payload: criteria
})

const criteriaUpdateError = (error) => ({
    type: actionTypes.CRITERIA_UPDATE_ERROR,
    payload: error
})


const criteriaDeleteStart = (criteria) => ({
    type: actionTypes.CRITERIA_DELETE_START,
    payload: criteria
})

const criteriaDeleteSuccess = (criteria) => ({
    type: actionTypes.CRITERIA_DELETE_SUCCESS,
    payload: criteria
})

const criteriaDeleteError = (error) => ({
    type: actionTypes.CRITERIA_DELETE_ERROR,
    payload: error
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})
export default {
    criteriaLoadStart,
    criteriaLoadSuccess,
    criteriaLoadError,
    criteriaCreateStart,
    criteriaCreateSuccess,
    criteriaCreateError,
    criteriaUpdateStart,
    criteriaUpdateSuccess,
    criteriaUpdateError,
    criteriaDeleteStart,
    criteriaDeleteSuccess,
    criteriaDeleteError,
    setToastShowing
}