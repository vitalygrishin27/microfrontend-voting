const actionTypes = {
    JURIES_LOAD_START: 'JURIES_LOAD_START',
    JURIES_LOAD_SUCCESS: 'JURIES_LOAD_SUCCESS',
    JURIES_LOAD_ERROR: 'JURIES_LOAD_ERROR',

    JURY_CREATE_START: 'JURY_CREATE_START',
    JURY_CREATE_SUCCESS: 'JURY_CREATE_SUCCESS',
    JURY_CREATE_ERROR: 'JURY_CREATE_ERROR',

    JURY_UPDATE_START: 'JURY_UPDATE_START',
    JURY_UPDATE_SUCCESS: 'JURY_UPDATE_SUCCESS',
    JURY_UPDATE_ERROR: 'JURY_UPDATE_ERROR',

    JURY_DELETE_START: 'JURY_DELETE_START',
    JURY_DELETE_SUCCESS: 'JURY_DELETE_SUCCESS',
    JURY_DELETE_ERROR: 'JURY_DELETE_ERROR',

    CHANGE_SELECTED_CONTESTS: 'CHANGE_SELECTED_CONTESTS',
    UPDATE_SELECTED_CONTESTS_LIST: 'UPDATE_SELECTED_CONTESTS_LIST',
    CLEAR_SELECTED_CONTESTS: 'CLEAR_SELECTED_CONTESTS',

    CHANGE_TOAST_SHOWING: 'CHANGE_TOAST_SHOWING'
}

export default actionTypes;