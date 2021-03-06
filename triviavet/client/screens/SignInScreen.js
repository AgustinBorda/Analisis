 import React from 'react';
import { API_HOST } from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Login!
         </Text>

        <TextInput
          placeholder="Username"
          autoCompleteType='username'
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />
         <View style={{margin:20}} />

        <TextInput
          placeholder="Password"
          autoCompleteType='password'
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Button title="Sign in" onPress={this._signIn}
          color = "#d35400"
        />
         <View style={{margin:20}} />
        <Button title="Create account" onPress={() => this.props.navigation.navigate('Create')}
          color = "#d35400"
        />
        <View style={{margin:20}} />
       <Button title="Reset password" onPress={() => this.props.navigation.navigate('ResetPass')}
         color = "#d35400"
       />
      </View>
    );
  }

  _signIn = () => {
    const { username, password } = this.state;


    axios.post(API_HOST+"/login", {
      username: username,
      password: password,
    }, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        // Handle the JWT response here
        AsyncStorage.setItem('userToken', response.config.headers.Authorization);
        console.log(response.config.headers.Authorization);
        this.props.navigation.navigate('App');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username or Password incorrect");
        return;
      }
      alert(API_HOST+"\n"+error);
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1b4f72',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'#ffffff',
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eceef1'
  }
})
