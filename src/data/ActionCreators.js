import { ActionTypes, DataTypes } from './Types';
//import { data as phData } from './placeholderData';
import { RestDataSource } from './rest/RestDataSource';

const dataSource = new RestDataSource();

export const loadData = (dataType, params) => ({
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType, params)
                .then(response => ({
                    dataType,
                    data: response.data,
                    total: Number(response.headers["x-total-count"]),
                    params
                }))
});

export const setPageSize = newSize => ({
    type: ActionTypes.DATA_SET_PAGESIZE,
    payload: newSize
});

export const setSortProperty = newProp => ({
    type: ActionTypes.DATA_SET_SORT_PROPERTY,
    payload: newProp
});

export const placeOrder = order => ({
    type: ActionTypes.DATA_STORE,
    payload: dataSource.StoreData(DataTypes.ORDERS, order)
        .then(response => ({
            dataType: DataTypes.ORDERS,
            data: response.data
        }))
});

/* 
   when action object created by loadData function is received by the data store, the middleware 
   asyncActions will wait for the response to be received from the web service and 
   then pass on the action for normal processing.

   when the Promise is resolved by middleware, the action object that is sent to reducer will contain
   the value of the X-Total-Count header, which will give the data for pagination anvigation

   params property will contain the user
*/