import * as ROUTE_LIST from "./apis-list";
import * as apiServices from "./apiUserServices";
import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//Get Replies for user (seller or buyer depends on token)
export const getChatReplies = async () => {
    return await getToken().then((x)=>{
        return apiUserServices.get('/user/negotiate-reply',{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            return res.data.data
        });
    });
  };
