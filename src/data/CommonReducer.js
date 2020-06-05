export const CommonReducer = (...reducers) => (storeData, action) => {
    for ( let i = 0; i < reducers.length; i++) {
        let newStore = reducers[i](storeData, action);
        if ( newStore !== storeData) {
            return newStore;
        }
    }
    return storeData;
}

/* 
    function combines multiple reducers into a single function 
    and asks each of them to handle actions. Reducers return new object when they modify 
    the contents of the data store
*/