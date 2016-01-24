import 'main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Router, Route, IndexRoute, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Home from 'Home';
import Background from 'Background';

const API_BASE = '/api/'




const App = React.createClass({
	getInitialState(){
		return {
			projects:[],
			about:{}
		}
	},
	componentWillMount(){
		request
			.get(API_BASE+'galleries')
			.end((err, res)=>{
				this.setState({projects:res.body.galleries});
			});
		request
			.get(API_BASE+'app-texts')
			.end((err, res)=>{
				this.setState({about:res.body['app-texts'][0]});
			});
	},
	renderNav(){
		return 		        <ul>
		          <li><Link to="/">Home</Link></li>
		          <li><Link to="/about">About</Link></li>
		        </ul>;
	},
	render(){
		const {projects,about} = this.state;
		const children = React.Children.map(this.props.children,(child)=>{
			return React.cloneElement(child, { projects: projects,about:about});
		});
		return <div className="example">
				<Background />
				{children}
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