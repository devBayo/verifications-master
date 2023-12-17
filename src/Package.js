import React from 'react';
//import { connect } from 'react-redux';
import flv from 'flv.js';

export default class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (flv.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flv.createPlayer({
            type: 'flv',
            url: 'ws://192.168.88.78:8000/live/quantumics.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
  }

  componentDidUpdate() {
    //this.buildPlayer();
    /*if (flv.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flv.createPlayer({
            type: 'flv',
            url: 'ws://localhost:8000/live/quantumics.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }*/
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return(<video id="videoElement" ref={this.videoRef} muted="muted" style={{height:'100vh', width:'100vw', position:'absolute', top:'0px', right:'0px', display:'block', objectFit:'fill'}}></video>)
  }
}
