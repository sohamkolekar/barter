import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet, Alert,ToastAndroid,Modal} from 'react-native'
import firebase from 'firebase';
import db from '../config'

export default class SignUpLogin extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

   

    UserSignUp=async(Email,Password)=>{
        console.log("hi")
        var submitMessage="User created Successfully"
        if(Email&&Password){
            try{
                 const response=await firebase.auth().createUserWithEmailAndPassword(Email,Password)
                 //console.log(response)
                 if(response){
                   
                    
                   console.log(submitMessage)
                 }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            Alert.alert("please enter username/password")
            console.log("please enter username/password")
        }
    }

    UserLogin=async(Email,Password)=>{
        var submitMessage="User Loggedin Successfully"
        if(Email&&Password){
            try{
                 const response=await firebase.auth().signInWithEmailAndPassword(Email,Password)
                 //console.log(response)
                 if(response){
                   
                    
                   console.log(submitMessage)
                 }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            Alert.alert("please enter username/password")
            console.log("please enter username/password")
        }
    }

    render(){
        return(
            <View>
                <Text>Welcome to Sign Up Login Screen</Text>
                
                <TextInput
                placeholder="email |"
                style={styles.inputBox}
                onChangeText={text=>
                    this.setState({
                        email:text
                    })
                }
                />

                 <TextInput
                placeholder="password |"
                style={styles.inputBox}
                onChangeText={text=>
                    this.setState({
                        password:text
                    })
                }
                />

                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.UserLogin(this.state.email,this.state.password)}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.UserSignUp(this.state.email,this.state.password)}
                >
                    <Text>Signup</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    inputBox:{
        width:150,
        height:50,
        borderWidth:3,
        borderColor:'lightgreen',
        marginTop:30
    },
    button:{
        width:80,
        height:28,
        backgroundColor:'tomato',
        borderWidth:3,
       
        marginTop:30
    }

})