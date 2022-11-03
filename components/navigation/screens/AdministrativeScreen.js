import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Provider,
  Snackbar,
} from 'react-native-paper';
import {create} from 'react-test-renderer';
import api from '../../api/posts';
import SInfo from 'react-native-sensitive-info';
import CreateGroupForm from '../../CreateGroupForm';
import AddUserToGroupForm from '../../AddUserToGroupForm';
import SnackbarComponent from '../../SnackbarComponent';
import AppContext from '../../AppContext';

export default AdministrativeScreen = () => {
  const {snackbarState, setSnackbarState, setUserState} =
    useContext(AppContext);

  const [username, setUsername] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [showRegister, setShowRegister] = useState(false);

  const flipShowRegister = () => {
    setShowRegister(!showRegister);
  };

  const login = async (apiUrl, body) => {
    SInfo.setItem('token', '', {});
    SInfo.setItem('userid', '', {});
    SInfo.setItem('username', '', {});
    await setUsername('');

    try {
      if (body.email != '' && body.password != '') {
        const response = await api.post(apiUrl, body);
        SInfo.setItem('token', response.data.token, {});
        SInfo.setItem('userid', response.data.id, {});
        SInfo.setItem('username', response.data.username, {});
        setUserState({isLoggedIn: true});

        await setUsername(response.data.username);
        console.log(await SInfo.getItem('token', {}));

        setSnackbarState({
          active: true,
          text: 'Logged in as: ' + response.data.username,
          textColor: 'green',
        });
      } else {
        setSnackbarState({
          active: true,
          text: 'Must enter correct username and password',
          textColor: 'red',
        });
      }
    } catch (err) {
      alert('error when logging in');
      console.log('ERROR WHEN LOGGIN IN ' + err);
    }
  };

  const register = async (apiUrl, body) => {
    try {
      if (body.email != '' && body.password != '') {
        const response = await api.post(apiUrl, body);
      } else {
        console.log('Did not have username or password');
      }
    } catch (err) {
      console.log('ERROR WHEN REGISTERING: ' + err);
      setSnackbarState({
        active: true,
        text: 'Error when registering, make sure email is unique',
        textColor: 'red',
      });
    }
  };

  const logout = async () => {
    SInfo.setItem('token', '', {});
    SInfo.setItem('userid', '', {});
    SInfo.setItem('username', '', {});
    setUserState({isLoggedIn: false});

    await setUsername('');
    setSnackbarState({
      active: true,
      text: 'You logged out',
      textColor: 'green',
    });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text></Text>

          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 25}}>
            Login:
          </Text>
          <View>
            <View>
              <TextInput
                id="email"
                label="Email"
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
                <Text style={{color: 'green'}}>Login</Text>
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
              <Text style={{color: 'green'}}>Register</Text>
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
          <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Button onPress={logout}>
              <Text style={{color: 'red'}}>Logout</Text>
            </Button>
          </View>
        </ScrollView>
        <SnackbarComponent></SnackbarComponent>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20},
});
