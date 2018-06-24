import React from "react";
import './Locator.css';
import WeatherIcon from "react-icons-weather";


function timeChange(toChange){
	const date = new Date();
	const mins = "0"+ date.getMinutes();
	var hours=0;
	var ending ="am";
	if(date.getHours()>12){
		hours = date.getHours()-12;
		ending="pm"
	}else{
		hours = date.getHours();
	}

	var day ="";
	switch(date.getDay()){
		case(0):
		day= "Sunday";
		break;
			case(1):
		day= "Monday";
		break;
			case(2):
		day= "Tuesday";
		break;
			case(3):
		day= "Wednesday";
		break;
			case(4):
		day= "Thursday";
		break;
			case(5):
		day= "Friday";
		break;
			case(6):
		day= "Saturday";
		break;
			default:
		day="";

	}
	var timeout= day+"  "+hours+":" + mins.substr(-2)+ " "+ending;
	return timeout;
};

/*function getIcon(ico){
	
	var ender=".png";
	
	
return icons+"/"+ico+ender;
}*/

function iconRelabel(ico){
	var cap= ico.charAt(0).toUpperCase()+ico.substr(1);
	var final = cap.replace(/-/g, ' ');
	return final;
}

const Locator = props =>{

	return(
	<div className="left"  >
	
		{
			props.timezone && <h1>{props.timezone}</h1>
		}
		{
			props.time && <p className="change" >{timeChange(props.time)}</p>
		}
		{
			props.icon && <p className="change" >{iconRelabel(props.icon)}</p>

		}
		{
			props.icon &&  <div className="icon">  <WeatherIcon name="darksky" iconId={props.icon}  />  </div>
		}
		
	</div>
	
	);
}

export default Locator;