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
import SnackbarComponent from '../../SnackbarComponent';
import AppContext from '../../AppContext';
import {Avatar} from 'react-native-elements';
import ThemedButton from 'react-native-really-awesome-button';

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
      setSnackbarState({
        active: true,
        text: 'Must enter correct username and password',
        textColor: 'red',
      });
      console.log('ERROR WHEN LOGGIN IN ' + err);
    }
  };

  const register = async (apiUrl, body) => {
    try {
      if (body.email != '' && body.password != '') {
        const response = await api.post(apiUrl, body);
        setSnackbarState({
          active: true,
          text: 'Registered user :' + body.username,
          textColor: 'green',
        });
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
          <View style={{backgroundColor: '#000080'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Avatar
                rounded
                size="xlarge"
                icon={{name: 'user', type: 'font-awesome'}}
                containerStyle={{flex: 2}}
              />
            </View>
            <Text></Text>

            <View style={styles.container}>
              <View>
                <TextInput
                  id="email"
                  label="Email"
                  value={loginUsername}
                  onChangeText={text => setLoginUsername(text)}
                  style={styles.input}
                />
              </View>
              <View>
                <TextInput
                  id="password"
                  label="Password"
                  value={loginPassword}
                  onChangeText={text => setLoginPassword(text)}
                  style={styles.input}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: '10%',
                }}>
                <ThemedButton
                  name="rick"
                  type="primary"
                  backgroundColor="#30D5C8"
                  width={150}
                  borderRadius={30}
                  borderWidth={1}
                  borderColor="#f7dd58"
                  onPress={() => {
                    login('/api/login', {
                      id: 0,
                      username: loginUsername,
                      email: loginUsername,
                      password: loginPassword,
                    });
                    console.log('kjører ny knapp');
                  }}>
                  Login
                </ThemedButton>
              </View>
            </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>

            <View
              style={{
                marginTop: '10%',
                marginBottom: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View style={{marginRight: '2%'}}>
                <ThemedButton
                  name="rick"
                  type="primary"
                  backgroundColor="#f01919"
                  width={100}
                  borderRadius={20}
                  borderWidth={1}
                  borderColor="#f7dd58"
                  onPress={logout}>
                  Log out
                </ThemedButton>
              </View>
              <View style={{marginLeft: '2%'}}>
                <ThemedButton
                  name="rick"
                  type="primary"
                  backgroundColor="green"
                  width={100}
                  borderRadius={20}
                  borderWidth={1}
                  borderColor="#f7dd58"
                  onPress={flipShowRegister}>
                  Register
                </ThemedButton>
              </View>
            </View>
            {showRegister && (
              <View style={{marginBottom: '10%'}}>
                <View>
                  <TextInput
                    id="username"
                    label="Username"
                    value={registerUsername}
                    onChangeText={text => setRegisterUsername(text)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <TextInput
                    id="email"
                    label="Email"
                    value={registerEmail}
                    onChangeText={text => setRegisterEmail(text)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <TextInput
                    id="password"
                    label="Password"
                    value={registerPassword}
                    onChangeText={text => setRegisterPassword(text)}
                    style={styles.input}
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5%',
                    marginBottom: '5%',
                  }}>
                  <ThemedButton
                    name="rick"
                    type="primary"
                    backgroundColor="green"
                    width={125}
                    borderRadius={20}
                    borderWidth={1}
                    borderColor="#f7dd58"
                    onPress={() => {
                      register('/api/register', {
                        id: 0,
                        username: registerUsername,
                        email: registerEmail,
                        password: registerPassword,
                      });
                    }}>
                    Register user
                  </ThemedButton>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <SnackbarComponent></SnackbarComponent>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {backgroundColor: 'white', padding: 20},
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 50,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
});
