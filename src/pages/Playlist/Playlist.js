import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
}

class Playlist extends Component {
  render() {
    const { classes, playlist } = this.props

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {playlist.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Created by {playlist.author.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button component={NavLink} to={`/playlist/${playlist.id}`} size="small" color="primary">
            View
          </Button>
        </CardActions>
      </Card>
    )
  }
}

Playlist.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Playlist);