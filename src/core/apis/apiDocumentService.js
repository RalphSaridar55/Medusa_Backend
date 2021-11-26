import apiUserServices from './apiUserServices';

export const uploadDoc = async(payload) =>{
    return await apiUserServices.post('/document-upload',payload).then((res) => {
        //console.log("RES DOC: ",res.data)
        return res.data.data
    });
}