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


const requestActivePerformance = () => ({
    type: actionTypes.REQUEST_ACTIVE_PERFORMANCE,
})

const requestActivePerformanceError = (error) => ({
    type: actionTypes.REQUEST_ACTIVE_PERFORMANCE_ERROR,
    payload: error

})

const updateActivePerformanceData = (performance) => ({
    type: actionTypes.UPDATE_ACTIVE_PERFORMANCE_DATA,
    payload: performance
})

const addActiveTimer = (timerId) => ({
    type: actionTypes.ADD_ACTIVE_TIMER,
    payload: timerId
})

const removeActiveTimer = (timerId) => ({
    type: actionTypes.REMOVE_ACTIVE_TIMER,
    payload: timerId
})

const clearActiveTimers = () => ({
    type: actionTypes.CLEAR_ACTIVE_TIMER,
})

const actions = {
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
    setToastShowing,
    requestActivePerformance,
    requestActivePerformanceError,
    updateActivePerformanceData,
    addActiveTimer,
    removeActiveTimer,
    clearActiveTimers,
}

export default actions;