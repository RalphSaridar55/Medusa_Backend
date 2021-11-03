import * as ROUTE_LIST from "./apis-list";
import * as apiServices from "./apiUserServices";
import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//Get Countries

export const getCountries = async() => {
    return await apiUserServices.get(`/${ROUTE_LIST.COUNTRIES}`).then((res) => {
          return res.data.data.map(option => ({ value: option.id, label: option.name }));      
      });
  };
//Get Addresses
export const getAddresses = async () => {
    return await getToken().then((x)=>{
        return apiUserServices.get('/user-address',{
            headers:{
                Authorization: x
            }
        }).then((res)=>{
            return res.data
        });
    });
  };
//Add Adresses
export const addAddress = async (data) => {
    console.log("DATA INSIDE API FUNCTION, ",data)
  return await getToken().then((x)=>{
      return apiUserServices.post(`/user-address`,data,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          console.log(res)
      });
  });
};
//Edit Adresses
export const editAddress = async (data) => {
    console.log("DATA INSIDE API FUNCTION, ",data)
  return await getToken().then((x)=>{
      return apiUserServices.put(`/user-address`,data,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          console.log(res)
      });
  });
};

//Delete Adresses
export const deleteAddresses = async (data) => {
    return await getToken().then((x)=>{
        return apiUserServices.delete('/user-address',{
            headers:{
                Authorization: x
            },
            data:data
        }).then((res)=>{
            //console.log(res)
        });
    });
  };
