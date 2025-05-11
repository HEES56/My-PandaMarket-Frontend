import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export function fromNow(time: string | Date): string {
  return dayjs(time).fromNow();
}

export function formatTime(
  time: string | Date,
  format: string = "YYYY.MM.DD h:mm A"
): string {
  return dayjs(time).format(format);
}

export function formatDay(
  time: string | Date,
  format: string = "YYYY.MM.DD"
): string {
  return dayjs(time).format(format);
}

export function getImageUrl(url?: string | null): string {
  const SERVER_URL = process.env.NEXT_PUBLIC_ARL_LOCAL_URL!;

  if (!url || url.trim() === "") {
    return "/baseImg.png";
  }

  if (url.startsWith("http:") || url.startsWith("https:")) {
    return url;
  }

  if (url.startsWith("/uploads/")) {
    return `${SERVER_URL}${url}`;
  }

  return url;
}
