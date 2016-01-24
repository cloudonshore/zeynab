import React from 'react';
import ReactDOM from 'react-dom';
import paper from 'paper';
import _ from 'lodash';

var offset = 0;

const Background = React.createClass({
  componentDidMount: function() {
  	this.hPaths = [];
  	this.vPaths = [];
  	this.points = [];
    this.canvas = ReactDOM.findDOMNode(this);
   // window.addEventListener('resize', this._draw);
    paper.setup(this.canvas);
    this._init();

  },
  render(){
  	return <canvas className="background-canvas" />;
  },
  _init(){
  	  	const {width,height} = paper.view.viewSize;
  	 	let i,j;
  	 	for(i=-50;i<height +50;i+=40){
  	 		const hPath = new paper.Path();
            for(j=-50;j<=width;j+=100){
            	 hPath.add(new paper.Point(j,i));
            }
            hPath.add(new paper.Point(width + 50,i));
            hPath.smooth();
  	 		hPath.strokeColor = 'rgba(0, 0, 0, .2)';
  	 		this.hPaths.push(hPath);
  	 	}
  	 	for(i=-50;i<width +50;i+=40){
            const vPath = new paper.Path();
            for(j=-50;j<=height;j+=100){

            	 vPath.add(new paper.Point(i,j));
            }
            vPath.add(new paper.Point(i,height + 50));
            vPath.smooth();
  	 		vPath.strokeColor = 'rgba(0, 0, 0, .2)';	 		
  	 		this.vPaths.push(vPath);
  	 	}


		paper.view.draw();
		paper.view.onFrame = _.throttle(this._tick,100);
  },
  _tick(event){
  	//console.log(event.time + Math.random());
  	_.each(this.hPaths,(path,i)=>{
		_.each(path.segments,(segment,j)=>{
			const change = Math.sin(event.time/2 + Math.random() + j + i*Math.random())/10;
			segment.point.y += change;
			segment.point.x += change;
		}); //path.position.y += 5;
  	});
  	_.each(this.vPaths,(path,i)=>{
		_.each(path.segments,(segment,j)=>{
			const change = Math.sin(event.time/2 + Math.random() + j + i*Math.random())/10;
			segment.point.x += change;
			segment.point.y += change;
		}); //path.position.y += 5;
  	});
  },
  _draw(){
  	//_.each(this.hPaths,(path)=>{
	//	console.log("p",path);
  	//});
  }
});

export default Background