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

//Get chat list
export const getChatList = async (id) => {
    return await getToken().then((x)=>{
        return apiUserServices.get(`/user/negotiation?status=${id}&limit=1000&page=1`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            return res.data.data.data
        });
    });
  };


//Get chat for a specific 
export const getChatDetails = async (id) => {
    return await getToken().then((x)=>{
        return apiUserServices.get(`/user/negotiation-chat?product_id=${id}`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            return res.data.data
        });
    });
  };


//reply
export const replyTo = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.post('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/negotiation',payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.message
        })
    })
}

//Approve or Disapprove
export const approveOrDisapprove = async(payload) =>{
    return await getToken().then((x)=>{
        return apiUserServices.put('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/negotiation-status',payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.message
        })
    })
}