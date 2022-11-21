import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateDonoInput = {
  amount: Scalars['Int'];
  customerEmail: Scalars['String'];
  projectSlug: Scalars['String'];
  stripeCreatedAt: Scalars['String'];
  stripeReceiptUrl: Scalars['String'];
};

export type CreateProjectInput = {
  category: Scalars['String'];
  currentFunds: Scalars['Float'];
  description: Scalars['String'];
  fundTarget: Scalars['Float'];
  image: Scalars['String'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
  title: Scalars['String'];
};

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  customerId: Scalars['String'];
  donor: User;
  donorId: Scalars['Int'];
  id: Scalars['Int'];
  project: Project;
  projectId: Scalars['Int'];
  status: DonationStatus;
  stripeCreatedAt: Scalars['String'];
  stripeReceiptUrl: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DonationResponse = {
  __typename?: 'DonationResponse';
  data?: Maybe<Donation>;
  errors?: Maybe<Array<FieldError>>;
};

export enum DonationStatus {
  Chargeback = 'CHARGEBACK',
  Disputed = 'DISPUTED',
  Failed = 'FAILED',
  FullRefund = 'FULL_REFUND',
  PartialRefund = 'PARTIAL_REFUND',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type EmailPasswordInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  deleteProject: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getUserById: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register?: Maybe<UserResponse>;
  syncStripeDono: DonationResponse;
  updateProject: ProjectResponse;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: EmailPasswordInput;
};


export type MutationSyncStripeDonoArgs = {
  order: CreateDonoInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['Int'];
  input: UpdateProjectInput;
};

export type Project = {
  __typename?: 'Project';
  _count?: Maybe<ProjectCount>;
  author: User;
  authorId: Scalars['Int'];
  category: Scalars['String'];
  createdAt: Scalars['DateTime'];
  currentFunds: Scalars['Int'];
  description: Scalars['String'];
  fundTarget: Scalars['Int'];
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  publishDate: Scalars['DateTime'];
  slug: Scalars['String'];
  targetDate: Scalars['DateTime'];
  title: Scalars['String'];
  totalDonation_sum: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
  votePoints?: Maybe<Scalars['Int']>;
  voteStatus?: Maybe<Scalars['Int']>;
};

export type ProjectCount = {
  __typename?: 'ProjectCount';
  donations: Scalars['Int'];
  upvotes: Scalars['Int'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type Query = {
  __typename?: 'Query';
  getAuthoredProjectById: ProjectResponse;
  getProjectBySlug?: Maybe<Project>;
  getProjectsByUserID?: Maybe<Array<Project>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  projects: Array<Project>;
};


export type QueryGetAuthoredProjectByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetProjectBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetProjectsByUserIdArgs = {
  id: Scalars['Int'];
};

export type UpdateProjectInput = {
  category: Scalars['String'];
  description: Scalars['String'];
  fundTarget: Scalars['Float'];
  image: Scalars['String'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  avatarUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  cust_id: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserCount = {
  __typename?: 'UserCount';
  donations: Scalars['Int'];
  projects: Scalars['Int'];
  upvotes: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FullUserDetailsFragment = { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any };

export type ProjectResponseNoAuthorFragment = { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string };

export type ProjectResponseWAuthorFragment = { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string, author: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string, author: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: EmailPasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } | null } | null };

export type SyncStripePaymentMutationVariables = Exact<{
  order: CreateDonoInput;
}>;


export type SyncStripePaymentMutation = { __typename?: 'Mutation', syncStripeDono: { __typename?: 'DonationResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, data?: { __typename?: 'Donation', id: number, amount: number, projectId: number, donorId: number, status: DonationStatus, stripeCreatedAt: string, stripeReceiptUrl: string, createdAt: any } | null } };

export type UpdateAuthoredProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
  updateProjectId: Scalars['Int'];
}>;


export type UpdateAuthoredProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, project?: { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string } | null } };

export type FetchAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string }> };

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } | null };

export type GetAuthoredProjectByIdQueryVariables = Exact<{
  getAuthoredProjectByIdId: Scalars['Float'];
}>;


