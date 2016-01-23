import React from 'react';

const Home = React.createClass({
	render(){
		const {projects} = this.props;

		const previews = projects.map((project)=>{
			const {name,images} = project;

			const pics = images.map((image)=>{
				return <div key={image._id}><img src={image.url} width={500} /></div>
			});

			return <div key={name}> 
				   		<h2>{name}</h2>
				   		{pics}
				</div>;
		});
		return <div>
				<h1>Home</h1>
				<button className="btn btn-default">yo</button>
				{previews}
			</div>;
	}
});

export default Home;