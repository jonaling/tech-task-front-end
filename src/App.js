import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {geolocated} from 'react-geolocated';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";


import Locator from "./Components/Locator.js";


const key= "1b7d15729ad9edad0a46d3b9e535105e";

class App extends Component {
state={
        timezone:undefined,
        temperature:undefined,
        precipProb:undefined,
        precipitation:undefined,
        humidity:undefined,
        wind:undefined,
        icon:undefined,
        time:undefined,
        error:"Geolocation is unavailable",
        button:"Press a button!"
      }


      gettingWeat(lat,long){
        console.log("getting is running",lat,long);
        console.log(this.state);
       axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${long}?&units=ca`, {
      method: 'GET',
     // mode: 'no-cors',
    //  headers: {
      //  'Access-Control-Allow-Origin': '*',
       // 'Content-Type': 'application/json',
    //  },
     // withCredentials: true,
     // credentials: 'same-origin',
    }).then(
          res =>  {
           this.setState({timezone:res.data.timezone,time:res.data.currently.time,precipProb:res.data.currently.precipProbability, precipitation:res.data.currently.precipIntensity, wind: res.data.currently.windGust, humidity:res.data.currently.humidity,icon:res.data.currently.icon, temperature:res.data.currently.temperature, error:""});
         }).catch(function (erro) {
    this.setState({error:erro})
  });;
         console.log("precp:"+ this.state.precipitation);
        
        
      }


      buttClick(item){
        this.setState({button:item})
      }

    render() {
  
 
    return  !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? 
         
 <div>

  <Grid container spacing={16}>
  <Grid item xs={12} sm={6} >
  
          <Locator 
            weather={this.gettingWeat(this.props.coords.latitude,this.props.coords.longitude)}
            timezone={this.state.timezone}
            time={this.state.time}
            icon={this.state.icon}
             wind={this.state.wind}
             precip={this.state.precipitation}
            humidity={this.state.humidity}
            temperature={this.state.temperature}
            precipProb={this.state.precipProb}
          />
          {
       this.state.temperature && <h1 className="toPad">{this.state.button}</h1>
       }

        </Grid>
    <Grid item xs={12} sm={6}>

  <p className="top">Precipitation: {this.state.precipProb * 100}%</p>

{
  this.state.humidity && 
      <p>Humidity: {this.state.humidity * 100}%</p>
    }
    {this.state.wind &&
       <p>Wind: {Math.floor(this.state.wind)} km/h</p>
     }
     {this.state.temperature &&
        <div className="buttonList">
          <Button variant="contained" color="primary" onClick={() => this.setState({button: this.state.temperature+" C"})} >Temperature</Button>  
          <Button variant="contained" color="primary" onClick={() => this.setState({button: this.state.precipitation+" mm/Hr"})}>Precipitation</Button>
          <Button variant="contained" color="primary" onClick={() => this.setState({button: this.state.wind+" Km/Hr"})} >Wind</Button>
          </div>
     }
        
    </Grid>
    </Grid>
      </div>
          : <div>Getting the location data&hellip; </div>;

 
  }
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}) (App);
