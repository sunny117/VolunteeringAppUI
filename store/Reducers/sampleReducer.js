const sampleReducer = (state = {
    //initial state
}, action) => {
    switch (action.type) {
        case 'SAMPLE':
            return {
                ...state
            };
        default:
            return state;
    };
};

export default sampleReducer;