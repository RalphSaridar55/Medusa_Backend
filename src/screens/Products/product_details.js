import React, { Component, createRef } from "react";
import Carousel from "react-native-banner-carousel";
import {table,users} from './table_element';
import {
  Image,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import styles from "./details_style";
import Dialog from "react-native-dialog";
import ActionSheet from "react-native-actions-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Card,
  Text,
  List,
  Title,
  Chip,
  Paragraph,
  DataTable,
  Headline,
  Button,
} from "react-native-paper";
const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 300;

const images = [
  "https://sc04.alicdn.com/kf/U01854b32af4b45a09df828bfb95a4679t.jpg",
  "https://sc04.alicdn.com/kf/U60b3294b8bca43b4be7ace957e90226ee.jpg",
  "https://sc04.alicdn.com/kf/U185220e1ddb64ef9ad7526daa9a169e6i.jpg",
  "https://sc04.alicdn.com/kf/Hf6c4d5d39fc64fac945778df0d59851ba.jpg",
];

const actionSheetRef = createRef();
const actionSheetRef_V = createRef();

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dataFromRoute: null,
      chosenPieces: 0,
      chosenBoxes: 0,
    };
  }

  handleAddAndSub(type, addOrSub) {
    console.log(type);
    if (addOrSub == "add")
      this.setState((prev) => ({ [type]: prev[type] + 1 }));
    else if (this.state[type] > 0)
      this.setState((prev) => ({ [type]: prev[type] - 1 }));
  }

  componentDidMount() {
    console.log("ROUTE PARAMS: ", this.props.route.params);
    console.log("ROUTE IS NEGOTIABLE: ", this.props.route.params.item.is_negotiable);
    this.setState({ dataFromRoute: this.props.route.params.item });
  }

  showDialog = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleDelete = () => {
    this.setState({ visible: false });
  };

  drawRestOfTable(){
      return(
          <>
        <View style={{ padding: 20 }}>
        <Title>Description:</Title>
        <Paragraph>
          {this.state.dataFromRoute?.description}
        </Paragraph>
      </View>
      <View style={{ marginTop: 10 }}>
        <DataTable>
          <ScrollView style={{ height: 400 }}>
            <DataTable.Header>
              <DataTable.Title>Details</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Brand Name:</DataTable.Cell>
              <DataTable.Cell numeric>{this.state.dataFromRoute?.brand.brand_name}</DataTable.Cell>
            </DataTable.Row>
            {table.map((item,index)=>{
                return(
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.label}</DataTable.Cell>
                    <DataTable.Cell numeric>{this.state.dataFromRoute?.[item.value]+""}{item.additional}</DataTable.Cell>
                </DataTable.Row>
                )
            })}
            {users.map((item,index)=>{
                return(
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.label}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={()=>{
                            if(item.type)
                                Linking.openURL(/* `http://${item.label}` */"http://"+item.value)
                            else
                                return null
                    }}>{this.state.dataFromRoute?.user[item.value]+""}{item.additional}</DataTable.Cell>
                    </DataTable.Row>
                )
            })}
            {/* <DataTable.Row>
              <DataTable.Cell>Weight:</DataTable.Cell>
              <DataTable.Cell numeric>237</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Type</DataTable.Cell>
              <DataTable.Cell numeric> 2.4Ghz Wireless</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Power Type</DataTable.Cell>
              <DataTable.Cell numeric>RECHARGEABLE</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Application</DataTable.Cell>
              <DataTable.Cell numeric> Desktop, LAPTOP</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Model Number:</DataTable.Cell>
              <DataTable.Cell numeric>Y-A2</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Brand Name:</DataTable.Cell>
              <DataTable.Cell numeric>159</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Weight:</DataTable.Cell>
              <DataTable.Cell numeric>237</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Type</DataTable.Cell>
              <DataTable.Cell numeric> 2.4Ghz Wireless</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Power Type</DataTable.Cell>
              <DataTable.Cell numeric>RECHARGEABLE</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Application</DataTable.Cell>
              <DataTable.Cell numeric> Desktop, LAPTOP</DataTable.Cell>
            </DataTable.Row> */}
          </ScrollView>
        </DataTable>
      </View>
      </>
      )
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: image.media }}
        />
      </View>
    );
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.Bcontainer}>
            {this.state.dataFromRoute && (
              <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
              >
                {this.state.dataFromRoute?.images.map((image, index) =>
                  this.renderPage(image, index)
                )}
              </Carousel>
            )}
          </View>
          <View
            style={{
              paddingLeft: 15,
              padding: 10 /*  display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'space-between' */,
            }}
          >
            <Title>{this.state.dataFromRoute?.product_name}</Title>
            {/* 
                        <Text>{this.state.dataFromRoute?.subCategory.sub_category_name}, {this.state.dataFromRoute?.brand.brand_name}</Text> */}
          </View>
          {/* <Card>
                        <Card.Title title="Description" style={{ fontSize: 15 }} />
                        <Card.Content>
                            <Text style={{marginTop:10,color:'gray'}}>{this.state.dataFromRoute?.description}</Text>
                        </Card.Content>
                    </Card> */}
          <Card>
            <Card.Title title="Variations" style={{ fontSize: 15 }} />
            <Card.Content>
              {this.state.dataFromRoute?.productvariant.map((variant) => (
                <>
                  <Title style={{ fontSize: 14 }}>
                    {variant.productvariantopt[0].varientType.varient_type}:
                  </Title>
                  <ScrollView
                    style={{ dispaly: "flex", flexDirection: "row" }}
                    horizontal
                  >
                    {variant.productvariantopt.map((item, index) => (
                      <View>
                        <Image
                          source={{ uri: variant.variant_image }}
                          key={index}
                          style={styles.cardImage}
                        />
                        <Text stlye={{ marginLeft: 15 }}>
                          {item.varientValue?.varient_value}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </>
              ))}

              <View style={styles.priceHeader}>
                <View style={{ flex: 3 }}>
                  <Title>
                    ${this.state.dataFromRoute?.offered_price} - $
                    {this.state.dataFromRoute?.price}
                  </Title>
                </View>
                {this.state.dataFromRoute?.is_negotiable && <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Negotiations",{screen:"Negotiation"})}
                  style={[styles.loginBtn, { flex: 2, backgroundColor:'#fff',borderColor:'#31C2AA', borderWidth:1 }]}
                >
                  <Text style={[styles.loginBtnText,{color: "#31C2AA",}]}>Negotiate Price</Text>
                </TouchableOpacity>}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title>Available:</Title>
                <Text style={{ color: "gray", fontSize:16 }}>
                  {this.state.dataFromRoute?.current_stock} Pieces Available
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginVertical: 20,
                }}
              >
                <View style={styles.buttonOptionsContainer}>
                  <View style={styles.buttonOptions}>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenPieces", "add")
                      }
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                    <Text style={{ color: "#31C2AA", fontSize: 24 }}>
                      {this.state.chosenPieces}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenPieces", "minus")
                      }
                    >
                      <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonInfo}>
                    <Text style={{ color: "#31C2AA", fontSize: 18 }}>
                      Pieces/{this.state.chosenPieces} pieces
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonOptionsContainer}>
                  <View style={styles.buttonOptions}>
                    <TouchableOpacity
                      onPress={() => this.handleAddAndSub("chosenBoxes", "add")}
                    >
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                    <Text style={{ color: "#31C2AA", fontSize: 24 }}>
                      {this.state.chosenBoxes}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.handleAddAndSub("chosenBoxes", "minus")
                      }
                    >
                      <MaterialCommunityIcons
                        name="minus-circle-outline"
                        size={30}
                        color="#31C2AA"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonInfo}>
                    <Text style={{ color: "#31C2AA", fontSize: 18 }}>
                      Box/{this.state.chosenBoxes} pieces
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => console.log("Test")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Add to Order Book</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginHorizontal:60,marginVertical:10}}>
                  <TouchableOpacity
                    onPress={() => console.log("Test")}
                    style={[styles.loginBtn, { flex: 2 }]}
                  >
                    <Text style={styles.loginBtnText}>Save for Later</Text>
                  </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>

          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible();
                  }}
                >
                  Details
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible();
                  }}
                >
                  view more{" "}
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Brand Name:</DataTable.Cell>
                <DataTable.Cell numeric>{this.state.dataFromRoute?.brand.brand_name}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Cargo Type:</DataTable.Cell>
                <DataTable.Cell numeric>{this.state.dataFromRoute?.cargo_type_name}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <ActionSheet ref={actionSheetRef}>
              {this.drawRestOfTable()}
            </ActionSheet>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProductDetails;

/*
    <View style={{ padding: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                <Headline>Similar products</Headline>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', margin: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hf1bd3c0da31145ed835dab667efced6dP.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Tops" subtitle="10 ~ 50 USD"></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                                    <Card >
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/HTB14p5ebyDxK1RjSsph762HrpXaT.png' }} style={{ height: 100 }} />
                                        <Card.Title title="Printer" subtitle="100 ~ 500 USD" ></Card.Title>
                                    </Card>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Card>
                                        <Card.Cover source={{ uri: 'https://sc04.alicdn.com/kf/Hcaeb65c4343249649d5a8bb45af9408cI.jpg' }} style={{ height: 100 }} />
                                        <Card.Title title="Glasses" subtitle="1 ~ 5 USD"></Card.Title>
                                    </Card>
                                </View>
                            </View>
                        </View>

*/
