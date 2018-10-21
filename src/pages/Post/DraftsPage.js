import React, { Component, Fragment } from 'react'
import Post from '../../components/Post'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import Typography from '@material-ui/core/Typography'

class DraftsPage extends Component {
  state = {
    title: '',
    text: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.draftsQuery.refetch()
    }
  }

  render() {
    if (this.props.draftsQuery.loading) {
      return <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
    }

    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Drafts
        </Typography>

        {this.props.draftsQuery.drafts &&
          this.props.draftsQuery.drafts.map(draft => (
            <Post
              key={draft.id}
              post={draft}
              refresh={() => this.props.draftsQuery.refetch()}
              isDraft={!draft.isPublished}
            />
          ))}
        {this.props.children}

        <form onSubmit={this.handlePost}>
          <Typography variant="h4" gutterBottom component="h2">
            Create Draft
          </Typography>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            type="text"
            value={this.state.title}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ text: e.target.value })}
            placeholder="Content"
            rows={8}
            value={this.state.text}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.text &&
              this.state.title &&
              'dim pointer'}`}
            disabled={!this.state.text || !this.state.title}
            type="submit"
            value="Create"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </Fragment>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, text } = this.state
    await this.props.createDraftMutation({
      variables: { title, text },
    })
  }
}

const DRAFTS_QUERY = gql`
  query DraftsQuery {
    drafts {
      id
      text
      title
      isPublished
      createdAt
      author {
        name
      }
    }
  }
`

const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraftMutation($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`

export default compose(
  graphql(DRAFTS_QUERY, {
    name: 'draftsQuery', // name of the injected prop: this.props.feedQuery...
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(CREATE_DRAFT_MUTATION, {
    name: 'createDraftMutation', // name of the injected prop: this.props.createDraftMutation...
  }),
)(DraftsPage)
