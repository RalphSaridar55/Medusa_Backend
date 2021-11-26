import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//Get Campaigns
export const getCampaigns = async (page) => {
    console.log("PAGE: ",page)
    return await getToken().then((x) => {
        return apiUserServices.get(`/user/seller/campaign-list?limit=50&page=${page}`, {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            console.log("DATA: ",res.data)
            return res.data.data.data
        });
    });
};

//Get Campaign Details
export const getCampaignDetails = async (id) => {
    return await getToken().then((x) => {
        return apiUserServices.get(`/user/seller/campaign-details?campaign_id=${id}`, {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            return res.data.data
        });
    });
};

//End Campaign
export const endCampaign = async (id) => {
    return await getToken().then((x) => {
        return apiUserServices.put(`/user/seller/end-campagin`,{campaign_id:id} , {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            return res.data.message
        });
    });
};

//Create Ad
export const createAd = async (payload) => {
    return await getToken().then((x) => {
        return apiUserServices.post(`/user/seller/create-ad`,payload , {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            return res.data.message
        });
    });
};

//Get Cost
export const getCost = async () => {
    return await getToken().then((x) => {
        return apiUserServices.get(`user/seller/campaign-cost-calculation`, {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            return res.data.data
        });
    });
};

//Get Categories 
export const getCategories = async() =>{
    return await getToken().then((x) => {
        return apiUserServices.get(`/user/seller/category-list`, {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            //console.log("RES: ",res.data.data)
            let arr =[]
            res.data.data.map((item)=>{
                arr.push({label:item.category_name,value:item.id})
            })
            return arr
        });
    });
}

//Get SubCategories 
export const getSubCategories = async(catid) =>{
    return await getToken().then((x) => {
        return apiUserServices.get('/user/seller/subCategory-list', {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            let arr =[]
            let filtered = res.data.data.filter((item)=>item.category_id === catid)
            filtered.map((item)=>{
                arr.push({label:item.sub_category_name,value:item.id})
            })

            return arr
        });
    });
}

//Get Products
export const getProducts = async(catid, subid) =>{
    console.log(`CAT: ${catid} SUB: ${subid}`)

    return await getToken().then((x) => {
        return apiUserServices.get(`/user/seller/product-list?category_id=${catid}&sub_category_id=${subid}&limit=500&page=1`, {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            let array = [];
            console.log("PRODUCTS: ",res.data.data.data);
            res.data.data.data.map((item)=>{
                array.push({value:item.id,label:item.product_name})
            })
            return array
        });
    });
}