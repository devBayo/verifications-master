function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
require('react-router-dom');
var axios = _interopDefault(require('axios'));

class VerificationManager extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      verifications: [],
      name: '',
      description: '',
      selectedVerification: null
    };
    this.fetchVerifications = () => {
      axios.get('/verifications').then(response => {
        this.setState({
          verifications: response.data
        });
      }).catch(error => {
        console.error(error);
      });
    };
    this.createVerification = () => {
      const {
        name,
        description
      } = this.state;
      axios.post('/verifications', {
        name,
        description
      }).then(response => {
        this.fetchVerifications();
        this.setState({
          name: '',
          description: ''
        });
      }).catch(error => {
        console.error(error);
      });
    };
    this.useVerification = verification => {
      this.setState({
        selectedVerification: verification
      });
    };
  }
  componentDidMount() {
    this.fetchVerifications();
  }
  render() {
    const videos = [];
    for (let i = 0; i < 2; i++) {
      videos.push(this.props.api_url + "/media/verifications/verification" + i + ".mp4");
    }
    return /*#__PURE__*/React__default.createElement("div", {
      className: "verification-manager-container"
    }, /*#__PURE__*/React__default.createElement(VideoCarousel, {
      videos: videos
    }));
  }
}
class VideoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.goToPrevious = () => {
      const {
        currentIndex
      } = this.state;
      const {
        videos
      } = this.props;
      const lastIndex = videos.length - 1;
      const newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      this.setState({
        currentIndex: newIndex
      });
    };
    this.goToNext = () => {
      const {
        currentIndex
      } = this.state;
      const {
        videos
      } = this.props;
      const lastIndex = videos.length - 1;
      const newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      this.setState({
        currentIndex: newIndex
      });
    };
    this.state = {
      currentIndex: 0
    };
  }
  render() {
    const {
      currentIndex
    } = this.state;
    const {
      videos
    } = this.props;
    const currentVideo = videos[currentIndex];
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("video", {
      src: currentVideo,
      className: "background-video",
      autoPlay: true,
      loop: true
    }), /*#__PURE__*/React__default.createElement("button", {
      onClick: this.goToPrevious
    }, "Previous"), /*#__PURE__*/React__default.createElement("button", {
      onClick: this.goToNext
    }, "Next"));
  }
}

module.exports = VerificationManager;
//# sourceMappingURL=index.js.map
