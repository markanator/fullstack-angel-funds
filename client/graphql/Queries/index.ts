import { gql } from "@apollo/client";

export const GetAllProjects = gql`
query GetProjects{
  projects{
    id
    title
    description
  }
}
`;