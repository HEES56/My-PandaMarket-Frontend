import ClientLayout from "@/shared/components/Layout/ClientLayout";
import DetailArticle from "./_components/DetailArticle";

export const dynamic = "force-dynamic";

export default async function CommunityDetailPage() {
  return (
    <ClientLayout>
      <DetailArticle />
    </ClientLayout>
  );
}
