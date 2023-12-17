import React from 'react';
import List from './List';

class Form extends React.Component {

  render() {
    return (
      <form
        className="ui form error"
      >
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

export default Form;
