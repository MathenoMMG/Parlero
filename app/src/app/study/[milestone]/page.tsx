import React from 'react';
import MilestoneDetailClient from './MilestoneDetailClient';

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => ({
    milestone: id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ milestone: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const milestoneId = parseInt(resolvedParams.milestone);
  return <MilestoneDetailClient milestoneId={milestoneId} />;
}
