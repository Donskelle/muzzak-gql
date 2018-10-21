import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import Playlist from './Playlist'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = theme => ({
  flexContainer: {
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: '30px',
    },
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '30px',
  },
})
class PlaylistList extends Component {
  state = {
    searchString: '',
    createPlaylistTitle: '',
  }

  componentDidMount() {
    this.props.subscribeToNewPlaylists()
  }

  render(props) {
    if (this.props.loading) {
      return (
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            All playlists
          </Typography>
          Loading
        </div>
      )
    }

    const { classes } = this.props

    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          All playlists
        </Typography>
        <div className={classes.flexContainer}>
          {this.props.playlistQuery.playlists &&
            this.props.playlistQuery.playlists.map(playlist => (
              <Playlist
                key={playlist.id}
                playlist={playlist}
                refresh={() => this.props.playlistQuery.refetch()}
              />
            ))}
        </div>
        <Typography variant="h4" gutterBottom component="h2">
          Create playlists
        </Typography>
        <form onSubmit={this.handleCreatePlaylist}>
          <TextField
            autoFocus
            onChange={e =>
              this.setState({ createPlaylistTitle: e.target.value })
            }
            placeholder="Playlist Title"
            type="text"
            value={this.state.createPlaylistTitle}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.createPlaylistTitle}
            type="submit"
          >
            Create Playlist
          </Button>
        </form>
      </div>
    )
  }

  handleCreatePlaylist = async e => {
    e.preventDefault()
    const { createPlaylistTitle } = this.state
    let result = await this.props.createPlaylistMutation({
      variables: { title: createPlaylistTitle },
    })
    if (result.data.createPlaylist && result.data.createPlaylist.id) {
      this.setState({ createPlaylistTitle: '' })
      // this.props.playlistQuery.refetch()
    }
  }
}

const CREATE_PLAYLIST_MUTATION = gql`
  mutation CreatePlaylistMutation($title: String!) {
    createPlaylist(title: $title) {
      id
      createdAt
      title
      author {
        name
      }
      songs {
        id
        url
      }
    }
  }
`
const PLAYLIST_QUERY = gql`
  query PlaylistQuery {
    playlists(orderBy: createdAt_DESC, first: 5) {
      id
      createdAt
      title
      author {
        name
      }
      songs {
        id
        url
      }
    }
  }
`
const PLAYLIST_SUBSCRIPTION = gql`
  subscription PlaylistSubscription {
    playlistSubscription {
      node {
        id
        createdAt
        title
        author {
          name
        }
        songs {
          id
          url
        }
      }
    }
  }
`

PlaylistList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  graphql(PLAYLIST_QUERY, {
    name: 'playlistQuery', // name of the injected prop: this.props.feedQuery...
    options: {
      fetchPolicy: 'network-only',
    },
    props: props =>
      Object.assign({}, props, {
        subscribeToNewPlaylists: params => {
          return props.playlistQuery.subscribeToMore({
            document: PLAYLIST_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev
              }
              const newPlaylist =
                subscriptionData.data.playlistSubscription.node
              if (
                prev.playlists.find(playlist => playlist.id === newPlaylist.id)
              ) {
                return prev
              }
              return Object.assign({}, prev, {
                playlists: [newPlaylist, ...prev.playlists],
              })
            },
          })
        },
      }),
  }),
  graphql(CREATE_PLAYLIST_MUTATION, { name: 'createPlaylistMutation' }),
)(withStyles(styles)(PlaylistList))
