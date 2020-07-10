import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import styles from '../styles/Android.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as RootNavigation from '../RootNavigation';

class SignUp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      userid: '',
      firstname: '',
      lastname: '',
      inputJob: '',
      saldo: 0
    }
  }

  SignUpAuth() {
    if (this.state.email != ''){
      if (this.state.password != ''){
        if (this.state.firstname != '' && this.state.lastname != '' && this.state.inputJob != ''){
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password) //daftar email & password dengan rnfirebase auth
      .then(() => {
        database()
          .ref(`/users/${auth().currentUser.uid}`) //menambahkan informasi tambahan user ke realtime database dengan referensi uid yang telah didaftarkan di auth sebelumnya
          .set({
            uid: auth().currentUser.uid,
            name: this.state.firstname + ' ' + this.state.lastname,
            email: auth().currentUser.email,
            job: this.state.inputJob,
            saldo: this.state.saldo
          })
          .then(() => {
            RootNavigation.navigate('Home')
          })
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Alamat email tidak valid!', ToastAndroid.SHORT)
        } 
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show('Alamat email sudah digunakan!', ToastAndroid.SHORT)
        }
      })
      }else{ToastAndroid.show('Informasi tidak boleh kosong!', ToastAndroid.SHORT)}
    }else{ToastAndroid.show('Password tidak boleh kosong!', ToastAndroid.SHORT)}
  }else{ToastAndroid.show('Email tidak boleh kosong!', ToastAndroid.SHORT)}
  }

  render() {
    return (
      <View style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.text2}>Daftar Akun</Text>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            returnKeyType='next'
            ref={(input) => this.inputEmail = input}
            keyboardType='email-address'
            onSubmitEditing={() => this.inputFirstName.focus()}
            onChangeText={(value) => this.setState({email : value})}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Nama Depan</Text>
          <TextInput
            style={styles.input}
            ref={(input) => this.inputFirstName = input}
            autoCapitalize="words"
            returnKeyType='next'
            onSubmitEditing={() => this.inputLastName.focus()}
            onChangeText={(value) => this.setState({firstname : value})}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Nama Belakang</Text>
          <TextInput
            style={styles.input}
            ref={(input) => this.inputLastName = input}
            autoCapitalize="words"
            returnKeyType='next'
            onSubmitEditing={() => this.inputJob.focus()}
            onChangeText={(value) => this.setState({lastname : value})}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Pekerjaan</Text>
          <TextInput
            style={styles.input}
            ref={(input) => this.inputJob = input}
            autoCapitalize="words"
            returnKeyType='next'
            onSubmitEditing={() => this.inputFirstName.focus()}
            onChangeText={(value) => this.setState({inputJob : value})}
          />
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            returnKeyType='go'
            maxLength={16}
            ref={(input) => this.inputPassword = input}
            onSubmitEditing={this.SignUpAuth.bind(this)}
            onChangeText={(value) => this.setState({password : value})}
          />
        </View>
        <View style={styles.buttonLoSign}>
          <Button title='Daftar sekarang!' color='#3282b8' onPress={this.SignUpAuth.bind(this)}></Button>
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

export default SignUp;
