export type ClientReview = {
  id: string;
  clientName: string;
  clientRole: string;
  companyOrOrg?: string;
  projectName: string;
  projectSlug?: string;
  rating: number; // 1 to 5
  date: string;
  highlight: string;
  review: string;
  verified: boolean;
  metric?: string;
};

// Real client reviews will appear here once submitted and verified.
export const reviews: ClientReview[] = [];

export const reviewSummary = {
  averageRating: 5.0,
  totalReviews: 0,
  onTimeDelivery: "100%",
  clientSatisfaction: "100%",
};
