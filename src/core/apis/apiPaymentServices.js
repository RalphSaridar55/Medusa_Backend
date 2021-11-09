import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";


//Get client token
export const getClientToken = async () => {
    //console.log("DATA INSIDE API FUNCTION, ",data)
  return await getToken().then((x)=>{
      return apiUserServices.get(`/user/buyer/stripe-key`,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          //console.log(res.data.data.stripe_secret_key)
          return res.data.data.stripe_secret_key
      });
  });
};

//Place an order
export const placeOrder = async(data) =>{
    //console.log("DATA INSIDE API FUNCTION, ",data)
  return await getToken().then((x)=>{
      return apiUserServices.post(`/user/buyer/place-order`,data,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          console.log(res.data)
      });
  });
}

//Receive payment methods
export const getPaymentMethods = async() =>{
    //console.log("DATA INSIDE API FUNCTION, ",data)
  return await getToken().then((x)=>{
      return apiUserServices.get(`/user/buyer/payment-method`,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          let ar = [];
          res.data.data.map((item)=>{
              ar.push({label:item.payment_method,value:item.id})
          })
          return ar
      });
  });
}