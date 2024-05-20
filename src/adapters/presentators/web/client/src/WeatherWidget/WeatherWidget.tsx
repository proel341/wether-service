import './WeatherWidget.css'

const WeatherWidget = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 className="Temp">72<span id="F">&#8451;</span></h1>
                <h1 className="Time">09:35</h1>
                <h1 className="Date">20 апреля</h1>
            </div>
        </div>
    )
}

export default WeatherWidget;