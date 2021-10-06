import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//get services
export const getServices = async() =>{
    return await getToken().then((x)=>{
        return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product-services',{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.data.data
        })
    })
}

//get Cargo type list
export const getCargoTypeList= async() =>{
    return await getToken().then((x)=>{
        return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/cargo-type-list',{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.data
        })
    })
}

//Seller post product
export const sellerPostProduct= async(payload) =>{
    return await getToken().then((x)=>{
        return apiUserServices.post('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product',payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data)
            return res.data.data
        })
    })
}

//Get variant types
export const getVarientTypes= async(id) =>{
    return await getToken().then((x)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/varient_type?category_id=${id}`,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.data)
            return res.data.data
        })
    })
}
