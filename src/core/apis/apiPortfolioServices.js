import * as ROUTE_LIST from './apis-list';
import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";


export const userSignContract= async() =>{
  return await getToken().then((x)=>{
    console.log("test;",x)
    return apiUserServices.put('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/contract-sign',null,{
      headers:{
        Authorization: x
      }
    }).then((res)=>{
          console.log('RES: ',res)
          //return res.data.message
      }).catch(err=>console.log("ERROR: ",err.response.data.message))
  })
}

//Get seller's own categories
export const getSellerCategories= async() =>{
  return await getToken().then((x)=>{
      return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/seller-category-filter',{
        headers:{
          Authorization: x
        }
      }).then((res)=>{
          return res.data.data
      })
  })
}

export async function getCountries () {
  return await apiUserServices.get(`${ROUTE_LIST.API_URL}/${ROUTE_LIST.COUNTRIES}`).then((res) => {
        let ar =[]
        res.data.data.map((option) => {ar.push({ value: option.id, label: option.name })});      
        return ar
      });
};

export async function getCategories (){
  return await apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/category').then((res)=>{
    //console.log("FROM THE API FUNCTION: ",res.data.data.data)
    return res.data.data.data
  })
}

export async function getProductDetails (id) {
  console.log('inside get prod details')
  return await getToken().then((x)=>{
    return apiUserServices.get(`https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product_details?product_id=${id}`,{
      headers:{
        Authorization:x
      }
    }).then((res) => {

      console.log('resp --> : ',res.data.data)
      return res.data.data
      });
  })
};

export async function updateUserProfile(data){
  return await getToken().then((x)=>{
    return apiUserServices.put('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/update-profile',data,{
      headers:{
        Authorization:x
      }
    }).then((res)=>{
      console.log("RES FROM THE API:",res.data)
      return res.data
    }).catch(err=>console.log("API ERROR: ",err))
  })
}

export async function getNotifications(){
  return await getToken().then((x)=>{
    return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/notification-list?limit=100&page=1',{
    headers:{
      Authorization:x
      }
    }).then((res)=>{
      console.log("RES FROM THE API:",res.data)
      return res.data.data.data.sort((a)=>a.read_status!=false)
    }).catch(err=>console.log("API ERROR: ",err))
  })
}

export async function readNotification(id){
  return await getToken().then((x)=>{
    return apiUserServices.patch('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/notification-read',id,{
    headers:{
      Authorization:x
      }
    }).then((res)=>{
      console.log("RES READ:",res.data)
    }).catch(err=>console.log("API ERROR: ",err.response.data.message))
  })
}


export async function getSellerActivityLogs(){
  return await getToken().then((x)=>{
    return apiUserServices.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/activity-logs',{
    headers:{
      Authorization:x
      }
    }).then((res)=>{
      console.log("RES READ:",res.data)
    }).catch(err=>console.log("API ERROR: ",err.response.data.message))
  })
}