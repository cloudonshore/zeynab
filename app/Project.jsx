import React from 'react';
import ReactDOM from 'react-dom';
import {Link } from 'react-router';
import TweenMax from 'gsap';

const slideSpeed = .5;
const ease = "Power1.easeOut";
const Project = React.createClass({
	getInitialState(){
		return {
			index:0
		};
	},
	forward(){
		console.log(TweenMax)
		const {images} = this.props, {index} = this.state;
		const newIndex = (index+1)%images.length;
		const currentImage = this.refs["image"+index];
		const nextImage = this.refs["image"+newIndex];

		const {ic} = this.refs;
		const icWidth = (ic?ic.offsetWidth:500);

		TweenMax.fromTo(currentImage,slideSpeed,{css: {left:"0px"}},{css: {left:icWidth+"px"}},ease);
		TweenMax.fromTo(nextImage,slideSpeed,{css: {left:-icWidth+"px"}},{css: {left:"0px"}},ease);
		this.setState({index:newIndex});
	},
	back(){
		const {images} = this.props, {index} = this.state;

		const newIndex = (index-1<0?images.length-1:index-1);

		const currentImage = this.refs["image"+index];
		const nextImage = this.refs["image"+newIndex];

		const {ic} = this.refs;
		const icWidth = (ic?ic.offsetWidth:500);

		TweenMax.fromTo(nextImage,slideSpeed,{css: {left:icWidth+"px"}},{css: {left:"0px"}},ease);
		TweenMax.fromTo(currentImage,slideSpeed,{css: {left:"0px"}},{css: {left:-icWidth+"px"}},ease);

		this.setState({index:newIndex});
	},
	renderPreviewContent(){
		const {name,images,_id,display} = this.props;
		return <Link to={"/projects/" + _id}>
				<div className="image-container">
					<img src={images[0].url} className="project-preview-image" />
					<div className="project-title-div">{name}</div>
				</div>
			</Link>;
	},
	renderFullContent(){
		const {name,images,_id,display,desciption} = this.props;
		const {index} = this.state;
		const currentImage = images[index];
		const {ic} = this.refs;
		const icWidth = (ic?ic.offsetWidth:500);
		const imageContainerStyle = {height:(currentImage.height/currentImage.width* icWidth) + "px"};
		const imagesDivs = images.map((image,i)=>{
			let sizeClass;
			if(i==index)
			sizeClass = 'center';
			else
			sizeClass = 'left';
			
			return <img key={image.url} ref={"image" + i} src={image.url} className={"project-preview-image " + sizeClass} />
		});

		return  <div>
					<button className="btn btn-default" onClick={this.back}>b</button>
					<button className="btn btn-default" onClick={this.forward}>f</button>
			        <div className="image-container" style={imageContainerStyle} ref="ic">
						{imagesDivs}
						<div className="project-title-div">{name}</div>
					</div>
					
					<div className="project-description">{desciption}</div>
				</div>;
	},
	render(){
		const {name,images,_id,display} = this.props;

		return <div className={"project-container " + display}> 
				{(display=="full"?this.renderFullContent():this.renderPreviewContent())}
				   		
				</div>;
	}
});

export default Project