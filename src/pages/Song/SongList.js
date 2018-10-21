import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import debounce from 'lodash/debounce'

import { withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  media: {
    height: '150px',
  },
  flexContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '30px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
    },
  },
})

class SongList extends Component {
  state = {
    createSongUrl: '',
    searchSongInput: '',
  }

  constructor() {
    super()
    this.handleSearch = debounce(this.handleSearch.bind(this), 400)
  }

  render() {
    if (this.props.songsQuery.loading) {
      return <div>Loading</div>
    }

    const { songs } = this.props.songsQuery

    return (
      <div>
        <Typography variant="h4" gutterBottom component="h2">
          Search songs
        </Typography>
        <TextField
          autoFocus
          label="Youtube Search"
          onChange={e => {
            this.setState({ searchSongInput: e.target.value })
            this.handleSearch()
          }}
          placeholder="Youtube Search"
          type="text"
        />
        {this.renderSearchItems()}
        <Typography variant="h4" gutterBottom component="h2">
          Last added songs
        </Typography>
        {songs.length && songs.map(song => <div key={song.id}>{song.url}</div>)}
        <Typography variant="h4" gutterBottom component="h2">
          Add Song by Url
        </Typography>
        <form onSubmit={this.handleCreateSong}>
          <TextField
            autoFocus
            onChange={e => this.setState({ createSongUrl: e.target.value })}
            placeholder="Youtube Url"
            type="text"
            value={this.state.createSongUrl}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.createSongUrl}
            type="submit"
            value="Create"
          >
            Add Song
          </Button>
        </form>
      </div>
    )
  }

  renderSearchItems() {
    if (!this.state.searchItems) return null

    if (!this.state.searchItems.length) {
      return <p>No Tracks found</p>
    }

    const { classes } = this.props

    return (
      <div className={classes.flexContainer}>
        {this.state.searchItems.map((item, i) => (
          <Card key={i}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={item.snippet.thumbnails.medium.url}
                title={item.snippet.title.substring(0, 35)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.snippet.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Uploaded at {item.snippet.publishedAt}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Listen
              </Button>
              <Button size="small" color="primary">
                Add To Playlist
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    )
  }

  handleCreateSong = async e => {
    e.preventDefault()
    const { createSongUrl } = this.state
    let result = await this.props.createSongMutation({
      variables: { url: createSongUrl },
    })
  }

  handleSearch = async e => {
    const { searchSongInput } = this.state
    if (!searchSongInput) return null

    try {
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${searchSongInput}&type=video&key=AIzaSyBQoEp-UJmL5AOhAoc4juNaCNfES74XLSY`,
      )
      const data = await searchResponse.json()
      this.setState({ searchItems: data.items })
    } catch (error) {}
  }
}

const SONGS_QUERY = gql`
  query SongsQuery {
    songs(orderBy: createdAt_DESC) {
      id
      url
      author {
        id
        name
      }
    }
  }
`
const CREATE_SONG_MUTATION = gql`
  mutation CreateSongMutation($url: String!) {
    createSong(url: $url) {
      id
    }
  }
`

SongList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  graphql(SONGS_QUERY, {
    name: 'songsQuery',
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(CREATE_SONG_MUTATION, {
    name: 'createSongMutation',
  }),
  withRouter,
)(withStyles(styles)(SongList))
