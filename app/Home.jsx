import React from 'react';
import Project from 'Project';
import _ from 'lodash';

const Home = React.createClass({
	renderPics(){
		const {history,location,params,projects} = this.props;
		const {id} = params;
		const projectSelected = history.isActive('projects/'+id);

		const previews = projects.map((project)=>{
			const {name,images} = project;
			const display = (projectSelected?
									(project._id==id?"full":"none")
									:"preview");
			return <Project key={name} {...project} display={display} />;
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