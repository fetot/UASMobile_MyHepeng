import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    fontFamily: 'Roboto',
    backgroundColor: '#1b262c'
  },
  container: {
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: 60
  },
  tinyLogo: {
    height: 110,
    width: 110
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    borderBottomColor: '#3282b8',
    borderBottomWidth: 0.8,
    color:"#fff"
  },
  inputPlaceholder: {
    fontWeight: 'bold',
    color: '#bbe1fa'
  },
  inputMargin: {
    marginVertical: 20
  },
  containerLogo: {
    alignItems: 'center',
    justifyContent:'center',
  },
  Logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    //fontStyle: 'italic',
  },
  text2: {
    fontSize: 16,
    marginBottom: 20,
    color: '#fff'
  },
  buttonLoSign: {
    marginTop: 10
  },
  signupButton: {
    alignItems: 'center',
    marginVertical: 20,
  }
})
