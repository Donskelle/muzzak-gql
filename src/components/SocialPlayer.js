import React, { Component } from 'react'
import ReactPlayer from 'react-player'



class SocialPlayer extends Component {
  state = {
    playingStatus: 'pause',
  }


  render() {
    return (
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    )
  }
}

export default SocialPlayer