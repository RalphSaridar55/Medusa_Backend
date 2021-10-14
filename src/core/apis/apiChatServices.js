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
            let arra = [];
            res.data.data.map((item)=>{
                arra.push({label:item.negotiate_reply,value:item.id})
            })
            return arra
        });
    });
  };
