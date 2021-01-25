import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  projects: Array<Project>;
  getProjectsByUserID?: Maybe<Array<Project>>;
  getProjectBySlug?: Maybe<Project>;
  me?: Maybe<User>;
};


export type QueryGetProjectsByUserIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetProjectBySlugArgs = {
  slug: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  slug: Scalars['String'];
  fundTarget: Scalars['Float'];
  currentFunds: Scalars['Float'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
  totalDonation_sum: Scalars['Float'];
  viewCount: Scalars['Float'];
  votePoints: Scalars['Float'];
  authorId: Scalars['Float'];
  author: User;
  donations?: Maybe<Donation>;
  voteStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  fullName: Scalars['String'];
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Donation = {
  __typename?: 'Donation';
  id: Scalars['String'];
  amount: Scalars['Int'];
  createdAt: Scalars['String'];
  donor: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createStripeSession?: Maybe<Scalars['String']>;
  createProject: Project;
  updateProject: ProjectResponse;
  deleteProject: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getUserById: UserResponse;
};


export type MutationCreateStripeSessionArgs = {
  projectTitle: Scalars['String'];
  projectID: Scalars['Int'];
  amount: Scalars['Int'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
  id: Scalars['Int'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: EmailPasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type CreateProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  fundTarget: Scalars['Float'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UpdateProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  fundTarget: Scalars['Float'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type FullUserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'fullName' | 'avatarUrl' | 'email' | 'created_at'>
);

export type ProjectResponseWAuthorFragment = (
  { __typename?: 'Project' }
  & Pick<Project, 'id' | 'title' | 'description' | 'category' | 'image' | 'fundTarget' | 'currentFunds' | 'publishDate' | 'targetDate' | 'totalDonation_sum' | 'viewCount' | 'votePoints' | 'slug'>
  & { author: (
    { __typename?: 'User' }
    & FullUserDetailsFragment
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & ProjectResponseWAuthorFragment
  ) }
);

export type CreateStripeSessionMutationVariables = Exact<{
  projectTitle: Scalars['String'];
  projectID: Scalars['Int'];
  amount: Scalars['Int'];
}>;


export type CreateStripeSessionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createStripeSession'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserDetailsFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: EmailPasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserDetailsFragment
    )> }
  ) }
);

export type FetchAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & ProjectResponseWAuthorFragment
  )> }
);

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & FullUserDetailsFragment
  )> }
);

export type GetbySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetbySlugQuery = (
  { __typename?: 'Query' }
  & { getProjectBySlug?: Maybe<(
    { __typename?: 'Project' }
    & ProjectResponseWAuthorFragment
  )> }
);

export type GetProjectsByUserIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProjectsByUserIdQuery = (
  { __typename?: 'Query' }
  & { getProjectsByUserID?: Maybe<Array<(
    { __typename?: 'Project' }
    & ProjectResponseWAuthorFragment
  )>> }
);

export const FullUserDetailsFragmentDoc = gql`
    fragment FullUserDetails on User {
  id
  fullName
  avatarUrl
  email
  created_at
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
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateStripeSessionDocument = gql`
    mutation createStripeSession($projectTitle: String!, $projectID: Int!, $amount: Int!) {
  createStripeSession(
    projectTitle: $projectTitle
    projectID: $projectID
    amount: $amount
  )
}
    `;
export type CreateStripeSessionMutationFn = Apollo.MutationFunction<CreateStripeSessionMutation, CreateStripeSessionMutationVariables>;

/**
 * __useCreateStripeSessionMutation__
 *
 * To run a mutation, you first call `useCreateStripeSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeSessionMutation, { data, loading, error }] = useCreateStripeSessionMutation({
 *   variables: {
 *      projectTitle: // value for 'projectTitle'
 *      projectID: // value for 'projectID'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useCreateStripeSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeSessionMutation, CreateStripeSessionMutationVariables>) {
        return Apollo.useMutation<CreateStripeSessionMutation, CreateStripeSessionMutationVariables>(CreateStripeSessionDocument, baseOptions);
      }
export type CreateStripeSessionMutationHookResult = ReturnType<typeof useCreateStripeSessionMutation>;
export type CreateStripeSessionMutationResult = Apollo.MutationResult<CreateStripeSessionMutation>;
export type CreateStripeSessionMutationOptions = Apollo.BaseMutationOptions<CreateStripeSessionMutation, CreateStripeSessionMutationVariables>;
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
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
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
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
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
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FetchAllProjectsDocument = gql`
    query FetchAllProjects {
  projects {
    ...ProjectResponseWAuthor
  }
}
    ${ProjectResponseWAuthorFragmentDoc}`;

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
        return Apollo.useQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, baseOptions);
      }
export function useFetchAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>) {
          return Apollo.useLazyQuery<FetchAllProjectsQuery, FetchAllProjectsQueryVariables>(FetchAllProjectsDocument, baseOptions);
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
        return Apollo.useQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, baseOptions);
      }
export function useFetchMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMeQuery, FetchMeQueryVariables>) {
          return Apollo.useLazyQuery<FetchMeQuery, FetchMeQueryVariables>(FetchMeDocument, baseOptions);
        }
export type FetchMeQueryHookResult = ReturnType<typeof useFetchMeQuery>;
export type FetchMeLazyQueryHookResult = ReturnType<typeof useFetchMeLazyQuery>;
export type FetchMeQueryResult = Apollo.QueryResult<FetchMeQuery, FetchMeQueryVariables>;
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
        return Apollo.useQuery<GetbySlugQuery, GetbySlugQueryVariables>(GetbySlugDocument, baseOptions);
      }
export function useGetbySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetbySlugQuery, GetbySlugQueryVariables>) {
          return Apollo.useLazyQuery<GetbySlugQuery, GetbySlugQueryVariables>(GetbySlugDocument, baseOptions);
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
        return Apollo.useQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, baseOptions);
      }
export function useGetProjectsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>) {
          return Apollo.useLazyQuery<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>(GetProjectsByUserIdDocument, baseOptions);
        }
export type GetProjectsByUserIdQueryHookResult = ReturnType<typeof useGetProjectsByUserIdQuery>;
export type GetProjectsByUserIdLazyQueryHookResult = ReturnType<typeof useGetProjectsByUserIdLazyQuery>;
export type GetProjectsByUserIdQueryResult = Apollo.QueryResult<GetProjectsByUserIdQuery, GetProjectsByUserIdQueryVariables>;