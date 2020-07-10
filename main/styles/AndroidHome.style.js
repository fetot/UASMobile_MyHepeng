import {
    StyleSheet
  } from 'react-native';
  
  export default StyleSheet.create({

  container: {
    justifyContent: 'center',
    fontFamily: 'Roboto',
    marginBottom: 14
  },
  wrapper: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  boxTitle: {
    color: '#bbe1fa',
    fontSize: 14,
    marginBottom: 16
  },
  contBalance: {
    backgroundColor: '#414B58',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12
  },
  contInput: {
    backgroundColor: '#414B58',
    marginHorizontal: 10,
    marginTop: 12,
    padding: 14
  },
  contInputInner: {
    marginVertical: 7,
  },
  contTextBalance: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  conTransaction: {
    margin: 10,
  },
  textBalance: {
    color: 'lime',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24
  },
  contProfileInfo: {
    backgroundColor: '#414B58',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12,
  },
  profileInfo: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3282b8'
  },
  logoutBtn: {
    marginHorizontal: 10,
    marginVertical: 16
  },
  inputNominalIncome: {
    borderBottomColor: '#3282b8',
    borderBottomWidth: 1,
    color: 'lime',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 10,
  },
  inputNominalExpense: {
    borderBottomColor: '#3282b8',
    borderBottomWidth: 1,
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 10,
  },
  input: {
    borderBottomColor: '#3282b8',
    borderBottomWidth: 1,
    color: '#fff',
    fontSize: 14,
  },
  transactionList: {
    flex: 1,
    borderBottomColor: '#3282b8',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  transactionListNominal: {
    color : '#bbe1fa', 
    fontSize : 15, 
    textAlign: 'right'
  },
})