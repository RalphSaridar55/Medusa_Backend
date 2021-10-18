import axios from "axios";
import base64 from "react-native-base64";
import * as SecureStore from "expo-secure-store";
// Create axios client, pre-configured with baseURL
const username = "cashmystock";
const password = "cashmystock@123";

export let APIKit = axios.create({
  baseURL: "https://ecomstgapi.appskeeper.in/cashmystock/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    language: "en",
    platform: "3",
    timezone: "+3",
    API_KEY: "1234",
    Authorization: "Basic " + base64.encode(username + ":" + password),
  },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const setToken = (token) => {
  return SecureStore.setItemAsync("secure_token", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("secure_token").then((tokenData) => {
    return (tokenData = `Bearer ${tokenData}`);
  });
};

export const isUserLoggedIn = async() => {
  let user = await getToken();
  //console.log("USER TOKEN STORED IS:",user)
  if (user.length<20){
    //console.log("FALSE");
    return false;
  }
  else {
    //console.log("TRUE")
    return true;
  }
  //return false
};

export const logout = async() => {
  await SecureStore.deleteItemAsync("secure_token");
  return "Logged out";
  //alert("logout");
};

export const userLogin = async (userInfo) => {
  return await APIKit.post("/user/login", userInfo).then((res) => {
    return res.data.data;
  });
};

export const verifyEmail = async (owner_email) => {
  return await APIKit.post("/user/forgot-password-details", {
    owner_email,
  }).then((res) => {
    return res.data.data;
  });
};

export const sendOtp = async (usernfo) => {
  return await APIKit.post("/user/forgot-password", usernfo)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error.response);
      setAuthorized(false);
      setLoading(false);
    });
};

export const sendEmailLink = async (owner_email) => {
  return await APIKit.post("/user/forgot-password", { owner_email }).then(
    (res) => {
      console.log("inside send email, ", res.data.message);
      return res.data.message;
    }
  );
};

export const verifyOtp = async (userOtpAndMobile) => {
  return await APIKit.get(
    "/user/verify-forgot-otp?" +
      "otp=" +
      userOtpAndMobile.otp +
      "&" +
      "owner_mobile_number=" +
      userOtpAndMobile.owner_mobile_number
  )
    .then((res) => {
      return res.data.statusCode;
    })
    .catch((error) => {
      return error.response;
    });
};

export const resetPass = async (mobile, newPass) => {
  await getToken().then((x) => {
    var payload = {
      token: x,
      owner_mobile_number: mobile,
      password: newPass,
    };
    return APIKit.post("/user/reset-password", payload).then((res) => {
      return res.data.data;
    });
  });
};

//Sub-Users
//get Sub-Users
export const getSubUsers = async () => {
  return await getToken().then((x) => {
   return APIKit.get("/user/sub-user", {
      headers: {
        Authorization: x,
      },
    }).then((x)=>{
      //console.log('pop', x)
      return  x.data.data
    })
  });
};

//Add a Sub-User
export const addSubUser = async (data) => {
  return await getToken().then((x) => {
    return APIKit.post("/user/sub-user",data,{
      headers:{
        Authorization:x
      },
    }).then((res) => {
      console.log(res.data.data);
      return res.data.message;
    });
  });
};

//Update Sub-user
export const updateSubUser = async (data) => {
  console.log("DATA FROM API, ",data)
  return await getToken().then((x) => {
    return APIKit.put("/user/sub-user", data,{
      headers:{
        Authorization: x,
      }
    }).then((res) => {
      console.log(res);
    });
  });
};

//Delete Sub-user
export const deleteSubUsers = async (id) => {
  return await getToken().then((x) => {
    return APIKit.delete(`/user/sub-user/${id}`, {
      headers:{
        Authorization:x
      }
    }).then((res) => {
      console.log(res);
    });
  });
};

//Get Role list
export const getRoleList = async () => {
 return await getToken().then((x) => {
    return APIKit.get("/user/role?pageNo=1&limit=1000&isOwnRole=true", {
      headers: {
        Authorization: x,
      }}).then((res) => {
      console.log("from api",res.data.data);
      return res.data
  });
  });
};

//Add Role
export const addRole = async (data) => {
  return await getToken().then((x) => {
     return APIKit.post("/user/role",data, {
       headers: {
         Authorization: x,
       }}).then((res) => {
       //console.log("from api",res.data.data);
       return res.data.message;
   });
   });
 };

 //Edit Role
 export const editRole = async (data) => {
   console.log("DATA: ",data)
   return await getToken().then((x) => {
      return APIKit.put("/user/role",data, {
        headers: {
          Authorization: x,
        }}).then((res) => {
        //console.log("from api",res.data.data);
        return res.data.message;
    });
    });
  };

//Delete Role
export const deleteRole = async (id) => {
  await getToken().then((x) => {
    return APIKit.delete(`/user/role/${id}`, {
      headers: {
        Authorization: x,
      }}).then((res) => {
      //console.log("from api",res.data.data);
      console.log("FROM THE FUNCTION DELETE: ",res.data.message)
      return res.data.message;
  });
});
}

//Get Specific Sub-User role
export const getUserRole = async (id) => {
  await getToken().then((x) => {
    var payload = {
      token: x,
    };
  });
  return APIKit.get(`/user/role/${id}`, payload).then((res) => {
    console.log(res);
  });
};

//get Permission List for role id
export const getPermissionsList = async (id) => {
  return await getToken().then((x) => {
    return APIKit.get("/user/permission?pageNo=1&limit=20000", {
      headers: {
        Authorization: x,
      }}).then((res) => {
      //console.log("from api",res.data.data.data);
      return res.data.data
      });
  });
};

//get details about role
export const getRoleDetails = async (id) =>{
  return await getToken().then((x)=>{
    return APIKit.get(`/user/role/${id}`,{
      headers:{
        Authorization: x,
      }}).then((res)=>{
      return res.data;
    })
  })
}

//Addresses
//Add Adresses

export const addAddress = async (data) => {
  return await getToken().then((x)=>{
      return APIKit.post('/user-address',data,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          console.log(res)
      });
  });
};
//Get Adresses

export const getAddresses = async () => {
  return await getToken().then((x)=>{
      return APIKit.get('/user-address',{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          console.log(res)
      });
  });
};

/* 
export const userAdress = async () =>{
  await getToken().then((x)=>{

  })
} */


//Get seller's products

export const getSellersOwnProducts = async () => {
  return await getToken().then((x)=>{
      return APIKit.get('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/product_list?limit=10000&page=1',{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          return res.data.data.data
      });
  });
};

//Update seller's chosen categories

export const updateSellersChosenCategories = async (payload) => {
  return await getToken().then((x)=>{
      return APIKit.put('https://ecomstgapi.appskeeper.in/cashmystock/api/v1/user/user-category-list',payload,{
          headers:{
              Authorization: x
          }
      }).then((res)=>{
          //console.log(`RESULT AFTER UPDATING THE CATEGORIES:` , res)
          return res.data.message
      });
  });
};


export default APIKit;
