import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");

  const getData = async () => {
    try {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  );

  const cardWrapper = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
          placeholder="Search for countries..."
        />
      </div>{" "}
      <div style={cardWrapper}>
        {" "}
        {filteredCountries.map((item) => (
          <div key={item.cca3} className="countryCard">
            <img
              src={item.flags.png}
              alt={`Flag of ${item.name.common}`}
              style={{ width: "100px", height: "100px" }}
              width="100"
              height="100"
            />
            <h2> {item.name.common} </h2>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default App;
