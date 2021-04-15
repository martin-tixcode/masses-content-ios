import * as actionTypes from '@actions/actionTypes';
const initialState = {
    castings: [],
    castingsActive: [],
    castingsPending: [],
    castingsFinish: [],
};

export default (state = initialState, action = {}) => {
    console.log('reducer', action)
    switch (action.type) {
        case actionTypes.CHANGE_CASTINGS:
            return {
                ...state,
                // castings: action.data.castings,
                castingsActive: action.data.castingsActive,
                castingsPending: action.data.castingsPending,
                castingsFinish: action.data.castingsFinish,
            };
        case actionTypes.GET_CASTINGS:
            return {
                ...state,
                castings: action.data
            };

        default:
            return state;
    }
};
