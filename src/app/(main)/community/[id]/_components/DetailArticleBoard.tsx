import Image from "next/image";
import { useRouter } from "next/navigation";
import userIcon from "@/shared/assets/Img/user-icon/ic_profile.png";
import likeIcon from "@/shared/assets/Img/button-image/Like_Icon.png";
import { formatDay } from "@/lib/utill";
import Selector from "@/shared/components/dropDown/Selector";
import { Article } from "@/types/types";
import ImageWrapper from "@/shared/components/ImageWrapper/ImageWrapper";
import {
  useFavoriteArticle,
  useUnfavoriteArticle,
} from "@/api/article/articleHook";

interface DetailArticleBoardProps {
  article: Article;
}

export default function DetailArticleBoard({
  article,
}: DetailArticleBoardProps) {
  const router = useRouter();
  const likeMutation = useFavoriteArticle(article.id);
  const unlikeMutation = useUnfavoriteArticle(article.id);

  const isLiked = article.isLiked;

  const handleLikeToggle = () => {
    if (isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const handleDelete = () => {
    router.push("/article");
  };

  const handleEdit = () => {
    router.push(`/article/modify/${article.id}`);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 pb-4 border-b border-custom-color-border-gray">
        <section className="flex justify-between">
          <p className="text-xl font-bold text-custom-text-black-800">
            {article.title}
          </p>
          <Selector
            type="article"
            id={article.id}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </section>

        <section className="flex gap-4">
          <Image src={userIcon} alt="user" className="w-[40px]" />
          <div className="flex items-center gap-2 pr-4 md:pr-8 border-r border-custom-color-border-gray">
            <p className="text-sm text-custom-text-gray-400">
              {article.user?.nickname || "익명 판다"}
            </p>
            <p className="text-sm text-custom-text-gray-50">
              {formatDay(article.createdAt)}
            </p>
          </div>

          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 border border-custom-color-border-gray ml-4 md:ml-8 px-3 py-1 rounded-4xl"
          >
            <Image src={likeIcon} alt="like" className="w-[26px]" />
            <p>{article.favoriteCount ?? 0}</p>
          </button>
        </section>
      </div>

      <section className="flex gap-8">
        {article.imageUrls?.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {article.imageUrls.map((url, i) => (
              <ImageWrapper
                key={i}
                src={url}
                alt={`게시글 이미지 ${i + 1}`}
                width={200}
                height={150}
                className="rounded-md object-cover border"
              />
            ))}
          </div>
        )}
        <p className="text-lg pt-6 text-custom-text-black-800">
          {article.content}
        </p>
      </section>
    </div>
  );
}
