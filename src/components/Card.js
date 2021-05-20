

export default function Card({ weatherStateAbbreviation, cityName, windSpeed, windDirection, Humidity }) {
  return (
    <div className="card">
      <div className="card-image">
        <img href={`https://www.metaweather.com/static/img/weather/${weatherStateAbbreviation}.png`} alt={`View of current weather state in ${cityName}`}/>
      </div>
      <div className="card-content">
        <h2>{cityName}</h2>
      </div>
      <div className="content">
        <p>{windSpeed}</p>
        <p>{windDirection}</p>
        <p>{Humidity}</p>
      </div>
    </div>
  )
}