import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Options from './Options';
import Notification from './Notification';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class List extends React.Component {
  constructor(props){
    super(props);
    this.state={data:[], container:[]}
  }


  async setListState(data){
    await this.setState({
      data:Array.isArray(data)?data:[]
    });
  }

  async pushListState(data){
    await this.setState(current=>{
      current.data=current.data.concat(Array.isArray(data)?data:[])
      return current;
    });
  }


  clearState(){
    this.setState(current=>{
      current.data=current.data?current.data.filter((datum)=>datum.add!==true && datum.delete!==true):current.data;
      return current
    })
  }


  getMore = (e) => {
    e.preventDefault()
    $('#getMore').trigger('click');
  };



  async pushHandler(data){
    await this.setState(current=>{
      current.data[current.data.indexOf(data)].add=true;
      current.data[current.data.indexOf(data)].delete=false;
      return current;
    })
  }


  async pullHandler(data){
    await this.setState((current)=>{
      current.data[current.data.indexOf(data)].add=false;
      current.data[current.data.indexOf(data)].delete=true;
      return current;
    })
  }


  async deleteHandler(data){
    await this.setState((current)=>{
      current.data[current.data.indexOf(data)].add=false;
      current.data[current.data.indexOf(data)].delete=true;
      current.data.splice(current.data.indexOf(data), 1);
      return current;
    })
  }



  render() {
    let data_html = [];
    let data = this.state.data?this.state.data.map((x)=>x.snippet):[];
    let keys = [];
    console.log(data)
    if(data.length){
      keys = Object.keys(data[0]);
      keys.unshift('options');
      keys=keys.filter((key)=>key!='channelId');
      keys=keys.filter((key)=>key!='channelTitle');
      keys=keys.filter((key)=>key!='publishedAt')
      keys=keys.filter((key)=>key!='liveBroadcastContent')
      keys=keys.filter((key)=>key!='localized')
    }
    let head_html=[];
    let upper = (s)=>s.length?s[0].toUpperCase() + s.slice(1):null;
    for(let k=0; k < keys.length; k++){
      head_html.push(<th>{upper(keys[k])}</th>)
    }
    for(let i=0; i < data.length; i++){
      let datum_html = []

      for(let k=0; k < keys.length; k++){
        if(keys[k]=='thumbnails'){
          datum_html.push(<td><img style={{width:'15px'}} src={data[i][keys[k]].default.url} data-toggle="tooltip" title="Title Here" /></td>)
        }
        else if(keys[k] == 'options'){
          datum_html.push(<td><Options data={this.state.data[i]} deleteHandler={this.deleteHandler.bind(this)} pushHandler={this.pushHandler.bind(this)} pullHandler={this.pullHandler.bind(this)}/></td>);
        }
        else if(keys[k] == 'description'){
          datum_html.push(<td><div className='tbdata' data-toggle="tooltip" title={data[i][keys[k]]} data-placement="bottom">{data[i][keys[k]]}</div></td>)
        }
        else if(keys[k] == 'title'){
          datum_html.push(<td><div className='tbdata'><a href={`https://youtube.com/channel/${this.state.data[i].snippet.channelId}`} target="_blank" data-toggle="tooltip" title={data[i][keys[k]]} data-placement="right">{data[i][keys[k]]}</a></div></td>)
        }
        else{
          datum_html.push(<td><div className='tbdata' data-toggle="tooltip" title={data[i][keys[k]]} data-placement="bottom">{data[i][keys[k]]}</div></td>)
        }
      }
      data_html.push(<tr style={{background:this.state.data[i].add?'#00800080':''}}>{datum_html}</tr>);
    }
    return (
      <div>
        <table className="table table-striped table-dark">
          <thead>{head_html}</thead>
          <tbody>{data_html}</tbody>
        </table>
        <div><a href='#' onClick={this.getMore}>GET MORE</a></div>
        <div id='show-holder'></div>
        <div id='notification-holder'></div>
      </div>
    );
  }
}


export default List;
