import React from 'react';

const Home = React.createClass({
	renderPics(){
				const {projects} = this.props;

		const previews = projects.map((project)=>{
			const {name,images} = project;

			//const pics = images.map((image)=>{
			//	return 
			//});

			return <div key={name} className="project-preview-container"> 
						<div className="image-container"><img src={images[0].url} width={500} /></div>
				   		<div className="project-title-div">{name}</div>
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