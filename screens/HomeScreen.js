import React from 'react';
import {View,Text,FlatList} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            allItems:[]
        }
    }
    renderItems=async()=>{
        var items=await db.collection('Items').get()
       
        items.docs.map((doc)=>{
            this.setState({
                allItems:[...this.state.allItems,doc.data()]
            })
        })
        console.log(this.state.allItems)
    
    }
    componentDidMount=()=>{
        this.renderItems()
    }
    
    render(){
        return(
            <View>
                <ScrollView>
                <Text>HomeScreen</Text>
                <FlatList
                data={this.state.allItems}
                renderItem={({item,index})=>(
                    
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:2}}>
                        <Text>{"username:"+item.userName}</Text>
                        <Text>{"item name:"+item.itemName}</Text>
                        <Text>{"description:"+item.description}</Text>
                        <TouchableOpacity
                        style={{width:50,height:20,backgroundColor:"red"}}
                        onPress={()=>{
                            console.log(index)
                        }}>


                        </TouchableOpacity>
                       
                    </View>
                    
                )}
                keyExtractor={(item,index)=>index.toString()}
                />
                </ScrollView>
                
            </View>
            
            
        )
    }
}

var Index=[]