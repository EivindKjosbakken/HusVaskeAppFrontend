import axios from 'axios';
import React, {useEffect, useState} from 'react';

export const useAxiosGet = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  const baseUrl = 'http://localhost:5000';

  const getRequest = async apiUrl => {
    await axios({
      method: 'get',
      url: `${baseUrl}` + apiUrl,
    })
      .then(response => {
        setData(response.data);
        //console.log('RESP:' + JSON.stringify(response.data));
        //console.log('HER RETURNESRE DET' + JSON.stringify(response.data));
        //console.log('METHOD IS RETURNING:' + JSON.stringify(response.data));
        console.log('method returning');
        return 'dette er en string';
      })
      .catch(error =>
        console.log(
          'ERROR IN GET  : : : ' +
            error +
            ' HAVE YOU TURNED ON BACKEND / MADE SURE CONNECTION IS REVERSED',
        ),
      );
  };

  return {getRequest, data};
};
