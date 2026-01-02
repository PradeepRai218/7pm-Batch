const { default: axios } = require("axios");
let apiBaseUrl = process.env.NEXT_PUBLIC_BASEURL;
let singleProduct=async(slug)=>{

    return  axios.get(`${apiBaseUrl}product/product-details/${slug}`)
    .then((res)=>res.data)
    .then((finalRes)=>{
        return finalRes;
    })  


}
module.exports={singleProduct};