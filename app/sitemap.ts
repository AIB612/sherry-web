import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";
import { portfolioItems } from "lib/portfolio-data";
import { productDetails } from "lib/product-details";
import { categories } from "lib/search-data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ["", "/search", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const workRoutes = portfolioItems.map((item) => ({
    url: `${baseUrl}/work/${item.id}`,
    lastModified: new Date().toISOString(),
  }));

  const productRoutes = productDetails.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionRoutes = categories
    .filter((c) => Boolean(c.id))
    .map((category) => ({
      url: `${baseUrl}/search/${category.id}`,
      lastModified: new Date().toISOString(),
    }));

  return [...routesMap, ...workRoutes, ...productRoutes, ...collectionRoutes];
}
