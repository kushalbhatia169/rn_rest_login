import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';
//import { LOGIN } from './data/dummy-data';
import Chart from './screen/Charts';
import { ScrollView } from 'react-native-gesture-handler';

class App extends Component {

  state = {
    isLoggedIn: 'welcome',
    name: '',
    age:'',
    email:'',
    nationality:'',
    password: '',
    usernames : '',
    agess : '',
    mails : '',
    nationalitiess : '',
    id: '',
    returnSecureToken: true,
    idToken: '',
    userId: '',
    //dataExist : false
  }
  

  getSignUpValue = () => {
    console.log('inside get login');
    console.log( this.state.password, this.state.email);
    let email = this.state.email;
    let password = this.state.password;

    if(email === ''){
      Alert.alert('incorrect value', 'Please enter a valid username or password', [
        {text: 'okay'}]);
      return false;
    }
    if(password === ''){
      Alert.alert('incorrect value', 'Please enter a valid username or password', [
        {text: 'okay'}]);
      return false;
    }

   const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMtgUkWfdJNAh7W4nnhLeyhpl1BIY8nYs';
     axios.post( url , authData, {
       headers: {
         'Content-Type' : 'application/json'
       }
      })
      .then( response => {
        console.log(response.data);
        Alert.alert('successfull', 'user successfully signed in', [
          {text: 'okay'}]);
        this.setState({userId: response.data.localId});
        this.setState({idToken: response.data.idToken});
        this.setState({isLoggedIn: 'Get/Post'});
        })
      .catch(error => {
        console.log(error);
        console.log(authData);
        Alert.alert('Sorry! can not sign in', 'user already exist or may be server error!!', [
          {text: 'okay'}]);
       });
  };

  getLoginValue = () => {
    console.log('inside get login');
    console.log( this.state.password, this.state.email);
    let email = this.state.email;
    let password = this.state.password;
    
    if(email === ''){
      Alert.alert('incorrect value', 'Please enter a valid username or password', [
        {text: 'okay'}]);
      return false;
    }
    if(password === ''){
      Alert.alert('incorrect value', 'Please enter a valid username or password', [
        {text: 'okay'}]);
      return false;
    }

   const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMtgUkWfdJNAh7W4nnhLeyhpl1BIY8nYs';
     axios.post( url , authData, {
       headers: {
         'Content-Type' : 'application/json'
       }
      })
      .then( response => {
        console.log(response.data);
        Alert.alert('successfull', 'user successfully signed in', [
          {text: 'okay'}]);
        this.setState({idToken: response.data.idToken});
        this.setState({userId: response.data.localId});
        console.log(this.state.idToken);
        this.setState({isLoggedIn: 'Get/Post'});
        })
      .catch(error => {
        console.log(error);
        console.log(authData);
        Alert.alert('No user found', 'user does not exists', [
          {text: 'okay'}]);
       });
  };
  
    postData = () => {
      let username = this.state.name;
      let ages = this.state.age;
      let mail = this.state.email;
      let nationalities = this.state.nationality;
      let userId = this.state.userId;
      if(username === '' || ages === '' || mail === '' || nationalities === ''){
        Alert.alert('Empty fields found', 'Fields can not be empty', [
          {text: 'okay'}]);
        return false;
      }
      axios.get(`https://react-native-guide-abdab.firebaseio.com/infoUser/${userId}.json`)
      .then(response => {
        console.log(response.data);
       if(response.data === null){
         console.log(response.data);
         this.confirmPost();
       }
       else{
        Alert.alert('unsuccessful','Data for user already exists can not add new data try to update data', [
          {text: 'okay'}]);
        }
      }).catch(error => {
          console.log(error);
       });        
    }
    
