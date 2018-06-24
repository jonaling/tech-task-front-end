import React from "react";


class WeatherForm extends React.Component{
	render(){

		
		return ( 
			<div>

				<h1>Hello {this.props.getGeo}</h1>
				<div> Time and date</div>
			</div>
		);
	}
}

export default WeatherForm;