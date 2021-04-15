import * as actionTypes from './actionTypes';

const onChangeCasting = data => {
    return {
        type: actionTypes.CHANGE_CASTINGS,
        data,
    };
};

const onGetCasting = data => {
    return {
        type: actionTypes.GET_CASTINGS,
        data,
    };
};

// EXPORTS
export const changeCasting = data => dispatch => {
    dispatch(onChangeCasting(data));
};

export const getCasting = data => dispatch => {
    console.log('actions Casting', data)
    dispatch(onGetCasting(data));
};