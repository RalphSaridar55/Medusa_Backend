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

//Get all products for guests
export const getProducts = async(page)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/guest_product_list?limit=10&page=${page}`).then((res)=>{
            console.log("ccount; ",res.data.data.totalCount)
            return res.data.data
        })
}

//Post a new product
export const createProduct = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.post(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product`,payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message);
        })
    })
}

//Edit a product
export const editProduct = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.put(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product`,payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message);
        })
    })
}

//Delete, Block and Unblock product
export const blockOrDeleteProduct = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.put(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product-remove`,payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message);
            return res.data.message
        })
    })
}


//Add a variant for product
export const addVariant = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.post(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product-variant`,payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message);
        })
    })
}

//Edit a variant for product
export const editVariant = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.put(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product-variant`,payload,{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message);
        })
    })
}

//Upload Bulk 
export const uploadBulk = async(payload)=>{
    return await getToken().then((x)=>{
        return apiUserServices.post(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/import-product`,payload,{
             headers:{
                 'Content-Type':'multipart/form-data',
                 Authorization: x
             }
            /* headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json; ; charset=UTF-8' ,
                Authorization: x
            },
            mode: 'no-cors', */
        }).then((res)=>{
            console.log("RES FROM THE API:",res.data.message)
        })
    })
}

//Get Service Level
export const getServiceLevels = async()=>{
    return await getToken().then((x)=>{
        return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/service-level',{
             headers:{
                 Authorization: x
             }
        }).then((res)=>{
            return res.data.data;
        })
    })
}

//Get Service type 
export const getServiceType = async(id)=>{
    return await getToken().then((x)=>{
        return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/buyer/types-of-service/${id}`,{
             headers:{
                 Authorization: x
             }
        }).then((res)=>{
            return res.data.data;
        })
    })
}