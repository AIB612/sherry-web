import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getUnifiedWorkItem, unifiedWorkItems } from "lib/work-items";

export const alt = "Chenxue Branny work case study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return unifiedWorkItems.map((item) => ({
    id: item.id,
  }));
}

async function getImageDataUrl(imagePath?: string) {
  if (!imagePath) {
    return null;
  }

  try {
    const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
    const absolutePath = path.join(process.cwd(), "public", cleanPath);
    const buffer = await readFile(absolutePath);
    const ext = path.extname(cleanPath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : "image/jpeg";

    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const item = getUnifiedWorkItem(id);

  const title = item?.title ?? "Chenxue Branny";
  const subtitle = item?.subtitle ?? "AI & IT Expert";
  const category = item?.category ?? "Case Study";
  const imageUrl =
    (await getImageDataUrl(item?.image)) ??
    (await getImageDataUrl("/social-share-cover.jpg"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#050510",
          color: "white",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(3,3,8,0.92) 0%, rgba(3,3,8,0.72) 45%, rgba(3,3,8,0.38) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.16)",
                fontSize: 24,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {category}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 760,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 68,
                lineHeight: 1.02,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.3,
                color: "rgba(255,255,255,0.82)",
                marginBottom: 28,
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 24,
                color: "#7dd3fc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: "#2dd4bf",
                }}
              />
              Chenxue Branny | AI & IT Expert
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
