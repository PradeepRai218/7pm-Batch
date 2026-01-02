// "use client"

import { singleProduct } from '@/app/api-services/productServices';
import React from 'react'
//Server Component ->Parameterized Route
//Client Component -> useSearchParams , useRouter , useState , useEffect =>use "use client"
export default async  function ProductDetails({params}) {
   let {slug}  =await params;


  let data=   await singleProduct(slug);
  
  return (
    <div>
        
    </div>
  )
}
