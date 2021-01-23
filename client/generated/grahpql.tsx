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
  getProjectById?: Maybe<Project>;
  me?: Maybe<User>;
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  image: Scalars['String'];
  fundTarget: Scalars['Float'];
  currentFunds: Scalars['Float'];
  publishDate: Scalars['String'];
  targetDate: Scalars['String'];
  totalDonation_sum: Scalars['Float'];
  viewCount: Scalars['Float'];
  votePoints: Scalars['Float'];
  authorId: Scalars['Float'];
  author: User;
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

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  updateProject: ProjectResponse;
  deleteProject: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  getUserById: UserResponse;
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
      & Pick<User, 'id' | 'fullName' | 'avatarUrl' | 'email' | 'created_at'>
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
      & Pick<User, 'id' | 'fullName' | 'avatarUrl' | 'email' | 'created_at'>
    )> }
  ) }
);

export type FetchAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'title' | 'description'>
  )> }
);

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullName' | 'avatarUrl' | 'email'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      fullName
      avatarUrl
      email
      created_at
    }
  }
}
    `;
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
      id
      fullName
      avatarUrl
      email
      created_at
    }
  }
}
    `;
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
    id
    title
    description
  }
}
    `;

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
    id
    fullName
    avatarUrl
    email
  }
}
    `;

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