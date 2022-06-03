import actions from "./jury.actions"
import JuryService from "../../../services/jury.service";

export const loadJuriesAsync = () => (dispatch) => {
    dispatch(actions.juriesLoadStart())

    JuryService.getAllJuries()
        .then(response => dispatch(actions.juriesLoadSuccess(response.data)))
        .catch(error => dispatch(actions.juriesLoadError(error.response.data ? error.response.data : error.message)))
};

export const updateJuryAsync = (jury) => (dispatch) => {
    dispatch(actions.juryUpdateStart(jury))

    JuryService.updateJury(jury)
        .then(response => dispatch(actions.juryUpdateSuccess(jury)))
        .catch(error => dispatch(actions.juryUpdateError(error.response.data ? error.response.data : error.message)))
};

export const deleteJuryAsync = (jury) => (dispatch) => {
    dispatch(actions.juryDeleteStart(jury))

    JuryService.deleteJury(jury.id)
        .then(response => dispatch(actions.juryDeleteSuccess(jury)))
        .catch(error => dispatch(actions.juryDeleteError(error.response.data ? error.response.data : error.message)))
};

export const createJuryAsync = (jury) => (dispatch) => {
    dispatch(actions.juryCreateStart(jury))

    JuryService.createJury(jury)
        .then(response => {
            jury.id = response.data;
            dispatch(actions.juryCreateSuccess(jury))
        })
        .catch(error => dispatch(actions.juryCreateError(error.response.data ? error.response.data : error.message)))
};

export const changeSelectedContests = (changeContests) => (dispatch) => {
    dispatch(actions.changeSelectedContests(changeContests))
};

export const updateSelectedContestsList = (data) => (dispatch) => {
    dispatch(actions.updateSelectedContestsList(data))
};


export const clearSelectedContests = () => (dispatch) => {
    dispatch(actions.clearSelectedContests())
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};