    confirmPost = () => {
      let userId = this.state.userId;
      let username = this.state.name;
      let ages = this.state.age;
      let mail = this.state.email;
      let nationalities = this.state.nationality;

      axios.post(`https://react-native-guide-abdab.firebaseio.com/infoUser/${userId}.json?auth=${this.state.idToken}`, {
            username,
            ages,
            mail,
            nationalities,
            userId
          }).then(response => {
          console.log(response.data.name);
          this.setState({id: response.data.name});
        //  this.setState({dataExist : false});
          Alert.alert('successful', 'Data Successfully stored', [
            {text: 'okay'}]);
        }).catch(error => {
          console.log(error);
          Alert.alert('Sorry! request can not be sent', [
            {text: 'okay'}]);
        });
    }
    getData = () => {
      //id = '-MLlt3lIpR4YkIjP85jo';
      let id = '';
      let userId = this.state.userId
      
      axios.get(
        `https://react-native-guide-abdab.firebaseio.com/infoUser/${userId}.json`)
      .then(response => {
        console.log(Object.keys(response.data)[0]);
        id = Object.keys(response.data)[0];
        console.log(response.data[id]);
        this.setState({id : id});
        this.setState({usernames : response.data[id].username});
        this.setState({agess : response.data[id].ages});
        this.setState({mails : response.data[id].mail});
        this.setState({nationalitiess : response.data[id].nationalities});
        Alert.alert('successful', 'Data Successfully retrived', [
          {text: 'okay'}]);
      }).catch(error => {
        console.log(error);
        Alert.alert('Sorry!', 'user may not exist or may be server error!!', [
          {text: 'okay'}]);
       });
    }

    updData = () => {
      let username = this.state.usernames;
      let ages = this.state.agess;
      let mail = this.state.mails;
      let nationalities = this.state.nationalitiess;
      let userId = this.state.userId;
      let id = this.state.id;
      //id = '-MLlt3lIpR4YkIjP85jo';
      
      if(username === '' || ages === '' || mail === '' || nationalities === ''){
        Alert.alert('Empty fields found', 'Fields can not be empty', [
          {text: 'okay'}]);
        return false;
      }
      axios.patch(`https://react-native-guide-abdab.firebaseio.com/infoUser/${userId}/${id}.json?auth=${this.state.idToken}`, {
          username,
          ages,
          mail,
          nationalities
        }).then(response => {
        console.log(response.data);
        Alert.alert('successful', 'Data Successfully updated', [
          {text: 'okay'}]);
      });
    }

    delData = () => {
      let username = this.state.usernames;
      let ages = this.state.agess;
      let mail = this.state.mails;
      let nationalities = this.state.nationalitiess;
      let userId = this.state.userId;
      let id = this.state.id;
      //id = '-MLlt3lIpR4YkIjP85jo';
      
      if(username === '' || ages === '' || mail === '' || nationalities === ''){
        Alert.alert('Empty fields found', 'Fields can not be empty', [
          {text: 'okay'}]);
        return false;
      }
      axios.delete(`https://react-native-guide-abdab.firebaseio.com/infoUser/${userId}/${id}.json?auth=${this.state.idToken}`)
      .then(response => {
        console.log(response);
        this.setState({usernames : ''});
        this.setState({agess : ''});
        this.setState({mails : ''});
        this.setState({nationalitiess : ''});
        Alert.alert('successful', 'Data Successfully deleted', [
          {text: 'okay'}]);
      });
      
    }

    logOut = () => {
      this.setState({isLoggedIn: 'welcome',
          name: '',
          age:'',
          email:'',
          nationality:'',
          password: '',
          usernames : '',
          agess : '',
          mails : '',
          nationalitiess : '',
          id: '',
          returnSecureToken: true,
          idToken: '',
          userId: ''
     })
    }

