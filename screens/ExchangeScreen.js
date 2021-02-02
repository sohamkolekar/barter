import React from 'react';
import {View,Text,TextInput,StyleSheet, ToastAndroid,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase'
import db from '../config'

export default class Exchange extends React.Component{
    constructor(props){
        super(props)
        var Params=props.navigation.state.params.email
        console.log(Params)
        this.state={
            description:'',
            itemName:'',
            userName:Params
        }
    }
    addItem=async(ItemName,Description)=>{
        if(ItemName,Description){
            try{
                await db.collection('Items').add({
                    userName:this.state.userName,
                    itemName:ItemName,
                    description:Description
                })
                await db.collection('Users').doc(this.state.userName).collection('IndividualUserItems').add({
                    itemName:ItemName,
                    description:Description
                })
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            return Alert.alert("enter itemName and description"),
            console.log("enter itemName and description")
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>ExchangeScreen</Text>
                <TextInput
                    placeholder="Item Name"
                    keyboardType='default'
                    scrollEnabled={true}
                    keyboardAppearance='dark'
                    style={styles.itemBox}
                    onChangeText={text=>
                        this.setState({
                            itemName:text
                        })
                    }
                />
                <TextInput
                    placeholder="Description"
                    keyboardType='default'
                    scrollEnabled={true}
                    keyboardAppearance='dark'
                    multiline={true}
                    style={styles.descriptionBox}
                    onChangeText={text=>
                        this.setState({
                            description:text
                        })
                    }
                />
                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.addItem(this.state.itemName,this.state.description)}
                >

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
    itemBox:{
        width:150,
        height:50,
        borderWidth:3,
        borderColor:'lightgreen',
        marginTop:30
    },
    descriptionBox:{
        width:150,
        height:100,
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