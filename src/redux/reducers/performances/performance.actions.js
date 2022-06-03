import actionTypes from './performance.actionTypes'

const performancesLoadStart = () => ({
    type: actionTypes.PERFORMANCES_LOAD_START
})

const performancesLoadSuccess = (performances) => ({
    type: actionTypes.PERFORMANCES_LOAD_SUCCESS,
    payload: performances
})

const performancesLoadError = (error) => ({
    type: actionTypes.PERFORMANCES_LOAD_ERROR,
    payload: error

})

const resortPerformances = (performances) => ({
    type: actionTypes.PERFORMANCES_RESORT,
    payload: performances

})

const performancesSaveOrderStart = () => ({
    type: actionTypes.PERFORMANCES_SAVE_ORDER_START,
})

const performancesSaveOrderSuccess = () => ({
    type: actionTypes.PERFORMANCES_SAVE_ORDER_SUCCESS,
})

const performancesSaveOrderError = (error) => ({
    type: actionTypes.PERFORMANCES_SAVE_ORDER_ERROR,
    payload: error

})

const submitPerformanceToAssessment = () => ({
    type: actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_START,
})

const submitPerformanceToAssessmentSuccess = (contest) => ({
    type: actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_SUCCESS,
    payload: contest
})

const submitPerformanceToAssessmentError = (error) => ({
    type: actionTypes.PERFORMANCES_SUBMIT_TO_ASSESSMENT_ERROR,
    payload: error
})

const setToastShowing = (flag) => ({
    type: actionTypes.CHANGE_TOAST_SHOWING,
    payload: flag
})
export default {
    performancesLoadStart,
    performancesLoadSuccess,
    performancesLoadError,
    resortPerformances,
    performancesSaveOrderStart,
    performancesSaveOrderSuccess,
    performancesSaveOrderError,
    submitPerformanceToAssessment,
    submitPerformanceToAssessmentSuccess,
    submitPerformanceToAssessmentError,
    setToastShowing
}