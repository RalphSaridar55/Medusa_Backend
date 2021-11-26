export const payloadValidator = (payload) =>{
    console.log("MAP; ",payload)
    var message = null
    Object.keys(payload).map((item)=>{
        console.log("Item: ",payload[item])
        let value = payload[item]
        switch(typeof(value)){
            case 'number':
                if(value<1){
                    console.log("SHOUDL RED")
                    message = `${item.replace(/_/g," ")} value must be greater than 0`;
                    break;
                }
            case 'string':
                if(value.length<1){
                    message = `${item.replace(/_/g," ")} can't be empty`;
                    break;
                }
            case 'Array':
                if(value.length<1){
                    message = `please choose an option(s) for ${item.replace(/_/g," ")}`;
                    return;
                }
        }
        console.log("MESSAGE: ",message)
    })
    
    if(message!=null)
        return message
    return null
}