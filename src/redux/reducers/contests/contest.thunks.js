import ContestService from "../../../services/contest.service"
import actions from "./contest.actions"

export const loadContestsAsync = () => (dispatch) => {
    dispatch(actions.contestLoadStart())

    ContestService.getAllContests()
        .then(response => {
            dispatch(actions.contestLoadSuccess(response.data))
        })
        .catch(error => dispatch(actions.contestLoadError(error.response.data ? error.response.data : error.message)))
};

export const updateContestAsync = (contest) => (dispatch) => {
    dispatch(actions.contestUpdateStart(contest))

    ContestService.updateContest(contest)
        .then(response => dispatch(actions.contestUpdateSuccess(contest)))
        .catch(error => dispatch(actions.contestUpdateError(error.response.data ? error.response.data : error.message)))
};

export const deleteContestAsync = (contest) => (dispatch) => {
    dispatch(actions.contestDeleteStart(contest))

    ContestService.deleteContest(contest.id)
        .then(response => dispatch(actions.contestDeleteSuccess(contest)))
        .catch(error => dispatch(actions.contestDeleteError(error.response.data ? error.response.data : error.message)))
};

export const createContestAsync = (contest) => (dispatch) => {
    dispatch(actions.contestCreateStart(contest))

    ContestService.createContest(contest)
        .then(response => dispatch(actions.contestCreateSuccess(contest)))
        .catch(error => dispatch(actions.contestCreateError(error.response.data ? error.response.data : error.message)))
};

export const changeSelectedCategories = (changeCategories) => (dispatch) => {
    dispatch(actions.changeSelectedCategories(changeCategories))
};

export const updateSelectedCategoriesList = (data) => (dispatch) => {
    dispatch(actions.updateSelectedCategoriesList(data))
};


export const clearSelectedCategories = () => (dispatch) => {
    dispatch(actions.clearSelectedCategories())
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};