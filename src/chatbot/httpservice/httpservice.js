import React from 'react';


class Httpservice extends React.Component {
  constructor(props) {
    super();
  }

  async getData(stringUrl) {

      const request = await fetch(stringUrl);

      if (request.ok) {
        const response = await request.json();
        const dataForChar = {
          name: response.name,
          temp: Math.floor(Number(response.main.temp) - 273.15),
          pressure: response.main.pressure,
          windSpeed: response.wind.speed
        }
        return dataForChar;

      }  else {
        throw new Error(request.statusText)
      }

  }

  async getOtherData(stringUrl) {

    const request = await fetch(stringUrl);

    if (request.ok) {
      const response = await request.json();
      return response;


    }  else {
      throw new Error(request.statusText)
    }

}





}

export default Httpservice;
