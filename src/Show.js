import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'animate.css';

class Show extends React.Component {
  constructor(props) {
    super(props);
    //this.props={data:this.props.data}
    this.state={data:null};
  }


  cancelHandle(){
    ReactDOM.unmountComponentAtNode(document.getElementById('show-holder'));
  }


  async componentDidMount() {
    const res = await axios.get(`${window.env.API_URL}/youtubes/${this.props.data.snippet.channelId}`)
    this.setState(current=>{
      current.data = res.data.items[0];
      return current;
    })
  }





 

  render(){
    let html= null;
    if(this.state.data){
      html=(
        <div>
        <img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://yt3.ggpht.com/ytc/AL5GRJWXExqwWyOKSvGY6NbTzer5FegBYfW2FQ3MVNLBSA=s800-c-k-c0x00ffffff-no-rj" width="684" height="684"/>
          <img src={this.state.data.snippet.thumbnails.high.url} style={{width:'500px'}}/>
          <div>Kind: {this.state.data.kind}</div>
          <div>ID: {this.state.data.id}</div>
          <div>Title: {this.state.data.snippet.title}</div>
          <div>Description: {this.state.data.snippet.description}</div>
          <div>CustomUrl: {this.state.data.snippet.customUrl}</div>
          <div>PublishedAt: {this.state.data.snippet.publishedAt}</div>
          <div>Video Count: {this.state.data.statistics.videoCount}</div>
          <div>View Count: {this.state.data.statistics.viewCount}</div>
          <div>Subscriber Count: {this.state.data.statistics.subscriberCount}</div>
        </div>
      )
    }
    return (
      <div style={{width:'100vw', height:'100vh', background:'#000000ab', position:'fixed', top:'0px', left:'0px', padding:'10vh 0'}}>
        <div className='bg-dark animate__animated animate__fadeInLeft animate__faster' style={{width:'80vw', height:'80vh', background:'#fff', margin:'auto'}}>
          <button onClick={this.cancelHandle.bind(this)}>Cancel</button>
          <div className="show-container">
            <div className='container'>
              <div className='row'>
                {html}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Show;
