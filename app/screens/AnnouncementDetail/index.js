import React, { useState } from 'react';
import { Images } from '@config';
import { View, ScrollView, Animated, Share, Text as NativeText, Alert } from 'react-native';
import { useTheme, BaseColor } from '@config';
import {
  SafeAreaView,
  SubHeader,
  Header,
  Icon,
  Text,
  Button,
  StarRating,
  BottomModal,
} from '@components';
import { useTranslation } from 'react-i18next';
import * as Utils from '@utils';
import styles from './styles';
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { useSelector, useDispatch } from 'react-redux';
import { CastingActions } from '@actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const castingsRepository = RepositoryFactory.get('castings');

export default function AnnouncementDetail({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let announcements = useSelector(state => state.casting.castings);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [screen, setScreen] = useState('prim')

  const sendData = async () => {

    let data = {
      casting_id: announcementData.id
    };
    let response = await castingsRepository.joinCasting(data);

    let dataCasting = {
      castingsActive: await fetchActiveCastings(),
      castingsPending: await fetchPendingCastings(),
      castingsFinish: await fetchFinishCastings()
    }

    let newListCasting = announcements.filter(casting => casting.id !== announcementData.id)
    console.log('newListCasting', newListCasting)
    dispatch(CastingActions.getCasting(newListCasting));
    dispatch(CastingActions.changeCasting(dataCasting));

  };

  const fetchActiveCastings = async () => {

    return await castingsRepository.getActiveCastings();
  };
  const fetchPendingCastings = async () => {
    return await castingsRepository.getPendingCastings();
  };

  const fetchFinishCastings = async () => {
    return await castingsRepository.getFinishCastings();
  };

  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 80;

  const [announcementData, setAnnouncementData] = useState(
    route.params.announcementData,
  );
  const [modalVisible, setModalVisible] = useState(false);


  const onShare = async () => {
    const result = await Share.share({
      message: 'Masses Content App',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };



  function selectScreen(){

    switch (screen) {
      case 'prim':
        return(
          <View>


          <Animated.Image
            source={{ uri: announcementData.image }}
            style={[
              styles.imgBanner,
              {
                height: deltaY.interpolate({
                  inputRange: [0, Utils.scaleWithPixel(200), Utils.scaleWithPixel(200)],
                  outputRange: [heightImageBanner, 0, 0],
                }),
              },
            ]}
          />
          <SafeAreaView>
            <Header
              title={''}
              renderLeft={() => {
                return <Icon name="arrow-left" size={20} color={colors.secondary} />;
              }}
              onPressLeft={() => {
                navigation.goBack();
              }}
              renderRight={() => {
                return (
                  <Icon
                    name="share-alt"
                    size={20}
                    color={colors.secondary}
                    onPress={onShare}
                  />
                );
              }}
            />
            <ScrollView
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: deltaY } } }])}
              onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
              scrollEventThrottle={8}
              style={{ paddingHorizontal: 20 }}>
              <View
                style={[
                  styles.contentBoxTop,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.card,
                    shadowColor: colors.border,
                    borderColor: colors.border,
                  },
                ]}>
                <Text title3 semibold style={{ textAlign: 'center' }}>
                  {announcementData.title}
                </Text>
                <Text primaryColor semibold headline style={styles.marginVertical}>
                  {Utils.getAnnouncementMinorText(announcementData, t)}
                </Text>
                <View style={styles.descriptionAndRange}>
                  <Text style={{  width: '100%' }}>
                    {announcementData.description}
                  </Text>

                  {/* <View style={styles.rangeRow}>
                    <Icon name="coins" size={32} color="#FFDB5B" style={{marginRight: 10}} />
                    <Text style={{flexShrink: 1}} semibold>
                      {t('range')} {announcementData.range}
                    </Text>
                  </View> */}
                </View>
                <TouchableOpacity   onPress={()=> setScreen('sec')}>
                    <Text style={{color:colors.primary}} >Ver Mas</Text>
                  </TouchableOpacity>
                <Text headline semibold style={styles.marginVertical}>
                  {t('requirements')}

                </Text>

                {announcementData.requirements.map(requirement => {
                  return (
                    <View style={styles.requirement}>
                      <Icon
                        name="check"
                        size={10}
                        color={colors.primary}
                        style={{ marginRight: 10 }}
                      />
                      <Text>{requirement.name}</Text>
                    </View>
                  );
                })}
                  <TouchableOpacity   onPress={()=> setScreen('terc')}>
                    <Text style={{color:colors.primary}} >Ver Mas</Text>
                  </TouchableOpacity>
                <View style={styles.marginVertical}>
                  {announcementData.statusId === 4 && (
                    <>
                      <Text title3 semibold primaryColor style={{ textAlign: 'center' }}>
                        {t('announcement_accepted')}
                      </Text>
                      <StarRating
                        starSize={20}
                        maxStars={5}
                        rating={announcementData.rate}
                        disabled
                        fullStarColor={BaseColor.yellowColor}
                        containerStyle={[{ padding: 5 }, styles.marginVertical]}
                      />
                    </>
                  )}

                  {announcementData.statusId === 5 && (
                    <Text title3 semibold primaryColor style={{ textAlign: 'center' }}>
                      {t('announcement_rejected')}
                    </Text>
                  )}

                  {announcementData.expired ? (
                    <Text title3 semibold primaryColor style={{ textAlign: 'center' }}>
                      {t('announcement_expired')}
                    </Text>
                  ) : (
                      <>
                        {announcementData.statusId === undefined && (
                          <Button style={[styles.button]} styleText={{ fontSize: 18 }} onPress={setModalVisible}>
                            {t('join')}
                          </Button>
                        )}

                        {announcementData.statusId === 1 && (
                          <Button style={[styles.button]} styleText={{ fontSize: 18 }}>
                            {t('upload_content')}
                          </Button>
                        )}

                        {(announcementData.statusId === 2 ||
                          announcementData.statusId === 3) && (
                            <Button style={[styles.button]} styleText={{ fontSize: 18 }}>
                              {t('chat')}
                            </Button>
                          )}

                        {announcementData.statusId === 3 && (
                          <Button style={[styles.button]} styleText={{ fontSize: 18 }}>
                            {t('go_to_meeting')}
                          </Button>
                        )}
                      </>
                    )}
                </View>
              </View>
            </ScrollView>
            <BottomModal
              type="agreement"
              isVisible={modalVisible}
              agreementText={announcementData.casting_agreement}
              onCloseModal={() => setModalVisible(false)}
              onAccept={() => { sendData(); navigation.navigate('unidoConvoc', { announcementData: announcementData }); setModalVisible(false) }}
              title="announcement_agreement"
            />
          </SafeAreaView>
            </View>


        );

        break;
        case 'sec':
        return(


          <View>


          <Animated.Image
            source={{ uri: announcementData.image }}
            style={[
              styles.imgBanner,
              {
                height: deltaY.interpolate({
                  inputRange: [0, Utils.scaleWithPixel(200), Utils.scaleWithPixel(200)],
                  outputRange: [heightImageBanner, 0, 0],
                }),
              },
            ]}
          />
          <SafeAreaView>
            <Header
              title={''}
              renderLeft={() => {
                return <Icon name="arrow-left" size={20} color={colors.secondary} />;
              }}
              onPressLeft={() => {
                setScreen('prim');
              }}
              renderRight={() => {
                return (
                  <Icon
                    name="share-alt"
                    size={20}
                    color={colors.secondary}
                    onPress={onShare}
                  />
                );
              }}
            />
            <ScrollView
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: deltaY } } }])}
              onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
              scrollEventThrottle={8}
              style={{ paddingHorizontal: 20 }}>
              <View
                style={[
                  styles.contentBoxTop,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.card,
                    shadowColor: colors.border,
                    borderColor: colors.border,
                  },
                ]}>


                <View >
                  <NativeText style={{  width: '100%'}}>
                    {announcementData.description}
                  </NativeText>


                </View>




              </View>
            </ScrollView>

          </SafeAreaView>
            </View>

        );
        break;
      // default:
      //   <View> </View>
      //   break;
      case 'terc':
        return(

          <View>


          <Animated.Image
            source={{ uri: announcementData.image }}
            style={[
              styles.imgBanner,
              {
                height: deltaY.interpolate({
                  inputRange: [0, Utils.scaleWithPixel(200), Utils.scaleWithPixel(200)],
                  outputRange: [heightImageBanner, 0, 0],
                }),
              },
            ]}
          />
          <SafeAreaView>
            <Header
              title={''}
              renderLeft={() => {
                return <Icon name="arrow-left" size={20} color={colors.secondary} />;
              }}
              onPressLeft={() => {
                setScreen('prim');
              }}
              renderRight={() => {
                return (
                  <Icon
                    name="share-alt"
                    size={20}
                    color={colors.secondary}
                    onPress={onShare}
                  />
                );
              }}
            />
            <ScrollView
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: deltaY } } }])}
              onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
              scrollEventThrottle={8}
              style={{ paddingHorizontal: 20 }}>
              <View
                style={[
                  styles.contentBoxTop,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.card,
                    shadowColor: colors.border,
                    borderColor: colors.border,
                  },
                ]}>


                <View >
                {announcementData.requirements.map(requirement => {
                  return (
                    <View style={styles.requirement}>
                      <Icon
                        name="check"
                        size={10}
                        color={colors.primary}
                        style={{ marginRight: 10 }}
                      />
                      <Text>{requirement.name}</Text>
                    </View>
                  );
                })}

                </View>




              </View>
            </ScrollView>

          </SafeAreaView>
            </View>

        );
    }
  }




  return (

    <View style={{ flex: 1 }}>
      {selectScreen()}
  </View>





    // <View>

    //

    // </View>
  );
}


//
