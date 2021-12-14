export interface IProjectDetails {
  getProjectBySlug: {
    __typename: string;
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    fundTarget: number;
    currentFunds: number;
    publishDate: string;
    targetDate: string;
    totalDonation_sum: number;
    viewCount: number;
    votePoints: number;
    slug: string;
    author: {
      __typename: string;
      fullName: string;
      avatarUrl: string;
      email: string;
    };
  };
}
