import CriteriaService from "../../../services/criteria.service"
import actions from "./criteria.actions"
import categoryActions from "../categories/category.actions";


export const loadCriteriaAsync = () => (dispatch) => {
    dispatch(categoryActions.clearSelectedCriteria())

    CriteriaService.getAllCriteria()
        .then(response => dispatch(actions.criteriaLoadSuccess(response.data)))
        .catch(error => dispatch(actions.criteriaLoadError(error.response.data ? error.response.data : error.message)))
};

export const updateCriteriaAsync = (criteria) => (dispatch) => {
    dispatch(actions.criteriaUpdateStart(criteria))

    CriteriaService.updateCriteria(criteria)
        .then(response => dispatch(actions.criteriaUpdateSuccess(criteria)))
        .catch(error => dispatch(actions.criteriaUpdateError(error.response.data ? error.response.data : error.message)))
};

export const deleteCriteriaAsync = (criteria) => (dispatch) => {
    dispatch(actions.criteriaDeleteStart(criteria))
    CriteriaService.deleteCriteria(criteria.id)
        .then(response => dispatch(actions.criteriaDeleteSuccess(criteria)))
        .catch(error => dispatch(actions.criteriaDeleteError(error.response.data ? error.response.data : error.message)))
};

export const createCriteriaAsync = (criteria) => (dispatch) => {
    dispatch(actions.criteriaCreateStart(criteria))

    CriteriaService.createCriteria(criteria)
        .then(response => {
            criteria.id = response.data;
            dispatch(actions.criteriaCreateSuccess(criteria))
        })
        .catch(error => dispatch(actions.criteriaCreateError(error.response.data ? error.response.data : error.message)))
};

export const setToastShowing = (flag) => (dispatch) => {
    dispatch(actions.setToastShowing(flag))
};