/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({node, getNode, actions}) => {
    if (node.internal.type === 'MarkdownRemark') {
        const {createNodeField} = actions;
        const relativeFilePath = createFilePath ({
            node,
            getNode,
            bathPath: 'posts',
            trailingSlash: false
        });
        createNodeField({
            node,
            name: 'slug',
            value: `/posts${relativeFilePath}`
        })
    }
}

const createPostPages = (edges, createPage) => {
    const component = path.resolve('./src/templates/post.js');
    edges.forEach(({node}) => {
        const { slug } = node.fields;
        createPage({
            component,
            path: slug,
            context: {
                slug
            }
        })
    })
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`{
        allMarkdownRemark {
            edges {
                node {
                    fields {
                        slug
                    }
                }
            }
        }
    }`);
    const { edges } = result.data.allMarkdownRemark;
    createPostPages(edges, createPage);
}