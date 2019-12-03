import React from 'react';
import { withNavigation } from 'react-navigation';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native';

export default class Logo extends React.Component {
   

  constructor(props) {
    super(props);
    this.state = {
      numColumns:3,
      userSelected:{},
      modalVisible:false,
      data: [
        {id:1,  image:"https://99designs-start-attachments.imgix.net/alchemy-pictures/2019%2F02%2F02%2F00%2F17%2F56%2F8c029731-ac86-4b73-b23e-60ffd44bd501%2FTikaDesign.png?auto=format&ch=Width%2CDPR&fm=png&w=450&h=450"}, 
        {id:2,  image:"https://img.freepik.com/free-vector/head-lion-logo-design_102395-43.jpg?size=338&ext=jpg"}, 
        {id:3,  image:"https://image.freepik.com/free-vector/bicycle-shop-logo-design-vector_53876-40626.jpg"}, 
        {id:4,  image:"https://ae01.alicdn.com/kf/HTB1JF8fOgHqK1RjSZFgq6y7JXXaM.jpg"}, 
        {id:5,  image:"http://picture-cdn.wheretoget.it/eolwn1-l-610x610-t+shirt-itgirl+shop-kfashion-korean-fashion-tumblr-southkorean-ulzzang-streetstyle-aesthetic-aesthetics-clothing-apparel-kawaii-cute-women-indie-grunge-pastel-kawaiifashion-pale-st.jpg"}, 
        {id:6,  image:"https://www.dhresource.com/600x600/f2/albu/g8/M00/8B/07/rBVaV1zZSbqAWRj1AAFJWRyweYk674.jpg"}, 
        {id:7,  image:"https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/117610282/original/a35520014dd52ab043a65c158cf0fa2df5601e8d/draw-cute-kawaii-anime-chibi.png"}, 
        {id:8,  image:"https://i.pinimg.com/originals/10/b1/a9/10b1a929564e4595931775a24401202c.png"}, 
        {id:9,  image:"https://pbs.twimg.com/media/D-qCUFYUcAAaq6l.jpg"}, 
        {id:11, image:"https://image.freepik.com/free-vector/abstract-blue-poster-design-music-festival_23-2147754026.jpg"},
        {id:12, image:"https://cdn5.f-cdn.com/contestentries/1124239/25861724/59ca7faa2a140_thumb900.jpg"},
        {id:13, image:"https://i.pinimg.com/originals/4b/2f/00/4b2f00bf3b1045b86fdeb769c40cc8f9.jpg"},
        {id:14, image:"https://www.dcphotographic.co.uk/wp-content/uploads/2018/04/Worcestershire-Wedding-Photographer-019.jpg"},
        {id:15, image:"https://i.pinimg.com/236x/13/d8/97/13d897a5bc26df9108df9e3abd83c393.jpg"},
        {id:16, image:"https://i.pinimg.com/564x/80/71/50/807150cc99baadb683f1ef96c63e7f94.jpg"},
      ]
    };
  }

  clickEventListener = (item) => {
    this.setState({userSelected: item}, () =>{
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    var itemDimension = Dimensions.get('window').width / this.state.numColumns;
    return (
      <TouchableOpacity style={[styles.item, {height: itemDimension}]} onPress={() => {this.clickEventListener(item)}}>
        <Image style={{height:itemDimension - 2, width:itemDimension - 2}} source={{uri: item.image}}/>
      </TouchableOpacity>
    );
  }
  
  formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.formatRow(this.state.data, this.state.numColumns)}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}
          numColumns={this.state.numColumns}/>

        <Modal
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>

          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                  <Image style={{width:200, height:200}} source={{uri: this.state.userSelected.image}}/>
                </ScrollView>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.btnClose}>
                  <Text style={styles.txtClose}>Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },

 /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 20
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:250,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    height:20,
    backgroundColor:'#20b2aa',
    padding:20
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  }
}); 

