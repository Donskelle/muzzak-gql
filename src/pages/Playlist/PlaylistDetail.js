import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

class PlaylistDetail extends Component {
  render(props) {
    if (this.props.playlistQuery.loading) {
      return (
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            Playlist
          </Typography>
          Loading
        </div>
      )
    }

    const { user } = this.props
    const { playlist } = this.props.playlistQuery

    if (!playlist) {
      return (
        <div>
          <Typography variant="h4" gutterBottom component="h2">
            Playlist
          </Typography>
          Error
        </div>
      )
    }

    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Playlist {playlist.title}
        </Typography>
        <p>{playlist.createdAt}</p>
        <p>Author {playlist.author.name}</p>
        <Typography variant="h4" gutterBottom component="h2">
          Songs
        </Typography>
        {this._renderSongs(playlist.songs)}
        <p>{this._renderActions(user, playlist)}</p>
      </div>
    )
  }

  _renderSongs(songs = []) {
    if(!songs.length)
      return <p>No songs added</p>
    
    return songs.map(song => <div key={song.id}>{song.url}</div>)
  }

  _renderActions(user, playlist) {
    if (!user || playlist.author.id !== user.id) return null

    return (
      <a onClick={() => this.deletePlaylist(playlist.id)}>Delete Playlist</a>
    )
  }

  deletePlaylist = async id => {
    await this.props.deletePlaylist({
      variables: { id },
    })
    this.props.history.replace('/playlists')
  }
}

const PLAYLIST_QUERY = gql`
  query playlistQuery($id: ID!) {
    playlist(id: $id) {
      id
      title
      createdAt
      author {
        id
        name
      }
      songs {
        url
        id
        author {
          name
        }
        createdAt
      }
    }
  }
`

const DELETE_PLAYLIST_MUTATION = gql`
  mutation DeletePlaylist($id: ID!) {
    deletePlaylist(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(PLAYLIST_QUERY, {
    name: 'playlistQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(DELETE_PLAYLIST_MUTATION, {
    name: 'deletePlaylist',
  }),
  withRouter,
)(PlaylistDetail)
