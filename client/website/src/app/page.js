import Image from "next/image";
import Bannersection from "./Components/Home-components/Bannersection";
import Collection from "./Components/Home-components/Collection";
import Tabsection from "./Components/Home-components/Tabsection/Tabsection";
import Bgimfsection from "./Components/Home-components/Bgimfsection";
import Cardscroll from "./Components/Home-components/Cardscroll";
import Threedivsection from "./Components/Home-components/Threedivsection";
import Bottomslider from "./Components/Home-components/Bottomslider";
import { getProducttabsData } from "./api-services/homeServices";

export default async function Home() {

  let productData=await getProducttabsData(1);
  // console.log(productData);
  

  return (
    <div>
      <Bannersection/>
      <Collection/>
      <Tabsection productData={productData}/>
      <Bgimfsection/>
      <Cardscroll/>
      <Threedivsection/>
      <Bottomslider/>
    </div>
  );
}
