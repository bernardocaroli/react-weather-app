import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

const API_KEY = '382236b16a2a42a8849ac5a3218f1ecb';


class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }

  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);

    const data = await api_call.json();

    if (city && country) {

      this.setState({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {

      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the correct values!"
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-5 title-container'>
                  <Titles />
                </div>
                <div className='col-7 form-container'>
                  <Form getWeather={this.getWeather} />
                  <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );

  }
}


export default App;
