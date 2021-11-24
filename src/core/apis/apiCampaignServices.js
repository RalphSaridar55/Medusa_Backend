import apiUserServices from './apiUserServices';
import { getToken } from "./apiUserServices";

//Get Campaigns
export const getCampaigns = async () => {
    return await getToken().then((x) => {
        return apiUserServices.get('/user/seller/campaign-list', {
            headers: {
                Authorization: x
            }
        }).then((res) => {
            return res.data.data.data
        });
    });
};

//Get Campaign Details
export const getCampaigndDetails = async (id) => {
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

//Get Campaign Details
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