const isPromise = payload => ( typeof(payload) === "object" || typeof(payload) === "function") &&
    typeof(payload.then) === "function";

export const asyncActions = () => next => action => {
    if (isPromise(action.payload)) {
        action.payload.then(result => next({ ...action, payload: result}));
    } else {
        next(action);
    }
}

/* 
    isPromis is function, that checks whether an action's payload is a Promise, which it
    does by looking for function or objects that have a then function.
    
    asyncActions function will be used as data store middleware. It callst then on the Promise
    to wait for it to be resolved, at which point it uses the result to replace payload

    actions whose payloads are not a Promise are passed on immediately
*/