export type GetAuthoredProjectByIdQuery = { __typename?: 'Query', getAuthoredProjectById: { __typename?: 'ProjectResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, project?: { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string } | null } };

export type GetbySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetbySlugQuery = { __typename?: 'Query', getProjectBySlug?: { __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string, author: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } } | null };

export type GetProjectsByUserIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProjectsByUserIdQuery = { __typename?: 'Query', getProjectsByUserID?: Array<{ __typename?: 'Project', id: number, title: string, description: string, category: string, image?: string | null, fundTarget: number, currentFunds: number, publishDate: any, targetDate: any, totalDonation_sum: number, viewCount: number, votePoints?: number | null, slug: string, author: { __typename?: 'User', id: number, fullName: string, avatarUrl: string, email: string, createdAt: any } }> | null };

export const ProjectResponseNoAuthorFragmentDoc = gql`
    fragment ProjectResponseNoAuthor on Project {
  id
  title
  description
  category
  image
  fundTarget
  currentFunds
  publishDate
  targetDate
  totalDonation_sum
  viewCount
  votePoints
  slug
}
    `;
export const FullUserDetailsFragmentDoc = gql`
    fragment FullUserDetails on User {
  id
  fullName
  avatarUrl
  email
  createdAt
}
    `;
export const ProjectResponseWAuthorFragmentDoc = gql`
    fragment ProjectResponseWAuthor on Project {
  id
  title
  description
  category
  image
  fundTarget
  currentFunds
  publishDate
  targetDate
  totalDonation_sum
  viewCount
  votePoints
  slug
  author {
    ...FullUserDetails
  }
}
    ${FullUserDetailsFragmentDoc}`;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    ...ProjectResponseWAuthor
  }
}
    ${ProjectResponseWAuthorFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      ...FullUserDetails
    }
  }
}
    ${FullUserDetailsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: EmailPasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...FullUserDetails
    }
  }
}
    ${FullUserDetailsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SyncStripePaymentDocument = gql`
    mutation SyncStripePayment($order: CreateDonoInput!) {
  syncStripeDono(order: $order) {
    errors {
      field
      message
    }
    data {
      id
      amount
      projectId
      donorId
      status
      stripeCreatedAt
      stripeReceiptUrl
      createdAt
    }
  }
}
    `;
export type SyncStripePaymentMutationFn = Apollo.MutationFunction<SyncStripePaymentMutation, SyncStripePaymentMutationVariables>;

/**
 * __useSyncStripePaymentMutation__
 *
 * To run a mutation, you first call `useSyncStripePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncStripePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncStripePaymentMutation, { data, loading, error }] = useSyncStripePaymentMutation({
 *   variables: {
 *      order: // value for 'order'
 *   },
 * });
 */
export function useSyncStripePaymentMutation(baseOptions?: Apollo.MutationHookOptions<SyncStripePaymentMutation, SyncStripePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncStripePaymentMutation, SyncStripePaymentMutationVariables>(SyncStripePaymentDocument, options);
      }
export type SyncStripePaymentMutationHookResult = ReturnType<typeof useSyncStripePaymentMutation>;
export type SyncStripePaymentMutationResult = Apollo.MutationResult<SyncStripePaymentMutation>;
export type SyncStripePaymentMutationOptions = Apollo.BaseMutationOptions<SyncStripePaymentMutation, SyncStripePaymentMutationVariables>;
export const UpdateAuthoredProjectDocument = gql`
    mutation UpdateAuthoredProject($input: UpdateProjectInput!, $updateProjectId: Int!) {
  updateProject(input: $input, id: $updateProjectId) {
    errors {
      field
      message
    }
    project {
      ...ProjectResponseNoAuthor
    }
  }
}
    ${ProjectResponseNoAuthorFragmentDoc}`;
export type UpdateAuthoredProjectMutationFn = Apollo.MutationFunction<UpdateAuthoredProjectMutation, UpdateAuthoredProjectMutationVariables>;

/**
 * __useUpdateAuthoredProjectMutation__
 *
 * To run a mutation, you first call `useUpdateAuthoredProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAuthoredProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAuthoredProjectMutation, { data, loading, error }] = useUpdateAuthoredProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *      updateProjectId: // value for 'updateProjectId'
 *   },
 * });
 */
export function useUpdateAuthoredProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAuthoredProjectMutation, UpdateAuthoredProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAuthoredProjectMutation, UpdateAuthoredProjectMutationVariables>(UpdateAuthoredProjectDocument, options);
      }
export type UpdateAuthoredProjectMutationHookResult = ReturnType<typeof useUpdateAuthoredProjectMutation>;
export type UpdateAuthoredProjectMutationResult = Apollo.MutationResult<UpdateAuthoredProjectMutation>;
export type UpdateAuthoredProjectMutationOptions = Apollo.BaseMutationOptions<UpdateAuthoredProjectMutation, UpdateAuthoredProjectMutationVariables>;
export const FetchAllProjectsDocument = gql`
    query FetchAllProjects {
  projects {
    ...ProjectResponseNoAuthor
  }
}
    ${ProjectResponseNoAuthorFragmentDoc}`;

