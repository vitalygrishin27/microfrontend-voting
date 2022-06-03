import actions from "./performance.actions"
import contestActions from "../contests/contest.actions"
import PerformanceService from "../../../services/performance.service";

export const loadPerformancesByContestAsync = (contestId) => (dispatch) => {
    PerformanceService.getAllCPerformancesByContest(contestId)
        .then(response => dispatch(actions.performancesLoadSuccess(response.data)))
        .catch(error => dispatch(actions.performancesLoadError(error.response.data ? error.response.data : error.message)))
};

export const resortPerformances = (performances) => (dispatch) => {
    dispatch(actions.resortPerformances(performances))
};

export const savePerformancesOrder = (performances) => (dispatch) => {
    dispatch(actions.performancesSaveOrderStart())
    PerformanceService.performancesOrderSave(performances)
        .then(response => dispatch(actions.performancesSaveOrderSuccess()))
        .catch(error => dispatch(actions.performancesSaveOrderError(error.response.data ? error.response.data : error.message)))
};

export const submitPerformanceToAssessment = (contest, performance) => (dispatch) => {
    dispatch(actions.submitPerformanceToAssessment())

    PerformanceService.submitPerformanceToAssessment(contest.id, performance)
        .then(response => {
            dispatch(actions.submitPerformanceToAssessmentSuccess(response.data))
            dispatch(contestActions.submitPerformanceToAssessmentSuccess(response.data))
        })
        .catch(error => dispatch(actions.submitPerformanceToAssessmentError(error.response.data ? error.response.data : error.message)))
};

export const removePerformanceToAssessment = (contest) => (dispatch) => {
    dispatch(actions.submitPerformanceToAssessment())

    PerformanceService.removePerformanceToAssessment(contest.id)
        .then(response => {
            dispatch(actions.submitPerformanceToAssessmentSuccess(response.data))
            dispatch(contestActions.submitPerformanceToAssessmentSuccess(response.data))
        })
        .catch(error => dispatch(actions.submitPerformanceToAssessmentError(error.response.data ? error.response.data : error.message)))
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};