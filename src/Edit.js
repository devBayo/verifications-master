import React from 'react';
import Show from './Show';


class Create extends Show {

  render() {
    const html=(
      <div style={{margin:'auto', marginTop:'15%', background:'#fff', width:'40vw'}}>
        <h3>Create New Prospect Manually</h3>
        <form>
          <div>
            <input style={{width:"50%"}} type='text' placeholder='Channel Name'/>
            <input style={{width:"50%"}} type='text' placeholder='Youtube Link'/>
          </div>
          <div>
            <input style={{width:"50%"}} type='email' placeholder='Email (optional)'/>
            <button style={{width:"50%"}}>Submit</button>
          </div>
        </form>
      </div>
    );
    return (
      <div style={{width:'100vw', height:'100vh', background:'#000000ab', position:'fixed', top:'0px', left:'0px', padding:'10vh 0'}}>
        <div className='bg-dark animate__animated animate__fadeInLeft animate__faster' style={{width:'80vw', height:'80vh', background:'#fff', margin:'auto'}}>
          <button onClick={this.cancelHandle.bind(this)}>Cancel</button>
          <div className='container'>
            <div className='row'>
              {html}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
