import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Button,
  TextInput
} from 'react-native';
import styles from '../styles/AndroidHome.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Expense extends React.Component {
    state = {
        myUser: null,
        nominal: '',
        deskripsi: '',
        tipe: '-',
        saldo_old: ''
      }
    
      componentDidMount() {
        auth()
          .onAuthStateChanged(user => {
            if (user) {
              this.setState({myUser : user})
            }
          })
    
          database() //mengambil data dari realtime database berdasarkan referensi uid user yang sedang login
          .ref(`/users/${auth().currentUser.uid}/saldo/`)
          .on('value', (snapshot) => {
            //console.log('Saldo: ', snapshot.val())
            this.setState({
                saldo_old : snapshot.val()
            })
          })
      }
    
      postIncome() {
            var saldo_old = parseInt(this.state.saldo_old)
            var nominal = parseInt(this.state.nominal)
            var saldo_new = saldo_old - nominal //mengurangi saldo awal dengan nominal pendapatan baru
            var data = {
                tipe : this.state.tipe,
                date : new Date().toDateString(),
                nominal : this.state.nominal,
                deskripsi : this.state.deskripsi
            }
    
            database()
            .ref(`/users/${auth().currentUser.uid}/transaksi/`).push(data) //menginput transaksi ke database
            .then(() => {
                database()
                .ref(`/users/${auth().currentUser.uid}`) //mengupdate saldo terbaru
                .update({
                saldo: saldo_new,
                })
                .then(() => {
                    console.log('Pengeluaran berhasil ditambah.')
                    ToastAndroid.show('Pengeluaran berhasil ditambah!', ToastAndroid.SHORT)
                })
            })

            this.inputNominal.clear();
            this.inputDeskripsi.clear();
  }
  
  render() {
    return(
      <View style={styles.wrapper}>
      <View style={styles.container}>

      <View style={styles.contInput}>
      <View style={styles.contInputInner}>
        <Text style={styles.boxTitle}>Nominal</Text>
        <View style={{flexDirection: 'row'}}>
        <FontAwesome 
            name="minus"
            color="red"
            size={20}
            style={{marginTop: 17}}
        />
        <TextInput
        style={styles.inputNominalExpense}
        keyboardType='numeric'
        maxLength={20}
        ref={(input) => this.inputNominal = input}
        placeholder='0'
        placeholderTextColor='red'
        value={this.state.nominal}
        onChangeText={value=> this.setState({nominal : value})}
        />
        </View> 
      </View>

      <View style={styles.contInputInner}>
        <Text style={styles.boxTitle}>Deskripsi</Text>
        <TextInput
        style={styles.input}
        keyboardType='default'
        maxLength={30}
        ref={(input) => this.inputDeskripsi = input}
        value={this.state.deskripsi}
        onChangeText={value=> this.setState({deskripsi : value})}
        />
      </View>
    </View>

      <View style={styles.logoutBtn}>
        <Button
          title='Tambahkan'
          color='#3282b8'
          onPress={this.postIncome.bind(this)}
        >
        </Button>
        </View>


        
      </View>
      </View>
    );

    
  }
}

export default Expense;
