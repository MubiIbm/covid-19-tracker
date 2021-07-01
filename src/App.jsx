
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table.jsx';
import { prettyPrintStat, sortData } from "./util";
import LineGraph from './LineGraph';
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] =
    useState({ lat: 30.3753, lng: 69.3451 });
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])
  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2 //
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setmapCountries(data);


        });
    };
    getCountryData();
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);


    const url =
      countryCode === "Worldwide" ?
        "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        countryCode === "Worldwide"
          ? (setMapCenter([30.3753, 69.3451]))
          : (setMapCenter([data.countryInfo.lat, data.countryInfo.long]) );
        setCountry(countryCode);
        setCountryInfo(data);
        setMapZoom(4);
      })
  };
  return (
    <div className="app">
      <div className="appLeft">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))

              }

            </Select>
          </FormControl>
        </div>
        <div className="appStat">
          <InfoBox
            isRed
            active={casesType === "cases"}
            title="Coronavirus Cases 😷" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} onClick={e => setCasesType("cases")} />
          <InfoBox
            active={casesType === "recovered"}
            title="Recoverd ✅" cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} onClick={e => setCasesType("recovered")} />

          <InfoBox
            isRed
            active={casesType === "deaths"}
            title="Deaths 💀" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} onClick={e => setCasesType("deaths")} />

        </div>
        <Map
          zoom={mapZoom}
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          country = {country}
        />
      </div>
      <Card className="appRight">
        {/* {Table} */}
        <CardContent>
          <h3>World wide Corona Virus {(casesType === "cases") ? "" : casesType} Cases</h3>
          <Table countries={tableData} />

          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
        {/* {Graph} */}
      </Card>

    </div>
  );
}

export default App;
