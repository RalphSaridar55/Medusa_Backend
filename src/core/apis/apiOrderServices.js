import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//add to orderBook
export const addToOrderBook = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.post('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/add-to-orderBook',payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.message
        })
    })
}

//add value added services
export const addValueAddedServices = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.put('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/value-added-service',payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.message
        })
    })
}

//get orderBook
export const getOrderBook = async(type)=>{
    return await getToken().then((x)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/order-list?filter=${type}`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            //console.log("ORDER BOOK API:",res.data)
            return res.data.data
        })
    })
}

//get Order Details
export const getOrderDetails = async(id)=>{
    return await getToken().then((x)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/order-details/${id}`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            //console.log("ORDER BOOK API:",res.data)
            return res.data.data
        })
    })
}


//delete a certain Order 
export const deleteOrder = async(id)=>{
    return await getToken().then((x)=>{
        return apiUserServices.delete(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/add-to-orderBook/${id}`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            //console.log("ORDER BOOK API:",res.data)
            return res.data.message
        })
    })
}

//get Orders for sellers' side
export const getSellersOrder = async(id)=>{
    return await getToken().then((x)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/seller/order-list?status=${id}&page=1&limit=200`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            //console.log("ORDER BOOK API:",res.data)
            return res.data.data.data
        })
    })
}

