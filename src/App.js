import React, { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [query, setQuery] = useState('');
  const [cond, setCond] = useState([]);

  const url = `http://api.weatherstack.com/current?access_key=4b2162d12b51ed70381fa3defb9b8fb2&query=${query}`;

  async function getData() {
    const result = await axios.get(url);
    setCond([result.data]);
    console.log(result.data);
  }

  const submitForm = e => {
    e.preventDefault()
    getData()
  }

  return (
    <div className="App">
      <form onSubmit={submitForm} className='form'>
        <input type="text"
               placeholder='enter the place'
               value={query}
               onChange={e => setQuery(e.target.value)}
        />
        <button type='submit'>Enter</button>
      </form>

      {cond.map((item, index) => {
        return (
            <div key={index} className='items'>
              <div className='place'>
                <img src={item.current.weather_icons} alt=""/>
                <p>{item.location.country}</p>
                <p>{item.location.region}</p>
                <p>{item.location.name}</p>

                <div className='condition'>
                  <p><span>Time</span> : {item.current.observation_time}</p>
                  <p><span>Temperature</span> : {item.current.temperature}</p>
                  <p><span>Pressure</span> : {item.current.pressure}</p>
                  <p><span>Wind Degree</span> : {item.current.wind_degree}</p>
                </div>
              </div>
            </div>
        )
      })}
    </div>
  );
}

export default App;
