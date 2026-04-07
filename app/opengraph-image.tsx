import OpengraphImage from "components/opengraph-image";
export const dynamic = 'force-static'; // 👈 加上这一行，强制它静态化

export default async function Image() {
  return await OpengraphImage();
}
