import { StatusBar } from 'expo-status-bar';
import { StrictMode, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Draggable from 'react-native-draggable';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { s } from 'react-native-wind';
import { AreaType, BuildingType, FurnituresType } from './App.type';
import { getAreas } from './src/api/GET_Areas';
import { getBuildings } from './src/api/GET_Buildings';
import { getFurnitures } from './src/api/GET_Furnitures';

const App = () => {
  /* Local State */
  const [searchBuilding, setSearchBuilding] = useState<BuildingType>();
  const [buildingList, setBuildingList] = useState<any>();
  const [lovBuilding, setLovBuilding] = useState<string[]>();
  const [areaList, setAreaList] = useState<AreaType[]>();
  const [furnituresList, setFurnituresList] = useState<FurnituresType[]>();

  useEffect(() => {
    setBuildingList(fetchBuilding());
  }, []);

  useEffect(() => {
    if (buildingList) {
      fetchAreas();
      fetchFurnitures();
    }
  }, [searchBuilding]);

  const fetchBuilding = async () => {
    const { data, success } = await getBuildings();
    if (success) {
      setSearchBuilding(data[0]);
      setLovBuilding(
        data.map((e: BuildingType) => {
          return e.name;
        })
      );
      return data;
    }
  };

  const fetchAreas = async () => {
    if (buildingList) {
      const { success, data } = await getAreas({
        buildingId: searchBuilding?.id || '',
      });
      if (success) {
        setAreaList(data);
      }
    }
  };

  const fetchFurnitures = async () => {
    if (buildingList) {
      const { success, data } = await getFurnitures({
        buildingId: searchBuilding?.id || '',
      });
      if (success) {
        const tempData: FurnituresType[] = data.map((e: FurnituresType) => {
          return {
            ...e,
            path: e.path.split('.svg')[0].split('images/')[1],
          };
        });
        setFurnituresList(tempData);
      }
    }
  };

  return (
    <StrictMode>
      <View style={styles.container}>
        <Text style={s`text-center mt-12 text-lg font-bold mb-3`}>
          {searchBuilding?.name || '-'}
        </Text>
        <SelectDropdown
          data={lovBuilding || []}
          onSelect={(selectedItem, index) => {
            setSearchBuilding(buildingList && buildingList['_z'][index]);
          }}
          defaultButtonText={searchBuilding?.name || 'Pilih gedung'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <ScrollView horizontal={true} style={styles.buildingContainer}>
          <View style={styles.innerContainer}>
            {areaList &&
              areaList.map((e: AreaType) => {
                return (
                  <Draggable
                    x={e.positionX}
                    y={e.positionY}
                    disabled
                    children={
                      <>
                        <Image
                          style={styles.iconArea}
                          source={require('./src/assets/images/IconArea.png')}
                        />
                        <Text style={s`text-center`}>{e.name}</Text>
                      </>
                    }
                  />
                );
              })}
            {furnituresList &&
              furnituresList.map((e: FurnituresType) => {
                return (
                  <Draggable
                    x={e.positionX}
                    y={e.positionY}
                    disabled
                    children={
                      <Image
                        style={styles.iconItem}
                        source={{
                          uri:
                            e.path === 'IconEscalator'
                              ? 'https://i.imgur.com/jhmIQtv.png'
                              : e.path === 'IconGates'
                              ? 'https://i.imgur.com/W1nzTQW.png'
                              : e.path === 'IconLargeCupboard'
                              ? 'https://i.imgur.com/WUcgT3m.png'
                              : e.path === 'IconMediumWall'
                              ? 'https://i.imgur.com/bllVmu1.png'
                              : e.path === 'IconSmallWall'
                              ? 'https://i.imgur.com/TkgKbS1.png'
                              : 'https://i.imgur.com/6G8BerA.png',
                        }}
                      />
                    }
                  />
                );
              })}
          </View>
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </StrictMode>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFE1E6',
    height: '100%',
    width: '100%',
    paddingRight: '3%',
    paddingLeft: '3%',
    s,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  buildingContainer: {
    borderColor: '#444',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    marginTop: '2%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  innerContainer: {
    width: 900,
    borderColor: '#C3C3C3',
    borderWidth: 5,
    marginRight: 33,
  },
  iconArea: {
    height: 50,
    width: 100,
  },
  iconItem: {
    height: 50,
    width: 50,
  },
});

export default App;
