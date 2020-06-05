import Axios from 'axios';
import { RestUrls } from './Urls';

export class RestDataSource {
    constructor(err_handler){
        this.err_handler = err_handler || (() => {});
    }
    GetData = async (dataType, params) => this.SendRequest("get", RestUrls[dataType], params);

    StoreData = (dataType, data) => this.SendRequest("post", RestUrls[dataType], {}, data);

    SendRequest = (method, url, params, data) => Axios.request({ method, url, params, data });
}

/* 
    The RestDataSource class uses Axios package to make HTTP request to the web service
    GetData is a Promise that is resolved when the response is received from the web service
*/