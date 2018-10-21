import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './socialplayer.css'
import { withRouter } from 'react-router-dom'


class SocialPlayer extends Component {
  state = {
    playingStatus: 'pause',
  }


  render() {
    return (
      <ReactPlayer className="hidden" url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    )
  }
}

export default withRouter(SocialPlayer)