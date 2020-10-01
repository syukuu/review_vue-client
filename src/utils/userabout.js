import { v4 as uuidv4 } from 'uuid';
const getUserTempId = function(){
    // 如果有，就获取
    let userTempId = localStorage.getItem('USERTEMPID',userTempId)
    if(!userTempId){
        userTempId = uuidv4()
        userTempId = localStorage.setItem('USERTEMPID',userTempId)
    }
    return userTempId
}
export {getUserTempId}