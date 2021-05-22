import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput,  } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            text:"",
        }
    }
    getWord=(text)=>{
        var text=text.toLowerCase()
        try{
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var definition = dictionary[text]["definition"]
            this.setState({
                "word":word,
                "lexicalCategory":lexicalCategory,
                "definition":definition,
            })
        }
        catch(err){
            alert("Sorry This word is not is not available for now")
            this.state.text({
                'text':'',
                'isSearchPressed':false
            })
        }
    }
    render(){
        return(
            <View>
                <Header
                    backgroundColor='purple'
                    centerComponent={{
                        text: 'Pocket Dictionary',
                        style: { color: '#fff', fontSize: 20},
                    }}/>
                <TextInput
                    style={StyleSheet.inputBoxContainer}
                    onChangeText={text =>{
                        this.setState({
                            text:text,
                            isSearchPressed: false,
                            word: "Loading...",
                            lexicalCategory:'',
                            examples: [],
                            definition:"",
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={()=>{
                        
                        this.getWord(this.state.text)
                    }}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.word}
                    </Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:20,}}>
                    <Text style={styles.detailsTitle}>
                        Definition :{""}
                    </Text>
                    <Text style={{fontSize:15}}>
                        {this.state.definition}
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBoxContainer:{
        width:'80%',
        flex:0.3,
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        borderWidth:5,
        marginTop:50,
    },
    searchButton:{
        borderWidth:1,
        borderRadius:3,
        width:110,
        alignSelf:'center',
        marginTop:15,
    },
    text:{
        textAlign:'center',
    },
    detailsContainer:{
        textAlign:'center',
        marginTop:20,
    },
    detailsTitle:{
        textAlign:'left',
        color:'orange',
        fontWeight:'bold',
    }
})