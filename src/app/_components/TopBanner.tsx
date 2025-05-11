import Image from "next/image";
import TopBannerImg from "@/shared/assets/Img/home-image/TopBannerImg.png";
import Button, { ButtonCategory } from "@/shared/components/button/Button";

export default function TopBanner() {
  return (
    <div className="flex  bg-custom-color-bg-blue">
      <div className="flex flex-col justify-between items-center gap-20 pt-20 xl:pt-36 xl:gap-0  max-w-6xl mx-auto xl:flex-row xl:justify-baseline xl:items-end">
        <div className="flex flex-col  pb-0 md:pb-18">
          <h1 className="text-4xl font-bold whitespace-nowrap leading-tight mb-8 max-md:mb-0">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </h1>

          <Button
            href={"/items"}
            size="py-3 px-28 "
            category={ButtonCategory.ROUND_ON}
          >
            구경하러 가기
          </Button>
        </div>
        <Image
          className="w-full xl:w-3/5"
          src={TopBannerImg}
          alt="상단 배너 이미지"
        />
      </div>
    </div>
  );
}
