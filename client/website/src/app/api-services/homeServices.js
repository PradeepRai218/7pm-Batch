import axios from "axios";
let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
let getProducttabsData=async(type=null)=>{
   return  axios.get(`${apiBaseUrl}home-api/product-tabs`,{
        params:{    
            type
        }
   })
    .then((res)=>res.data)
    .then((finalRes)=>{
        return finalRes;
    })


}

export {getProducttabsData};