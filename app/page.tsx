"use client"
import Header from "./component/Header";
import Banner from "./component/Banner"
import Categories from "./category/Categories";
import GoToServices from "./component/GoToServices";
import GuidesToGrow from "./component/GuidesToGrow";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Categories/>
      <GoToServices/>
      <GuidesToGrow/>
    </div>
  );
}
