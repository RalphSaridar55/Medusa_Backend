import * as FileSystem from 'expo-file-system';

export const documentBlobConverter = async(data) =>{
    let result = data.map(async(item)=>{
        const uri = FileSystem.documentDirectory+item.name;
  
        await FileSystem.copyAsync({
          from: item.uri,
          to: uri
        })
        let Blob = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' }); 

        return await Blob
    })
    return await result
}