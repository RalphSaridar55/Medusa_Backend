import React, { Component, createRef } from 'react';
import SelectMultiple from "react-native-select-multiple";
import * as apiPortFolioServices from "../../core/apis/apiPortfolioServices";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Touchable,
} from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import { List, Checkbox, Button, Appbar, Searchbar, IconButton, Title } from 'react-native-paper';
import Slider from "react-native-sliders";
import styles from './listing_style';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const actionSheetRef = createRef();
const actionSheetCat = createRef();
const colors=[
    {label:'White',value:1,},
    {label:'Red',value:2,},
    {label:'Blue',value:3,},
    {label:'Black',value:4,},
]
const brands=[
    {label:'Samsung',value:1,},
    {label:'Lenovo',value:2,},
    {label:'Huawei',value:3,},
    {label:'Apple',value:4,},
]
const data=[
    { id: 1, name: "116 smart watch ", brand:'Lenovo' ,status: "$0.66 - $3.46", moq: "10", av: '100', color:'White',image: "https://sc04.alicdn.com/kf/H8620b8f47fd14c94b8cb5ae677418c2bl.jpg", topSelling:3000 ,date:'2019-10-02', category:'Electronics', subcategory:''},
    { id: 2, name: "Q12 Smartwatch", brand:'Lenovo' ,status: "$0.76 - $3.46", moq: "20", av: '100', color:'White',image: "https://sc04.alicdn.com/kf/H5a25154aed3a441cb7bbaeefb22689baS.jpg", topSelling:2000 ,date:'2020-10-02', category:'Electronics', subcategory:''},
    { id: 3, name: "Q12 Smartwatch", brand:'Lenovo' ,status: "$0.12 - $7.55", moq: "5", av: '200', color:'Blue',image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", topSelling:2000 ,date:'2018-10-02', category:'Electronics', subcategory:''},
    { id: 4, name: "Z15 Smartwatch", brand:'Samsung' ,status: "$0.13 - $8.55", moq: "10", av: '100', color:'Blue',image: "https://sc04.alicdn.com/kf/Hbe79d59029f749bdb11318553a997740u.jpg", topSelling:1000 ,date:'2017-10-02', category:'Electronics', subcategory:''},
    { id: 5, name: "Z15 Smartwatch", brand:'Samsung' ,status: "$0.12 - $7.55", moq: "1", av: '300', color:'Red',image: "https://sc04.alicdn.com/kf/Hbefda793d3084ed5819cc908183d6b71a.jpg", topSelling:2000,date:'2016-10-02', category:'Electronics', subcategory:''},
    { id: 6, name: "G102 Gaming", brand:'Apple' ,status: "$0.66 - $3.46", moq: "10", av: '100', color:'Red',image: "https://sc04.alicdn.com/kf/Hb1a7df7c8ea041e780440827874d67ddn.jpg", topSelling:2000 ,date:'2015-09-02', category:'Electronics', subcategory:''},
    { id: 8, name: "W11 headphone", brand:'Apple' ,status: "$0.66 - $5.46", moq: "100", av: '300', color:'Red',image: "https://sc04.alicdn.com/kf/H0fafa3dcf2d543dab6aa08623ff8ba2cA.jpg", topSelling:5000 ,date:'2014-10-02', category:'Beauty'},
    { id: 9, name: "A12 headphone", brand:'Lenovo' ,status: "$0.66 - $6.46", moq: "10", av: '100', color:'Red',image: "https://sc04.alicdn.com/kf/H1f097508b28149c391b0d366d3e58922v.jpg", topSelling:1000 ,date:'2013-10-02', category:'Beauty'},
    { id:10, name: "Q1 Smartwatch", brand:'Lenovo' ,status: "$0.66 - $4.46", moq: "40", av: '100', color:'Black',image: "https://sc04.alicdn.com/kf/Hd03ed87f7279473c89dd2bc3f01d050eI.jpg", topSelling:100 ,date:'2012-10-02', category:'Beauty'},
    { id: 11, name: "Z1 Smartwatch", brand:'Lenovo' ,status: "$0.66 - $5.46", moq: "50", av: '100', color:'Black',image: "https://sc04.alicdn.com/kf/Hbefda793d3084ed5819cc908183d6b71a.jpg", topSelling:500 ,date:'2011-10-02', category:'Beauty'},
];

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search:'',
            data: data,
            List: true,
            showSearch: true,
            value: [0,1],
            category:[],
            subcategory:[],
            color:[],
            brand:[],
            sortByData:'',

            fetchedCategories:[],
            multiplier:10
        };
    }

    onclick = () => {
        this.setState({ showSearch: !this.state.showSearch })
    }
    setView = () => {
        this.setState({ List: !this.state.List })
    }

    filterPriceRange = (v) =>{
        //console.log(v);
        this.setState({value:v})
        //console.log(v[1])
        let filteredData = data.filter(item=>{
            return (parseInt(item.status.split(" - ")[1].substr(1))>=(parseInt(v[0]*this.state.multiplier)) && parseInt(item.status.split(" - ")[1].substr(1))<=(parseInt(v[1]*this.state.multiplier)))
         })
        this.setState({data:filteredData})
    }

    resetPriceRange = () =>{
        this.setState({value:[0,1], data:data})
    }

    clickEventListener(item) {
        Alert.alert(item.name)
    }

    SortingByData(type){
        switch(type){
            case 'high':
                this.setState({data:data.sort((a,b)=>
                    parseFloat(a.status.split(' - ')[1].substr(1)) < parseFloat(b.status.split(' - ')[1].substr(1))? 1 : -1)
                })
                break;
            case 'low':
                this.setState({data:data.sort((a,b)=>
                    parseFloat(a.status.split(' - ')[1].substr(1)) > parseFloat(b.status.split(' - ')[1].substr(1))? 1 : -1)
                })
                break;
            case 'best':
                this.setState({data:data.sort((a,b)=>
                    a.topSelling < b.topSelling? 1 : -1)
                })
                break;
            case 'date':
                this.setState({data:data.sort((a,b)=>{
                                        
                        return new Date(a.date).getTime() - 
                        new Date(b.date).getTime()
                    }).reverse()
                    })
                break;
            case 'reset':
                this.setState({data:data.sort((a,b)=>
                    a.name[0] > b.name[0]?1:-1)})
                break;
        }  
    }   

    setColor(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one color")
        }
        else if(selection.length==0){
            this.setState({data:data,color:[]})
        }
        else{
            let result = this.state.data.filter((i)=>i.color == selection[0].label)
            this.setState({data:result,color:selection})
        }
    }    

    setBrand(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one brand")
        }
        else if(selection.length==0){
            this.setState({data:data,brand:[]})
        }
        else{
            let result = this.state.data.filter((i)=>i.brand == selection[0].label)
            this.setState({data:result,brand:selection})
        }
    }    


    setSubCategory(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            this.setState({data:data,category:[]})
        }
        else{
            let result = this.state.data.filter((i)=>i.category == selection[0].label)
            this.setState({data:result,subcategory:selection})
        }
    }
   

    setCategory(selection){
        console.log(selection)
        if(selection.length>1){
            Alert.alert("Category Error","You can't pick more than one category")
        }
        else if(selection.length==0){
            this.setState({data:data,category:[]})
        }
        else{
            let result = this.state.data.filter((i)=>i.category == selection[0].label)
            this.setState({data:result,category:selection})
        }
    }

    componentDidMount(){
        apiPortFolioServices.getCategoryDetails().then((result) => {
          console.log(result);
          let array = result;
          let data = [];
          array.map((item) => data.push({label:item.category_name,value:item.id}));
          this.setState({ fetchedCategories: data});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Appbar style={{backgroundColor:"#E9F3FF" , color:"#fff"}}>
                        <Appbar.Content title={this.state.data.filter
                        (i=>i.name.toLowerCase().includes(this.state.search.toLowerCase())).length + " " + "Results"} onPress={this.setView} style={{ fontSize: 14 }} />
                        <Appbar.Action icon="sort-descending" onPress={() => {
                            actionSheetRef.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="filter-menu" onPress={() => {
                            actionSheetCat.current?.setModalVisible();
                        }} />
                        <Appbar.Action icon="magnify" onPress={this.onclick} />
                    </Appbar>
                </View>
                <View>
                    <Searchbar
                        onChangeText={(e)=>this.setState({search:e})}
                        placeholder="Search"
                        style={{ display: this.state.showSearch ? 'none' : 'flex' }}
                    />
                </View>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.data.filter
                        (i=>i.name.toLowerCase().includes(this.state.search.toLowerCase()))}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate("Detailed",{item:item})}>
                                <View style={styles.cardHeader}>
                                </View>
                                <Image style={styles.userImage} source={{ uri: item.image }} />
                                <View style={styles.cardFooter}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.position}>{item.status} / Piece</Text>
                                        <Text style={styles.position}>Available Qu. {item.av}</Text>
                                        <Text style={styles.position}> Min. Order {item.moq}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <ActionSheet ref={actionSheetRef}>
                    <ScrollView >
                        <View style={{ flexDirection: 'column', padding: 10 }} >
                            <View style={styles.contentSize}>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="clock"
                                            size={20}
                                            onPress={()=>this.SortingByData("date")}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Newset</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize}>
                                        <IconButton
                                            icon="star-outline"
                                            size={20}
                                            onPress={()=>this.SortingByData("best")}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Best Selling</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("low")}>
                                        <Text style={{ fontSize: 18 }}>$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>Low</Text>
                                </View>
                                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.btnSize} onPress={()=>this.SortingByData("high")}>
                                        <Text style={{ fontSize: 18 }}>$$</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 14 }}>High</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 10, }} >
                                {/* <Button mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, borderRadius: 10 }}>
                                    Submit
                                </Button> */}
                                <Button mode="outlined" onPress={() =>this.SortingByData("reset")} color='#6E91EC'  style={{ marginBottom: 10, borderRadius: 10}}>
                                    Reset
                                </Button>
                            </View>
                        </View>

                    </ScrollView >
                </ActionSheet>
                <ActionSheet ref={actionSheetCat}>
                    <ScrollView >
                        <View >
                            <Title style={{ padding: 10 }}>Filter By </Title>
                            <List.AccordionGroup>
                                <List.Accordion title="Categories" id="1" style={{ width: "100%" }}>
                                        <SelectMultiple
                                        items={this.state.fetchedCategories}
                                        selectedItems={this.state.category}
                                        onSelectionsChange={(e) => this.setCategory(e)}/>
                                </List.Accordion>

                                <List.Accordion title="Sub-Categories" id="2">
                                <ScrollView style={{ maxHeight: 200 }}>
                                        {this.state.category.length==0
                                        ?(<Text style={{color:'red',textAlign:'center',paddingVertical:10}}>Please choose a category first</Text>)
                                        :(<SelectMultiple
                                        items={this.state.fetchedCategories}
                                        selectedItems={this.state.category}
                                        onSelectionsChange={(e) => this.setSubCategory(e)}/>)}
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Brand" id="3">
                                <ScrollView style={{ maxHeight: 200 }}>
                                        {this.state.category.length==0
                                        ?(<Text style={{color:'red',textAlign:'center',paddingVertical:10}}>Please choose a sub-category first</Text>)
                                        :(<SelectMultiple
                                        items={brands}
                                        selectedItems={this.state.brand}
                                        onSelectionsChange={(e) => this.setBrand(e)}/>)}
                                    </ScrollView>
                                </List.Accordion>

                                <List.Accordion title="Color" id="4">
                                <ScrollView style={{ maxHeight: 200 }}>
                                <SelectMultiple
                                        items={colors}
                                        selectedItems={this.state.color}
                                        onSelectionsChange={(e) => this.setColor(e)}/>
                                    </ScrollView>
                                </List.Accordion>
                                <List.Accordion title="Price Range" id="5">
                                    <View style={styles.priceTextContainer}>
                                        <Text style={styles.priceText}>
                                            ${parseInt(this.state.value[0]*this.state.multiplier)} - ${parseInt(this.state.value[1]*this.state.multiplier)}
                                        </Text>
                                    </View>
                                    <Slider
                                        value={this.state.value}
                                        onValueChange={value => this.filterPriceRange(value)
                                        }
                                    />
                                    <TouchableOpacity style={styles.resetButton}
                                    onPress={()=>this.resetPriceRange()}>
                                        <Text style={styles.resetText}>
                                            Reset
                                        </Text>
                                    </TouchableOpacity>
                                </List.Accordion>
                            </List.AccordionGroup>
                        </View>
                    </ScrollView>
                </ActionSheet>
                <TouchableOpacity
                    style={styles.Btn}
                    onPress={() => this.props.navigation.navigate("Add")}
                >
                    <Icon name="plus-thick" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}



