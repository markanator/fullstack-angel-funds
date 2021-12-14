/**
 * Model User
 *
 */
 export type User = {
  id: number
  fullName: string
  email: string
  password: string
  avatarUrl: string | null
  cust_id: string | null
  roles: string[]
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Project
 *
 */
export type Project = {
  id: number
  title: string
  description: string
  category: string
  image: string
  slug: string
  fundTarget: number
  currentFunds: number
  totalDonation_sum: number
  viewCount: number
  votePoints: number
  publishDate: Date
  targetDate: Date
  authorId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Donation
 *
 */
export type Donation = {
  id: number
  amount: number
  stripeCreatedAt: string
  stripeCustomerId: string
  stripeReceiptUrl: string
  donorId: number
  projectId: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Upvote
 *
 */
export type Upvote = {
  id: number
  value: number
  userId: number
  projectId: number
  createdAt: Date
  updatedAt: Date
}

type authorShortForm = {
  id: number;
  fullName: string;
  avatarUrl: string;
};

export type foundProject = Project & {
  author: authorShortForm;
  upvotes: Upvote[];
  donations: Donation[];
}

export type newProject = Project & {
  author: authorShortForm;
}