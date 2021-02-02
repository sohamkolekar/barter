import React from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet, Alert,ToastAndroid,Modal,ScrollView} from 'react-native'
import firebase from 'firebase';
import db from '../config'

export default class Welcome extends React.Component{
    constructor(){
        super()
        this.state={
           firstName:'',
           lastName:'',
           phoneNo:'',
           address:'',
           email:'',
           password:'',
           confirmedPassword:'',
           isVisible:false
        }
    }

    showModal=()=>{
      
       return(
           <View>
        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isVisible}>
            <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
            <TextInput
            placeholder="FirstName"
            maxLength={8}
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    firstName:text
                })
            }/>
             <TextInput
            placeholder="lastName"
            maxLength={8}
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    lastName:text
                })
            }/>
             <TextInput
            placeholder="Phone Number"
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    phoneNo:text
                })
            }/>
             <TextInput
            placeholder="Address"
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    address:text
                })
            }/>
             <TextInput
            placeholder="EmailID"
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    email:text
                })
            }/>
             <TextInput
            placeholder="Password"
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    password:text
                })
            }
            value={this.state.password}/>
             <TextInput
            placeholder="ConfirmPassword"
            style={styles.inputBox}
            onChangeText={text=>
                this.setState({
                    confirmedPassword:text
                })
            }
            value={this.state.confirmedPassword}/>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.UserSignUp(this.state.email,this.state.password,this.state.confirmedPassword)}
                >
                    <Text>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.setState({
                    isVisible:false
                })}
                >
                    <Text>Cancel</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
        </Modal>
        </View>
       )
    }

    UserSignUp=async(Email,Password,ConfirmPassword)=>{
        console.log(this.state.confirmedPassword)
        console.log(ConfirmPassword,Password)
        if(ConfirmPassword===Password){
            console.log("hi")
            var submitMessage="User created Successfully"
            if(Email&&Password){
                try{
                    const response=await firebase.auth().createUserWithEmailAndPassword(Email,Password)
                    //console.log(response)
                    if(response){
                        console.log(submitMessage)
                       
                        db.collection('Users').doc(this.state.email).set({
                            firstName:this.state.firstName,
                            lastName:this.state.lastName,
                            phoneNo:this.state.phoneNo,
                            address:this.state.address,
                            email:this.state.email,
                        })
                        return ToastAndroid.show(submitMessage,ToastAndroid.SHORT)
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
            else{
                return Alert.alert("please enter username/password")
                console.log("please enter username/password")
            }
        } 
        else{
            this.setState({
                confirmedPassword:'',
                password:''
            })
           return Alert.alert("passwords doesn't match"),
            console.log("passwords doesn't match")
            
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
                    this.props.navigation.navigate("ExchangePage",{email:this.state.email})
                   // ToastAndroid.show(submitMessage,ToastAndroid.SHORT)
                   
                 }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            return Alert.alert("please enter username/password"),
            console.log("please enter username/password")
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Welcome Screen</Text>
                {
                    this.showModal()
                }
                <TextInput
                placeholder="EmailID"
                style={styles.inputBox}
                onChangeText={text=>
                    this.setState({
                        email:text
                    })
                }/>
                <TextInput
                placeholder="Password"
                style={styles.inputBox}
                onChangeText={text=>
                    this.setState({
                        password:text
                    })
                }/>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.UserLogin(this.state.email,this.state.password)}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    this.setState({
                        isVisible:true
                    })
                    
                }}
                >
                    <Text>SignUp</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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
    },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
})