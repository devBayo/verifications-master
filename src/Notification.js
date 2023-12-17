import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'animate.css';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state={data:this.props.data}
  }


  componentDidMount(){
    setTimeout(this.cancelHandle.bind(this), 1000);
  }


  cancelHandle(){
    ReactDOM.unmountComponentAtNode(document.getElementById('notification-holder'));
  }


  render(){
    return (
      <div className='animate__animated animate__fadeInRight animate__faster' 
      style={{width:'25vw', height:'15vh', background:'#b87e7e', position:'fixed', 
        bottom:'20px', right:'5px'}}>
          Hello : :
        {JSON.stringify(this.state.data)}
      </div>
    );
  }
}



export default Notification;
