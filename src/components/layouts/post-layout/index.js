import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { DiscussionEmbed } from "disqus-react"

import Header from "../../header"
import Footer from "../../footer"
import Sidebar from "../../sidebar"
import SEO from "../../seo"
import AllPosts from "../../all-posts"

import NWSForm from "../../newsletter-sub"
import AuthorDetails from "../../author-details"
import { SIZES, BREAKPOINTS, useThemeKey } from "../../theme"
import CreateTOC from "./toc"
import PostContent from "./post-content"
import PostPresentation from "./presentation"
import Tags from "./tags"
import IntentShare from "./share"
import ComponentScopedGlobalStyle from "./styles"

const shortcodes = { Link, SEO }

const updateSidebarHeight = (header, sideNav) => {
  const headerHeight = header.offsetHeight
  const sidebarHeight = parseInt(getComputedStyle(sideNav).height) // statically store sideNav height
  const onScroll = () => {
    sideNav.style.maxHeight =
      document.documentElement.scrollTop > headerHeight
        ? `${sidebarHeight + headerHeight}px`
        : document.documentElement.scrollTop < headerHeight
        ? `${sidebarHeight + document.documentElement.scrollTop}px`
        : `${sidebarHeight}px`
  }

  window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`).matches &&
    window.addEventListener("scroll", onScroll, true)
  return () => {
    window.removeEventListener("scroll", onScroll, true)
  }
}

const PostLayout = ({ data: { mdx, site } }) => {
  const sidebarRef = React.useRef(null)
  const headerRef = React.useRef(null)
  const themeKey = useThemeKey()
  const postUrl = `${site.siteMetadata.siteUrl}${
    mdx.frontmatter.slug ? `/posts${mdx.frontmatter.slug}` : mdx.fields.slug
  }`
  const sharerIntents = [
    {
      name: "whatsapp",
      text: `${mdx.frontmatter.desc}\n${postUrl}`,
    },
    {
      name: "twitter",
      text: `${mdx.frontmatter.desc}\n${postUrl}`,
    },
    {
      name: "facebook",
      text: postUrl,
    },
    {
      name: "linkedin",
      text: `url=${postUrl}&summary=${mdx.frontmatter.desc}`,
      url: true,
    },
  ]

  //DISQUS
  const disqusConfig = {
    shortname: "eaveswall", //unique disqus name found on their site.
    config: { identifier: postUrl },
  }

  React.useEffect(() => {
    return updateSidebarHeight(headerRef.current, sidebarRef.current)
  }, [headerRef, sidebarRef])
  console.log(mdx.frontmatter.featuredImage.childImageSharp.fluid.src)
  return (
    <>
      <ComponentScopedGlobalStyle />
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.desc}
        keywords={mdx.frontmatter.tags}
        meta={[
          {
            name: "author",
            content: `${mdx.frontmatter.author}`,
          },
          {
            name: "twitter:site",
            content: `${mdx.frontmatter.author_twitter}`,
          },
        ]}
        image={mdx.frontmatter.featuredImage.childImageSharp.fluid.src}
      />
      <Header
        siteTitle={site.siteMetadata.title}
        active={mdx.frontmatter.tags.includes(`featured`) ? 2 : 0}
        ref={headerRef}
      />
      <div
        className="d-flex post-layer"
        style={{ minHeight: `calc(100vh - ${SIZES.headerHeight})` }}
      >
        {/* Related Posts */}
        <Sidebar
          className="d-none d-lg-block flex-shrink-0"
          title="Related Posts"
          width={SIZES.relatedPostsWidth}
          ref={sidebarRef}
        >
          <AllPosts related to={mdx.frontmatter.tags} exclude={mdx.id} />
        </Sidebar>
        <PostContent>
          {/* Post Presentation */}
          <PostPresentation {...{ mdx, site }} />

          <div className="d-flex">
            <div className="flex-shrink-1">
              <div className="d-block d-md-none mb-4">
                <Img
                  fluid={mdx.frontmatter.featuredImage.childImageSharp.fluid}
                />
              </div>
              <IntentShare
                className="p-3 px-md-5 pt-md-5 pb-md-3"
                intents={sharerIntents}
              />

              <main className="post p-3 px-md-5" role="main">
                <MDXProvider components={shortcodes}>
                  <MDXRenderer frontmatter={mdx.frontmatter}>
                    {mdx.body}
                  </MDXRenderer>
                </MDXProvider>
              </main>
            </div>
            <Sidebar
              className="d-none d-xl-block flex-shrink-0 border-rounded mt-5"
              title="Table of Contents"
              width={SIZES.tocWidth}
            >
              {mdx.tableOfContents.items !== void 0 ? (
                <CreateTOC items={mdx.tableOfContents.items} />
              ) : (
                <span style={{ textAlign: `center`, display: `block` }}>
                  Grab a Popsicle 'cause you can't cut sections
                </span>
              )}
            </Sidebar>
          </div>

          <div className="mt-3">
            <Tags tags={mdx.frontmatter.tags} className="px-3 px-md-5" />
            <div className="d-xl-flex p-3 p-md-5">
              <AuthorDetails author={mdx.frontmatter.author} />
            </div>

            <div className="disqus-container p-3 px-xl-5 mt-3 mt-xl-0">
              <DiscussionEmbed key={themeKey} {...disqusConfig} />
            </div>

            <NWSForm className="px-xl-5 mt-3 mt-xl-0" />
          </div>

          <Footer />
        </PostContent>
      </div>
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        author
        author_twitter
        date(formatString: "MMM DD, YYYY")
        last_modified(formatString: "MMM DD, YYYY")
        desc
        tags
        slug
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
      timeToRead
      tableOfContents
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`

export default PostLayout
