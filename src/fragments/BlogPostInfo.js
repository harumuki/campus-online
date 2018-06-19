import flattenAuthor from './AuthorInfo'
import flattenEditorial from './EditorialInfo'

export const fragment = graphql`
	fragment BlogPostInfo on MarkdownRemark {
		frontmatter {
			title
			date
			cover
			tags
		}
		fields {
			url: slug
			editorial {
				...EditorialInfo
			}
			author {
				...AuthorInfo
			}
		}
	}
`

const flatten = ({frontmatter, fields, ...other}) => ({
	...other,
	...frontmatter,
	...fields,
	editorial: flattenEditorial(fields.editorial),
	author: flattenAuthor(fields.author),
})

export default node => (node ? flatten(node) : null)