  render() {
    let requestMethod = this.getLoginValue;
    let buttonTxt = 'Login';
    if(this.state.isLoggedIn === 'signUp'){
      requestMethod = this.getSignUpValue;
      buttonTxt = 'SignUp';
    }
    if(this.state.isLoggedIn === 'welcome'){
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({isLoggedIn: 'login'})}
          >
            <Text style={styles.buttonText}> Old User? Login </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({isLoggedIn: 'signUp'})}
          >
            <Text style={styles.buttonText}> New User? SignUp </Text>
          </TouchableOpacity>
        </View>
      );
    }
    else if (this.state.isLoggedIn === 'login' || this.state.isLoggedIn === 'signUp' ) {
        return (
        <View style={styles.container}>
          <TextInput
            value={this.state.email}
            keyboardType = 'email-address'
            onChangeText={(email) => this.setState({ email })}
            placeholder='email'
            placeholderTextColor = 'black'
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'password'}
            secureTextEntry={true}
            placeholderTextColor = 'black'
            style={styles.input}
          />
          
      
          <TouchableOpacity
            style={styles.button}
            onPress={requestMethod}
        >
          <Text style={styles.buttonText}> {buttonTxt} </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({isLoggedIn: 'welcome'})}
           >
          <Text style={styles.buttonText}> Back </Text>
           </TouchableOpacity>
          
        </View>
      );
    }
    else if(this.state.isLoggedIn === 'Get/Post'){
      return(
        <ScrollView  key={Math.random()}>
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({isLoggedIn: 'Post'})}
            >
            <Text style={styles.buttonText}> Send Data </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({isLoggedIn: 'Get'})}
            >
            <Text style={styles.buttonText}> Receive Data </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={styles.button}
              //onPress={() => this.setState({isLoggedIn: 'welcome'})}
              onPress = {this.logOut}
            >
            <Text style={styles.buttonText}> logout </Text>
            </TouchableOpacity>
            
            <Chart></Chart>
          </View>
        </ScrollView>
      )
    } 
    else if(this.state.isLoggedIn === 'Get'){
      return(
        <View style={styles.container}>
          <TextInput
            value={this.state.usernames}
            keyboardType = 'default'
            onChangeText={(usernames) => this.setState({ usernames })}
            placeholder='name'
            placeholderTextColor = 'black'
            style={styles.input}
          />
          <TextInput
            value={this.state.agess}
            onChangeText={(agess) => this.setState({ agess })}
            placeholder={'age'}
            keyboardType = 'decimal-pad'
            placeholderTextColor = 'black'
            style={styles.input}
          />
          <TextInput
            value={this.state.mails}
            onChangeText={(mails) => this.setState({ mails })}
            placeholder='email'
            placeholderTextColor = 'black'
            keyboardType = 'email-address'
            style={styles.input}
          />
          <TextInput
            value={this.state.nationalitiess}
            onChangeText={(nationalitiess) => this.setState({ nationalitiess })}
            placeholder={'nationality'}
            keyboardType = 'default'
            placeholderTextColor = 'black'
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.getData}
           >
          <Text style={styles.buttonText}> Get Data </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.updData}
           >
          <Text style={styles.buttonText}> Update Data </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={this.delData}
           >
          <Text style={styles.buttonText}> Delete Data </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({isLoggedIn: 'Get/Post'})}
           >
          <Text style={styles.buttonText}> Back </Text>
           </TouchableOpacity>
          
        </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
          <TextInput
            value={this.state.name}
            keyboardType = 'default'
            onChangeText={(name) => this.setState({ name })}
            placeholder='name'
            placeholderTextColor = 'black'
            style={styles.input}
          />
          <TextInput
            value={this.state.age}
            onChangeText={(age) => this.setState({ age })}
            placeholder={'age'}
            keyboardType = 'decimal-pad'
            placeholderTextColor = 'black'
            style={styles.input}
          />
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder='email'
            placeholderTextColor = 'black'
            keyboardType = 'email-address'
            style={styles.input}
          />
          <TextInput
            value={this.state.nationality}
            onChangeText={(nationality) => this.setState({ nationality })}
            placeholder={'nationality'}
            keyboardType = 'default'
            placeholderTextColor = 'black'
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.postData}
           >
          <Text style={styles.buttonText}> Send Data </Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({isLoggedIn: 'Get/Post'})}
           >
          <Text style={styles.buttonText}> Back </Text>
           </TouchableOpacity>
          
        </View>
      );
    }
    }

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container2: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
  titleText:{
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
});