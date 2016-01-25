import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from 'react-router';

const Project = React.createClass({
	render(){
		const {name,images,_id,display} = this.props;
		console.log(_id,display);
		return <div className={"project-container " + display}> 
						<Link to={"/projects/" + _id}>
						<div className="image-container">
							<img src={images[0].url} className="project-preview-image" />
							<div className="project-title-div">{name}</div>
						</div>
						</Link>
				   		
				</div>;
	}
});

export default Project