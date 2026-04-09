import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import DribbbleCard from "components/layout/search/dribbble-card";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 新的 All Work / Business Impact 页面不需要侧边栏
  // 直接返回 children，让页面自己控制布局
  return (
    <Suspense fallback={null}>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Suspense>
  );
}
