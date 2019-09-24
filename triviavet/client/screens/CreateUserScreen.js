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

export default class CreateUserScreen extends React.Component {
  static navigationOptions = {
    title: 'Create account',
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
        <Text style={styles.welcome}> Create Acount </Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Button title="Sign in" onPress={this._signUp} 
         color = "#e0e241"
        />
        
         <View style={{margin:20}} />
        <Button
          onPress={() => this.props.navigation.navigate('Auth')}
          title="back"
           color = "#e0e241"
        />

      </View>
    );
  }
  _signUp = async () => {
    const { username, password } = this.state;

    axios.post(API_HOST+"/users", {
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
        AsyncStorage.setItem('username',username);
        this.props.navigation.navigate('App');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("User already exists");
        return;
      }
      if(error.toString().match(/403/)) {
        alert("Invalid Username or password");
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
    backgroundColor: '#48c9b0',
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
