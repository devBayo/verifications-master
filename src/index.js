import React, { Component } from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import axios from 'axios';

class VerificationManager extends Component {
  state = {
    verifications: [],
    name: '',
    description: '',
    selectedVerification: null
  };

  componentDidMount() {
    this.fetchVerifications();
  }

  fetchVerifications = () => {
    axios.get('/verifications')
      .then(response => {
        this.setState({ verifications: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  createVerification = () => {
    const { name, description } = this.state;

    axios.post('/verifications', { name, description })
      .then(response => {
        this.fetchVerifications();
        this.setState({ name: '', description: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useVerification = (verification) => {
    this.setState({ selectedVerification: verification });
    // Perform additional actions to use the selected verification
  };

  render() {
    const { verifications, name, description, selectedVerification } = this.state;
    const videos = [];
    for(let i=0; i < 2; i++){
      videos.push(`${this.props.api_url}/media/verifications/verification${i}.mp4`);
    }
    return(
      <div className="verification-manager-container">
        <VideoCarousel videos={videos}/>
      </div>
    )
  }
}



class VideoCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  goToPrevious = () => {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const lastIndex = videos.length - 1;
    const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    this.setState({ currentIndex: newIndex });
  };

  goToNext = () => {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const lastIndex = videos.length - 1;
    const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    this.setState({ currentIndex: newIndex });
  };

  render() {
    const { currentIndex } = this.state;
    const { videos } = this.props;
    const currentVideo = videos[currentIndex];

    return (
      <div>
        <video src={currentVideo} className="background-video" autoPlay loop/>
        <button onClick={this.goToPrevious}>Previous</button>
        <button onClick={this.goToNext}>Next</button>
      </div>
    );
  }
}




export default VerificationManager;
