import React from 'react';
import {Link } from 'react-router';

const Home = React.createClass({
	renderPics(){
				const {projects} = this.props;

		const previews = projects.map((project)=>{
			const {name,images} = project;

			//const pics = images.map((image)=>{
			//	return 
			//});
			return <div key={name} className="project-preview-container"> 
						<Link to={"/projects/" + project._id}>
						<div className="image-container">
							<img src={images[0].url} className="project-preview-image" />
							<div className="project-title-div">{name}</div>
						</div>
						</Link>
				   		
				</div>;
		});
		return <div>
				{previews}
			</div>;		
	},
	render(){
		return <div className="home-container">{this.renderPics()}</div>;
	}
});

export default Home;