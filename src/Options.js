import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import Show from './Show';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faFilePen, faFile} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan, faFilePen, faFile);

class Navigator extends React.Component{
	constructor(props){
		super(props);
	}
	
	view(e){
		e.preventDefault();
		const show = <Show data={this.props.data}/>;
		ReactDOM.render(show, document.getElementById('show-holder'));
	}

	select(e){
		e.preventDefault();
		this.props.pushHandler(this.props.data);
	}

	remove(e){
		e.preventDefault();;
		this.props.pullHandler(this.props.data);
	}


	delete(e){
		e.preventDefault();;
		this.props.deleteHandler(this.props.data);
	}


	render(){
	  return (
		<div style={{display:'flex'}}>
			<a className="nav-li" style={{display:this.props.data.add?'none':''}} href="#" onClick={this.select.bind(this)}>Select</a>
		    <a className="nav-li" style={{display:!this.props.data.add?'none':''}} href="#" onClick={this.remove.bind(this)}>Remove</a>
			<a className="nav-li" href="#" onClick={this.view.bind(this)}><FontAwesomeIcon icon="fa-solid fa-file"/></a>
		    <a className="nav-li" href="#" onClick={this.delete.bind(this)}><FontAwesomeIcon icon="fa-solid fa-trash-can"/></a>
		</div>
	  );
	};
}

export default Navigator;
