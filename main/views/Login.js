import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native';
import styles from '../styles/Android.style';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  LoginAuth() {
    if (this.state.email != ''){
      if (this.state.password != ''){
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        RootNavigation.navigate('Home')
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show('Email atau Password salah!', ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('Email atau Password salah!', ToastAndroid.SHORT)
        }
      })
    }else{ToastAndroid.show('Password tidak boleh kosong!', ToastAndroid.SHORT)}
  }else{ToastAndroid.show('Email tidak boleh kosong!', ToastAndroid.SHORT)}
  }

  render() {
    return(
      <View style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.containerLogo}>
        <Image
          style={styles.Logo}
          source={require('../assets/Logo/logo.png')}
        />
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>My Hepeng</Text>
          <Text style={styles.text2}>Masuk untuk mengatur keuangan kamu!</Text>
        </View>
        <View style={styles.inputMargin}>
          <Text style={styles.inputPlaceholder}>Email</Text>
          <TextInput
            autoCapitalize='none'
            style={styles.input}
            returnKeyType='next'
            onSubmitEditing={() => this.inputPassword.focus()}
            keyboardType='email-address'
            onChangeText={(value) => this.setState({email : value})}
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
            onSubmitEditing={this.LoginAuth.bind(this)}
            onChangeText={(value) => this.setState({password : value})}
          />
        </View>
        <View style={styles.buttonLoSign}>
          <Button
            title='Masuk'
            color='#3282b8'
            onPress={this.LoginAuth.bind(this)}
          >
          </Button>
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={() => RootNavigation.navigate('SignUp')}>
          <Text style={{color:'#bbe1fa'}}>
            <Text>Belum punya akun?</Text>
            <Text style={styles.boldText}> Daftar sekarang</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems:'center'}} /**onPress={() => RootNavigation.navigate()}**/>
          <Text style={{color:'#bbe1fa'}}>
            <Text style={styles.boldText}> Tidak bisa masuk?</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;
