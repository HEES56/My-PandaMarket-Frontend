import BottomBanner from "@/app/_components/BottomBanner";
import MiddleBanner from "@/app/_components/MiddleBanner";
import TopBanner from "@/app/_components/TopBanner";
import Layout from "@/shared/components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="mt-16">
          <TopBanner />
          <MiddleBanner />
          <BottomBanner />
        </div>
      </Layout>
    </>
  );
}
