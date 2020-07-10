import React, { useEffect } from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Button
} from 'react-native';
import styles from '../styles/AndroidHome.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';

class Profile extends React.Component {
  state = {
    myUser: null,
    data_user: []
  }

  componentDidMount() {
    auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({myUser : user})
        }
      })
    
    database() //mengambil data dari realtime database berdasarkan referensi uid user yang sedang login
      .ref(`/users/${auth().currentUser.uid}`)
      .once('value')
      .then(snapshot => {
        //console.log('User data: ', snapshot.val())
        this.setState({data_user : snapshot.val()})

      })
    
  }

  LogOut() {
    auth()
      .signOut()
      .then(() => ToastAndroid.show('Kamu berhasil keluar!', ToastAndroid.SHORT))
  }
  
  render() {
    return(
      <View style={styles.wrapper}>
      <View style={styles.container}>
        
        <Text style={{marginHorizontal: 12, color: '#bbe1fa', fontWeight: 'bold', fontSize: 22, padding: 10, marginTop: 6}}>
            <Icon name="ios-person" color="#bbe1fa" size={20} /> Profil Saya
        </Text>
        <View style={styles.contProfileInfo}>
            <View style={styles.profileInfo}>
                <Text style={{fontSize: 12, color:'#bbe1fa', marginBottom: 2}}>Email</Text>
                <Text style={{fontSize: 16, color:'#fff', marginBottom: 12}}>{this.state.data_user.email}</Text>
            </View>
            <View style={styles.profileInfo}>
                <Text style={{fontSize: 12, color:'#bbe1fa', marginBottom: 2}}>Nama</Text>
                <Text style={{fontSize: 16, color:'#fff', marginBottom: 12}}>{this.state.data_user.name}</Text>
            </View>
            <View style={styles.profileInfo}>
                <Text style={{fontSize: 12, color:'#bbe1fa', marginBottom: 2}}>Pekerjaan</Text>
                <Text style={{fontSize: 16, color:'#fff', marginBottom: 12}}>{this.state.data_user.job}</Text>
            </View>
        </View>
        <View style={styles.logoutBtn}>
        <Button
          title='Keluar'
          color='#3282b8'
          onPress={this.LogOut.bind(this)}
        >
        </Button>
        </View>
        
      </View>
      </View>
    );

    
  }
}

export default Profile;
