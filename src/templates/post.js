// @flow
import { graphql } from 'gatsby';
import React from 'react'
import Layout from '../components/layout';

const Post = ({data}) => (
    <Layout>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <p>template file for posts</p>
        <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html }} />
    </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: { eq: $slug } }) {
      html
      frontmatter {
          title
      }
    }
  }
`

export default Post;