import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const useAxiosPost = (url, payload) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const baseUrl = 'http://localhost:5000'; //  eller: const baseUrl = 'http://10.0.2.2:5000';

  const postRequest = async (apiUrl, body) => {
    const response = await axios
      .post(`${baseUrl}` + apiUrl, body)
      .then(function (response) {
        console.log('SUCESS: : : : ' + response);
      })
      .catch(function (error) {
        console.log(
          'ERROR : : : ' +
            error +
            ' HAVE YOU TURNED ON BACKEND / MADE SURE CONNECTION IS REVERSED',
        );
      });
    console.log('RESPONSE ER : : : ' + response);
    return response;
  };

  return {data, postRequest};
};
