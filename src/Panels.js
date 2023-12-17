import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Notification from './Notification';

export default class Form extends React.Component {

  componentDidMount = async()=> {
    try{
      const res = await axios.get(`${window.env.API_URL}/youtubes`).catch(console.log)
      this.props.listRef.current.setListState(res.data.items);
      this.setState({nextPageToken:res.data.nextPageToken, prevPageToken:res.data.prevPageToken});
    }
    catch(e){
      console.log(e);
    }
  }


  showNotification(data){
    const notification = <Notification data={data}/>;
    ReactDOM.render(notification, document.getElementById('notification-holder'));
  }


  async explore(e){
    e.preventDefault();
    const body={ q: $('#search-box').val(), order: $('#order').val() };
    const res = await axios.post(`${window.env.API_URL}/youtubes/explore`, body).catch(console.log);
    this.props.listRef.current.setListState(res.data.items);
    this.setState({nextPageToken:res.data.nextPageToken, prevPageToken:res.data.prevPageToken});
    this.showNotification(res.data);
  }

  async add(e){
    e.preventDefault();
    const body={ data:this.props.listRef.current.state.data };
    const res = await axios.post(`${window.env.API_URL}/youtubes/add`, body).catch(console.log);
    this.showNotification(res.data);
    this.props.listRef.current.clearState();
  } 

  async delete(e){
    e.preventDefault();
    const body={ data:this.props.listRef.current.state.data };
    const res = await axios.post(`${window.env.API_URL}/youtubes/delete`, body).catch(console.log);
    this.showNotification(res.data);
    this.props.listRef.current.clearState();
  }  

  async next(e){
    e.preventDefault();
    const body={ data:this.props.listRef.current.state.data };
    const res = await axios.post(`${window.env.API_URL}/youtubes/next`, body).catch(console.log);
    this.showNotification(res.data);
    this.props.listRef.current.clearState();
    window.location.href='/prospects';
  }


  async getNextList(e){
    e.preventDefault();
    const body={ pageToken:this.state.nextPageToken};
    const res = await axios.post(`${window.env.API_URL}/youtubes/getmore`, body).catch(console.log);
    this.props.listRef.current.pushListState(res.data.items);
    this.setState({nextPageToken:res.data.nextPageToken, prevPageToken:res.data.prevPageToken});
    this.showNotification(res.data);
  }


  async getPrevList(e){
    e.preventDefault();
    const body={ pageToken:this.state.prevPageToken};
    const res = await axios.post(`${window.env.API_URL}/youtubes/getmore`, body).catch(console.log);
    this.props.listRef.current.setListState(res.data.items);
    this.setState({nextPageToken:res.data.nextPageToken, prevPageToken:res.data.prevPageToken});
    this.showNotification(res.data);
  }



  render(){
    return(
      <form style={{paddingLeft:"10px", paddingRight:"10px"}}>
        <div className='form-comp' style={{background:"white", display:"inline-flex"}}>
          <input type='text' id='search-box' className='form-comp' placeholder='GameTech'/>
          <select name="order" id="order">
            <option select value="none">SortBy</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
            <option value="relevance">Relevance</option>
            <option value="title">Title</option>
            <option value="videoCount">Video Count</option>
            <option value="viewCount">View Count</option>
          </select>
          <input style={{width:"40px"}} type='number' id='count' className='form-comp' placeholder='2'/>
          <select name="order" id="count-unit">
            <option select value="none">Count Per</option>
            <option value="video">Video</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="none">Normal</option>
          </select>
        </div>
        <ul className='form-comp'>
          <li><button onClick={this.explore.bind(this)}>Explore</button></li>
          <li><button onClick={this.delete.bind(this)}>Delete</button></li>
          <li><button onClick={this.add.bind(this)}>Add</button></li>
          <li><button onClick={this.next.bind(this)}>Proceed</button></li>
          <li><button id='getMore' style={{display:'none'}} onClick={this.getNextList.bind(this)}>Get More</button></li>
        </ul>
      </form>
    )
  }
}

