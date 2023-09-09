import { API_URL, MINIMUM_FETCH_TIME } from "./config";


export const timeOut = function(sec){

    return new Promise(function(_,reject) {
        setTimeout(() => {
            reject(new Error('Taking too Much Time'))
        },1000 * sec);
      })

}

export const getJson = async function(url){
    try{

        const res = await Promise.race([fetch(url),timeOut(MINIMUM_FETCH_TIME)]);
        const data = await res.json();
        if (!res.ok) throw new Error("This recipe does not exists");
    return data
    }
    catch(err){
throw (err)
    }
}

