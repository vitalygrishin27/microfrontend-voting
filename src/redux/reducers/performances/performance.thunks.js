import actions from "./performance.actions"
import contestActions from "../contests/contest.actions"
import {isEmpty} from "lodash";
import {uid} from "uid";
import PerformanceService from "../../../services/performance.service";


const delay = 5000;

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

export const requestForActivePerformance = (contestId, performance) => (dispatch) => {
    dispatch(actions.requestActivePerformance())
    console.debug("Starting periodical calling server for updated marks. ContestId =" + contestId + ". Current performanceId =" + performance.id + ". Delay is = " + delay);
    let timerId = setTimeout(function request() {
        PerformanceService.getUpdatedPerformanceDate(contestId, performance)
            .then(response => {
                console.debug(response.data)
                if (!isEmpty(response.data)) {
                    dispatch(actions.updateActivePerformanceData(response.data))
                } else {
                    dispatch(actions.requestActivePerformanceError(uid()))
                }
                dispatch(actions.removeActiveTimer(timerId))
            })
            .catch(error => {
                console.debug(error.response.data)
                dispatch(actions.requestActivePerformanceError(error))
                dispatch(actions.removeActiveTimer(timerId))
                //need to add action to show error message to user because we don`t know how it is going periodical calls
            })
    }, delay);
    console.debug("created timer - " + timerId)
    dispatch(actions.addActiveTimer(timerId))
};

export const clearActiveTimers = () => (dispatch) => {
    dispatch(actions.clearActiveTimers())
};