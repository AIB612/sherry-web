"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TrackRecordView } from "components/track-record-view";

function TrackRecordContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "ALL";

  return <TrackRecordView initialCategory={category} />;
}

export default function TrackRecordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <TrackRecordContent />
    </Suspense>
  );
}
