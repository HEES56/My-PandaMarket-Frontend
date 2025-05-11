import Image from "next/image";
import MiddleImg1 from "@/shared/assets/Img/home-image/middleImg_01.png";
import MiddleImg2 from "@/shared/assets/Img/home-image/middleImg_02.png";
import MiddleImg3 from "@/shared/assets/Img/home-image/middleImg_03.png";

export default function MiddleBanner() {
  return (
    <div className="max-w-6xl mx-auto py-20">
      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <Image src={MiddleImg1} alt="인기 상품" className="w-full md:w-1/2" />
        <div className="text-left w-full ">
          <h2 className="text-custom-color-blue text-lg font-bold mb-4">
            Hot item
          </h2>
          <h1 className="text-4xl font-bold leading-tight">
            인기 상품을 <br /> 확인해 보세요
          </h1>
          <p className="text-lg mt-6">
            가장 HOT한 중고거래 물품을
            <br />
            판다마켓에서 확인해 보세요
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse  items-center gap-10 mb-20 ">
        <Image
          src={MiddleImg2}
          alt="검색 기능"
          className="w-1/2 max-md:w-full"
        />
        <div className="text-right w-full ">
          <h2 className="text-custom-color-blue text-lg font-bold mb-4">
            Search
          </h2>
          <h1 className="text-4xl font-bold leading-tight">
            구매를 원하는
            <br />
            상품을 검색하세요
          </h1>
          <p className="text-lg mt-6">
            구매하고 싶은 물품은 검색해서
            <br />
            쉽게 찾아보세요
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image
          src={MiddleImg3}
          alt="판매 상품 등록"
          className="w-1/2 max-md:w-full"
        />
        <div className="max-md:w-full text-left">
          <h2 className="text-custom-color-blue text-lg font-bold mb-4">
            Register
          </h2>
          <h1 className="text-4xl font-bold leading-tight">
            판매를 원하는
            <br />
            상품을 등록하세요
          </h1>
          <p className="text-lg mt-6">
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
    </div>
  );
}
