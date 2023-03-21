import { gql } from "graphql-request";
export const authorsQuery = gql`
  query GetAuthors {
    authors {
      name
      intro
      bio
      expertise
      skills
      experiences {
        description
        link
        title
      }
      contacts {
        title
        link
        description
      }
    }
  }
`;
const PROJECT_FRAGMENT = gql`
  fragment ProjectDetails on Project {
    name
    slug
    description
    timestamp
    disciplines
    image {
      url
    }
    projectLinks {
      ... on Link {
        link
        title
      }
    }
    background {
      hex
    }
    text {
      hex
    }
  }
`;
const POST_FRAGMENT = gql`
  fragment PostDetails on Post {
    title
    slug
    date
    content
    shortDescription
    postTags
    coverImage {
      url
    }
    authors {
      name
    }
  }
`;
export const projectsQuery = gql`
  ${PROJECT_FRAGMENT}
  query GetProjects {
    projects(orderBy: timestamp_DESC) {
      ...ProjectDetails
    }
  }
`;

export const projectQuery = gql`
  ${PROJECT_FRAGMENT}
  query GetProject($slug: String!) {
    project(where: { slug: $slug }) {
      ...ProjectDetails
    }
  }
`;

export const postsQuery = gql`
  ${POST_FRAGMENT}
  query GetPosts {
    posts {
      ...PostDetails
    }
  }
`;

export const postQuery = gql`
  ${POST_FRAGMENT}
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      ...PostDetails
    }
  }
`;

const PAGE_FRAGMENT = gql`
  fragment PageDetails on Page {
    id
    slug
    title
    updatedAt
    content
    section {
      title
      id
    }
    category {
      title
      id
    }
    order
  }
`;

export const pagesQuery = gql`
  ${PAGE_FRAGMENT}
  query GetPages {
    pages(orderBy: order_ASC) {
      ...PageDetails
    }
  }
`;

export const pageQuery = gql`
  ${PAGE_FRAGMENT}
  query GetPages($chapter: String!, $section: String!) {
    pages(where: { chapter: $chapter, section: $section }) {
      ...PageDetails
    }
  }
`;
export const categoriesQuery = gql`
  query GetCategories {
    categories(orderBy: updatedAt_DESC) {
      title
	  slug
    }
  }
`;
export const sectionsQuery = gql`
  query GetSections {
    sections {
      title
      slug
      chapter {
        title
      }
    }
  }
`;
