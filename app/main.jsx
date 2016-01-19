import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

const API_BASE = '/keystone/api/'

const App = React.createClass({
	getInitialState(){
		return {
			projects:[],
			about:{}
		}
	},
	componentWillMount(){
		request
			.get(API_BASE+'Gallery')
			.end((err, res)=>{
				this.setState({projects:res.body.results});
			});
		request
			.get(API_BASE+'AppText')
			.end((err, res)=>{
				if(res.body.results.length){
					this.setState({about:res.body.results[0].fields});
				}
			});
	},
	render(){
		const {projects,about} = this.state;
		const children = React.Children.map(this.props.children,(child)=>{
			return React.cloneElement(child, { projects: projects,about:about});
		});
		return <div>
		        <ul>
		          <li><Link to="/">Home</Link></li>
		          <li><Link to="/about">About</Link></li>
		        </ul>
				{children}
			</div>;
	}
});

const Home = React.createClass({
	render(){
		const {projects} = this.props;

		const previews = projects.map((project)=>{
			const {name,images} = project.fields;

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
				{previews}
			</div>;
	}
});

const About = React.createClass({
	render(){
		const {name,text} = this.props.about;
		return <div>
				<h1>{name}</h1>
				<div dangerouslySetInnerHTML={{__html:text}}></div>
			</div>;
	}
});

const Project = React.createClass({
	render(){
		return <div>project</div>;
	}
});


const el = document.getElementById('container');

// todo: re-add ga.pageview call for each page load??
ReactDOM.render( <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} />
      <Route path="projects/:id" component={Project} />
    </Route>
  </Router>, el);