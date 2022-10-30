import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const useAxiosGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const baseUrl = 'http://10.0.2.2:5000';

  const getRequest = apiUrl => {
    axios({
      method: 'get',
      url: `${baseUrl}` + apiUrl,
    })
      .then(response => {
        console.log('GET FUNKA I HOOK: : : ' + response.data);
        setData(response.data);
      })
      .catch(error => console.log('ERROR : : : ' + error));
  };

  const postRequest = (apiUrl, body) => {
    const newBox = {
      id: 1234,
      firstName: 'FRA API ? ? ?',
      lastName: 'funker velsdig bra',
      email: 'eivind er forsnøyd',
    };
    axios
      .post(`${baseUrl}` + apiUrl, newBox)
      .then(function (response) {
        console.log('POST REQUEST SUCESS: : : : ' + response);
      })
      .catch(function (error) {
        console.log('ERROR : : : ' + error);
      });
  };

  return {getRequest, postRequest, data};
};
