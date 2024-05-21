import { useEffect, useState } from 'react';

import './App.css'
import InputWithList from './components/InputWithList/InputWithList';
import { getLocationOptions, getWether } from './api/api';
import { IPosition, IWether } from './Types';
import PositionSelector from './components/PositionSelector/PositionSelector';

const App = () => {

  const [searchMode, setSearchMode] = useState<"latLng" | "place">("place")

  const searchModeMarkerStyle = searchMode === "place" ? { left: "0" } : { left: "50%" }

  const [weather, setWeather] = useState<IWether[]>([]);

  const [placeName, setPlaceName] = useState<string>("")

  const setWetherData = async (position: IPosition) => {
    const data = await getWether(position)
    setPlaceName(data[0].location.name)
    setWeather(data)
  }

  useEffect(() => {
    setWetherData({lat: 55.72, lon: 37.59,});
  }, []);

  return (
    <>
      <h1 className='page-title'>Wether-Service</h1>

      <div className="modeSelector">
        <span className='modeSelector__option' onClick={() => setSearchMode("place")}>Поиск по расположению</span>
        <span className='modeSelector__option' onClick={() => setSearchMode("latLng")}>Поиск по координатам</span>
        <div className='modeSelector__marker' style={searchModeMarkerStyle}></div>
      </div>

      <div className='form'>

        {
          searchMode === "place"
            ? (
              <InputWithList onSelect={setWetherData} placeholder='Введите название населенного пункта' getOptions={getLocationOptions} />

            ) : (
              <>
                <PositionSelector onSelect={setWetherData} />
              </>
            )
        }

      </div>

      {
        weather.length > 0 && <>
          <>
            {placeName ? <h3>{placeName}</h3> : <h3> Показаны результаты поиска в неизвестном месте</h3>}
          </>

          <ul className='wether'>
            <li className='wether__item'>
              <strong>Дата</strong>
              <strong>Время</strong>
              <strong>Температура</strong>

            </li>
            {weather.map((item, idx) => {

              const preparedDate = item.date.split("T")[0]
              const preparedTime = item.temperatures[0].time.split("T")[1].slice(0, 8)

              return (
                <li key={idx} className='wether__item'>
                  <p>{preparedDate}</p>
                  <p>{preparedTime}</p>
                  <p>{item.temperatures[0].temperature}°C</p>
                </li>
              )
            })}
          </ul>
        </>
      }
    </>
  );
};

export default App;