/**
 * __useFetchAllProjectsQuery__
 *
 * To run a query within a React component, call `useFetchAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, options);
      }
export function useFetchAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, options);
        }
export type FetchAllProjectsQueryHookResult = ReturnType<typeof useFetchAllProjectsQuery>;
export type FetchAllProjectsLazyQueryHookResult = ReturnType<typeof useFetchAllProjectsLazyQuery>;
export type FetchAllProjectsQueryResult = Apollo.QueryResult<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>;
export const FetchMeDocument = gql`
    query FetchMe {
  me {
    ...FullUserDetails
  }
}
    ${FullUserDetailsFragmentDoc}`;

/**
 * __useFetchMeQuery__
 *
 * To run a query within a React component, call `useFetchMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchMeQuery(baseOptions?: Apollo.QueryHookOptions<FetchMeQuery, FetchMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, options);
      }
export function useFetchMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMeQuery, FetchMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, options);
        }
export type FetchMeQueryHookResult = ReturnType<typeof useFetchMeQuery>;
export type FetchMeLazyQueryHookResult = ReturnType<typeof useFetchMeLazyQuery>;
export type FetchMeQueryResult = Apollo.QueryResult<FetchMeQuery, FetchMeQueryVariables>;
export const GetAuthoredProjectByIdDocument = gql`
    query GetAuthoredProjectById($getAuthoredProjectByIdId: Float!) {
  getAuthoredProjectById(id: $getAuthoredProjectByIdId) {
    errors {
      field
      message
    }
    project {
      ...ProjectResponseNoAuthor
    }
  }
}
    ${ProjectResponseNoAuthorFragmentDoc}`;

/**
 * __useGetAuthoredProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetAuthoredProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthoredProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthoredProjectByIdQuery({
 *   variables: {
 *      getAuthoredProjectByIdId: // value for 'getAuthoredProjectByIdId'
 *   },
 * });
 */
export function useGetAuthoredProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAuthoredProjectByIdQuery, GetAuthoredProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthoredProjectByIdQuery, GetAuthoredProjectByIdQueryVariables>(GetAuthoredProjectByIdDocument, options);
      }
export function useGetAuthoredProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthoredProjectByIdQuery, GetAuthoredProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthoredProjectByIdQuery, GetAuthoredProjectByIdQueryVariables>(GetAuthoredProjectByIdDocument, options);
        }
export type GetAuthoredProjectByIdQueryHookResult = ReturnType<typeof useGetAuthoredProjectByIdQuery>;
export type GetAuthoredProjectByIdLazyQueryHookResult = ReturnType<typeof useGetAuthoredProjectByIdLazyQuery>;
export type GetAuthoredProjectByIdQueryResult = Apollo.QueryResult<GetAuthoredProjectByIdQuery, GetAuthoredProjectByIdQueryVariables>;
export const GetbySlugDocument = gql`
    query getbySlug($slug: String!) {
  getProjectBySlug(slug: $slug) {
    ...ProjectResponseWAuthor
  }
}
    ${ProjectResponseWAuthorFragmentDoc}`;

/**
 * __useGetbySlugQuery__
 *
 * To run a query within a React component, call `useGetbySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetbySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetbySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetbySlugQuery(baseOptions: Apollo.QueryHookOptions<GetbySlugQuery, GetbySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetbySlugQuery, GetbySlugQueryVariables>(GetbySlugDocument, options);
      }
export function useGetbySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetbySlugQuery, GetbySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetbySlugQuery, GetbySlugQueryVariables>(GetbySlugDocument, options);
        }
export type GetbySlugQueryHookResult = ReturnType<typeof useGetbySlugQuery>;
export type GetbySlugLazyQueryHookResult = ReturnType<typeof useGetbySlugLazyQuery>;
export type GetbySlugQueryResult = Apollo.QueryResult<GetbySlugQuery, GetbySlugQueryVariables>;
export const GetProjectsByUserIdDocument = gql`
    query getProjectsByUserId($id: Int!) {
  getProjectsByUserID(id: $id) {
    ...ProjectResponseWAuthor
  }
}
    ${ProjectResponseWAuthorFragmentDoc}`;

/**
 * __useGetProjectsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetProjectsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, options);
      }
export function useGetProjectsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, options);
        }
export type GetProjectsByUserIdQueryHookResult = ReturnType<typeof useGetProjectsByUserIdQuery>;
export type GetProjectsByUserIdLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserIdLazyQuery>;
export type GetProjectsByUserIdQueryResult = Apollo.QueryResult<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>;