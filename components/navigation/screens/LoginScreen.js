import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../../api/posts';
import SInfo from 'react-native-sensitive-info';

export default LoginScreen = () => {
  const [userName, setUsername] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [showRegister, setShowRegister] = useState(false);

  const flipShowRegister = () => {
    setShowRegister(!showRegister);
  };

  const fetchAndSetUsername = async id => {
    try {
      const response = await api.get('/api/getusername/' + id);
      setUsername(response.data);
    } catch (err) {
      console.log('GOT ERROR WHEN FETCHING TASKS ' + err);
    }
  };

  const login = async (apiUrl, body) => {
    try {
      if (body.email != '' && body.password != '') {
        const response = await api.post(apiUrl, body);
        SInfo.setItem('token', response.data.token, {});
        SInfo.setItem('id', response.data.id, {});
        console.log('LOGGA INN');
        SInfo.getItem('id', {}).then(obj => fetchAndSetUsername(obj));
        //console.log("username:"+)
        //setUsername(SInfo.getItem('id'), {});
      } else {
        console.log('Did not have username or password');
      }
    } catch (err) {
      console.log('ERROR WHEN LOGGIN IN ' + err);
    }
  };

  const register = async (apiUrl, body) => {
    try {
      if (body.email != '' && body.password != '') {
        const response = await api.post(apiUrl, body);
        console.log(JSON.stringify(body) + ' POST WORKED:' + response.data);
      } else {
        console.log('Did not have username or password');
      }
    } catch (err) {
      console.log('ERROR WHEN REGISTERING: ' + err);
    }
  };

  /*
  let currId = SInfo.getItem('id', {});
  currId.then(e => console.log('ID IS:' + e));
  let currToken = SInfo.getItem('token', {});
  console.log('TOKEN:' + currToken);
  currToken.then(obj => console.log('TOKEN IS:' + obj));
  */

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {userName !== '' && (
            <Text style={{fontSize: 20}}>Username: {userName}</Text>
          )}
          <Text></Text>
          <Text></Text>

          <View>
            <View>
              <TextInput
                id="username"
                label="Username"
                value={loginUsername}
                onChangeText={text => setLoginUsername(text)}
              />
            </View>
            <View>
              <TextInput
                id="password"
                label="Password"
                value={loginPassword}
                onChangeText={text => setLoginPassword(text)}
              />
            </View>
            <View>
              <Button
                onPress={() => {
                  login('/api/login', {
                    id: 0,
                    username: loginUsername,
                    email: loginUsername,
                    password: loginPassword,
                  });
                }}
                outlined>
                Login
              </Button>
            </View>
          </View>

          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
          <Button onPress={flipShowRegister}>
            {showRegister ? (
              <Text>Hide register</Text>
            ) : (
              <Text>Register here</Text>
            )}
          </Button>
          {showRegister && (
            <View>
              <View>
                <TextInput
                  id="username"
                  label="Username"
                  value={registerUsername}
                  onChangeText={text => setRegisterUsername(text)}
                />
              </View>
              <View>
                <TextInput
                  id="email"
                  label="Email"
                  value={registerEmail}
                  onChangeText={text => setRegisterEmail(text)}
                />
              </View>
              <View>
                <TextInput
                  id="password"
                  label="Password"
                  value={registerPassword}
                  onChangeText={text => setRegisterPassword(text)}
                />
              </View>
              <View>
                <Button
                  onPress={() => {
                    register('/api/register', {
                      id: 0,
                      username: registerUsername,
                      email: registerEmail,
                      password: registerPassword,
                    });
                  }}
                  outlined>
                  <Text>Register</Text>
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
