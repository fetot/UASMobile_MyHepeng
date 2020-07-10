import React from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import styles from '../styles/AndroidHome.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';

class Home extends React.Component {

  state = {
    myUser: null,
    data_user: [],
    data_transaksi: [],
  }

  componentDidMount() {
    auth()
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({myUser : user})
        }
      })

      database() //mengambil data user dari realtime database berdasarkan referensi uid user yang sedang login
      .ref(`/users/${auth().currentUser.uid}`)
      .on('value', (snapshot) => {
        this.setState({
          data_user : snapshot.val()
        })
      })

      database() //mengambil data transaksi dari realtime database berdasarkan referensi uid user yang sedang login
      .ref(`/users/${auth().currentUser.uid}/transaksi`)
      .on('value', (snapshot) => {
        //console.log('Data transaksi: ', snapshot.val())
        if(snapshot.val()){
          var data = snapshot.val()
          var items = []
          for(var key in data){
              var item = data[key]
              item.key = key
              items.unshift(item)
          }
          this.setState({data_transaksi : items})
        }else{
          this.setState({data_transaksi : []})
        }
      })
  }
  
  render() {
    return(
      <ScrollView style={styles.wrapper}>
      <View style={styles.container}>

      <Text style={{marginHorizontal: 12, color: '#bbe1fa', fontWeight: 'bold', fontSize: 22, padding: 10, marginTop: 6}}>
            <Icon name="ios-home" color="#bbe1fa" size={20} /> Dasbor Saya
        </Text>

        <View style={styles.contBalance}>
          <Text style={styles.boxTitle}>
            <Icon name="ios-cash-outline" color="#bbe1fa" size={14} /> Saldo
          </Text>
          <View style={styles.contTextBalance}>
              <NumberFormat value={this.state.data_user.saldo} renderText={value => <Text style={styles.textBalance}>{value}</Text>} displayType={'text'} thousandSeparator={true} prefix={'Rp '} />
          </View>
        </View>
        <View style={styles.contBalance}>
          <Text style={styles.boxTitle}>
            <Icon name="ios-calendar-outline" color="#bbe1fa" size={14} /> Riwayat Transaksi
          </Text>
          <View style={styles.contTransaction}>
          {
            this.state.data_transaksi.map((item, index)=>(
              <View style={styles.transactionList}>
              <Text style={{color : '#fff', fontSize : 15, flex: 3}}>{item.deskripsi}</Text>
              <View style={{flex: 3, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text style={{color : 'lightgrey', fontSize : 15, textAlign: 'right'}}>{item.date}</Text>
                <Text style={styles.transactionListNominal}>{item.tipe}<NumberFormat value={item.nominal} renderText={value => <Text>{value}</Text>} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /></Text>
              </View>
            </View>
            ))
          }
          
          </View>
        </View>
      </View>
      </ScrollView>
    );

    
  }
}

export default Home;
