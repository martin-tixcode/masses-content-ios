import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTheme, BaseColor } from '@config';
import { AnnouncementItem, SafeAreaView, SubHeader, Button, Text } from '@components';
import { TabView, TabBar } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { getAnnouncementMinorText } from '@utils';
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { CastingActions } from '@actions';

const castingsRepository = RepositoryFactory.get('castings');

export default function AnnouncementsTabView({ loading, navigation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Activas');

  let activeAnnouncements = useSelector(state => state.casting.castingsActive);
  let pendingAnnouncements = useSelector(state => state.casting.castingsPending);
  let finishAnnouncements = useSelector(state => state.casting.castingsFinish);

  console.log(useSelector(state => state.casting));
  /*const [activeAnnouncements, setActiveAnnouncements] = useState([]);
  const [pendingAnnouncements, setPendingAnnouncements] = useState([]);
  const [finishAnnouncements, setFinishAnnouncements] = useState([]);*/
  const [announcements, setAnnouncements] = useState([]);
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);

  const fetchActiveCastings = async () => {
    return await castingsRepository.getActiveCastings();
  };
  const fetchPendingCastings = async () => {
    return await castingsRepository.getPendingCastings();
  };

  const fetchFinishCastings = async () => {
    return await castingsRepository.getFinishCastings();
  };

  const fetchData = async () => {
    let data = {
      castingsActive: await fetchActiveCastings(),
      castingsPending: await fetchPendingCastings(),
      castingsFinish: await fetchFinishCastings(),
    };

    dispatch(CastingActions.changeCasting(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const bottomElements = item => {
    return (
      <Button
        style={{ width: '80%' }}
        onPress={() =>
          navigation.navigate('AnnouncementDetail', { announcementData: item })
        }>
        {t('join')}
      </Button>
    );
  };

  function RenderTabs() {
    switch (activeTab) {
      case 'Activas':
        return (
          <View style={{ backgroundColor: colors.primary }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colors.primary,
                marginTop: '-1%',
              }}>
              <TouchableOpacity onPress={() => setActiveTab('Activas')}>
                <Text bold style={{ color: colors.secondary, shadowColor: '#000' }}>
                  Active
                </Text>
                <View style={{ height: 2, backgroundColor: colors.secondary }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Pendientes')}>
                <Text style={{ color: 'white' }}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Finalizadas')}>
                <Text style={{ color: 'white' }}>Finished</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.primary }}
              forceInset={{ top: 'always' }}>
              <View>
                <View
                  style={{
                    paddingVertical: 30,
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    marginBottom: '-1%',
                  }}>
                  <View style={{}}>
                    <ScrollView
                      style={{ padding: 0 }}
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                      <FlatList
                        data={activeAnnouncements}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                          <AnnouncementItem
                            image={{ uri: item.image }}
                            name={item.title}
                            description={item.description}
                            minorText={t('deadline') + ': ' + item.endDate}
                            style={{ margin: 20 }}
                            bottomElements={bottomElements(item)}
                            onPress={() => {
                              navigation.navigate('AnnouncementDetail', {
                                announcementData: item,
                              });
                            }}
                          />
                        )}
                      />
                    </ScrollView>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        );

        break;
      case 'Pendientes':
        return (
          <View style={{ backgroundColor: colors.primary, marginTop: '-1%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => setActiveTab('Activas')}>
                <Text style={{ color: 'white' }}>Active</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Pendientes')}>
                <Text bold style={{ color: colors.secondary }}>
                  Pending
                </Text>
                <View style={{ height: 2, backgroundColor: colors.secondary }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Finalizadas')}>
                <Text style={{ color: 'white' }}>Finished</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.primary }}
              forceInset={{ top: 'always' }}>
              <View>
                <View
                  style={{
                    paddingVertical: 30,
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    marginBottom: '-1%',
                  }}>
                  <View style={{}}>
                    <ScrollView
                      style={{ padding: 0 }}
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                      <FlatList
                        data={pendingAnnouncements}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                          <AnnouncementItem
                            image={{ uri: item.image }}
                            name={item.title}
                            description={item.description}
                            minorText={t('deadline') + ': ' + item.endDate}
                            style={{ margin: 20 }}
                            bottomElements={bottomElements(item)}
                            onPress={() => {
                              navigation.navigate('AnnouncementDetail', {
                                announcementData: item,
                              });
                            }}
                          />
                        )}
                      />
                    </ScrollView>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        );

        break;
      case 'Finalizadas':
        return (
          <View style={{ backgroundColor: colors.primary, marginTop: '-1%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity onPress={() => setActiveTab('Activas')}>
                <Text style={{ color: 'white' }}>Active</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Pendientes')}>
                <Text style={{ color: 'white' }}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Finalizadas')}>
                <Text bold style={{ color: colors.secondary }}>
                  Finished
                </Text>
                <View style={{ height: 2, backgroundColor: colors.secondary }} />
              </TouchableOpacity>
            </View>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.primary }}
              forceInset={{ top: 'always' }}>
              <View>
                <View
                  style={{
                    paddingVertical: 30,
                    backgroundColor: 'white',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    marginBottom: '-1%',
                  }}>
                  <View style={{}}>
                    <ScrollView
                      style={{ padding: 0 }}
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }>
                      <FlatList
                        data={finishAnnouncements}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                          <AnnouncementItem
                            image={{ uri: item.image }}
                            name={item.title}
                            description={item.description}
                            minorText={t('deadline') + ': ' + item.endDate}
                            style={{ margin: 20 }}
                            bottomElements={null}
                            onPress={() => {
                              navigation.navigate('AnnouncementDetail', {
                                announcementData: item,
                              });
                            }}
                          />
                        )}
                      />
                    </ScrollView>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        );

        break;
    }
  }

  return (
    <View style={{ backgroundColor: colors.primary, marginTop: '-1%' }}>
      <View style={{ backgroundColor: colors.primary, marginTop: '-1%' }}>
        {RenderTabs()}
      </View>
    </View>
  );
  // const [announcement, setAnnouncement] = useState([])
  // const [tabBarIndex, setTabBarIndex] = useState(1);
  // const handleTabBarIndexChange = currentIndex => setTabBarIndex(currentIndex);
  // const {colors} = useTheme();

  // const fetchRecentCastings = async () => {
  //   setAnnouncement(  announcement.concat( activeAnnouncements, pendingAnnouncements, finishAnnouncements))
  // };

  // useEffect(() => {
  //   fetchRecentCastings()

  // }, [])

  // console.log('anounsmentVista', announcement )

  // const [routes] = useState([
  //   {key: 'active', title: t('active')},
  //   {key: 'pending', title: t('pending')},
  //   {key: 'finished', title: t('finished')},
  // ]);

  // const getBottomElements = item => {
  //   switch (item.statusId) {
  //     case 1:
  //       return (
  //         <Button
  //           style={{width: '60%'}}
  //           onPress={() => navigation.navigate('UploadContent', item.id)}>
  //           {t('upload')}
  //         </Button>
  //       );
  //     case 2:
  //       return (
  //         <TouchableOpacity onPress={() => navigation.navigate('Chat', item.id)}>
  //           <Icon name="comments" size={28} color={colors.primary} badge={2} />
  //         </TouchableOpacity>
  //       );
  //     case 3:
  //       return (
  //         <>
  //           <TouchableOpacity onPress={() => navigation.navigate('Chat', item.id)}>
  //             <Icon name="comments" size={28} color={colors.primary} />
  //           </TouchableOpacity>

  //           <TouchableOpacity onPress={() => navigation.navigate('VideoCall', item.id)}>
  //             <View style={styles.supervisor}>
  //               <View style={[styles.supervisorIcon, {backgroundColor: colors.primary}]}>
  //                 <Icon name="eye" size={18} color="white" />
  //               </View>
  //               <Text primaryColor semibold>
  //                 {t('supervisor')}
  //               </Text>
  //             </View>
  //           </TouchableOpacity>
  //         </>
  //       );
  //     case 4:
  //       return (
  //         <StarRating
  //           starSize={20}
  //           maxStars={5}
  //           rating={item.rate}
  //           disabled
  //           fullStarColor={BaseColor.yellowColor}
  //           containerStyle={{padding: 5}}
  //         />
  //       );
  //   }
  // };

  // const renderScene = ({route, jumpTo}) => {
  //   let announcementsToShow;
  //   const announcementsToFilterByStatus = [];
  //   let filterKeys;
  //   switch (route.key) {
  //     case 'active':
  //       filterKeys = [0, 1];
  //       break;
  //     case 'pending':
  //       filterKeys = [1];
  //       break;
  //     case 'finished':
  //       filterKeys = [4, 5];
  //       break;
  //   }

  //   const announcementsExpired = announcements.filter(announcement => {
  //     if (announcement.expired) {
  //       return true;
  //     } else {
  //       announcementsToFilterByStatus.push(announcement);
  //       return false;
  //     }
  //   });

  //   const announcementsFilteredByStatus = announcementsToFilterByStatus.filter(
  //     announcement => {
  //       for (let key in filterKeys) {
  //         if (announcement.statusId === filterKeys[key]) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     },
  //   );

  //   announcementsToShow = announcementsFilteredByStatus;
  //   if (route.key === 'finished') {
  //     announcementsToShow = announcementsToShow.concat(announcementsExpired);
  //   }

  //   return (
  //     <View style={{marginVertical: 20}}>{renderContent(announcementsToShow)}</View>
  //   );
  // };

  // const renderTabBar = props => (
  //   <TabBar
  //     {...props}
  //     scrollEnabled
  //     indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
  //     style={[styles.tabbar, {backgroundColor: colors.background}]}
  //     tabStyle={styles.tab}
  //     inactiveColor={BaseColor.grayColor}
  //     activeColor={colors.text}
  //     renderLabel={({route, focused, color}) => (
  //       <View style={{flex: 1, width: 130, alignItems: 'center'}}>
  //         <Text headline semibold={focused} style={{color}}>
  //           {route.title}
  //         </Text>
  //       </View>
  //     )}
  //   />
  // );

  // const renderContent = announcementsFiltered => {
  //   const renderLoading = () => {
  //     return (
  //       <ActivityIndicator size="large" style={{marginTop: 50}} color={colors.primary} />
  //     );
  //   };

  //   const renderAnnouncements = () => {
  //     if (announcementsFiltered.length > 0) {
  //       return (
  //         <View>
  //           <FlatList
  //             data={announcementsFiltered}
  //             keyExtractor={item => item.id.toString()}
  //             renderItem={({item}) => (
  //               <AnnouncementItem
  //                 image={item.image}
  //                 name={item.title}
  //                 description={item.description}
  //                 // minorText={getAnnouncementMinorText(item, t)}
  //                 bottomElements={getBottomElements(item)}
  //                 style={{margin: 20}}
  //                 onPress={() => {
  //                   navigation.navigate('AnnouncementDetail', {announcementData: item});
  //                 }}
  //               />
  //             )}
  //           />
  //         </View>
  //       );
  //     } else {
  //       return (
  //         <View>
  //           <Text body1 semibold textAlign="center" style={{paddingVertical: 20}}>
  //             {t('no_announcements')}.
  //           </Text>
  //         </View>
  //       );
  //     }
  //   };

  //   if (loading) {
  //     return renderLoading();
  //   } else {
  //     return renderAnnouncements();
  //   }
  // };

  // return (
  //   <TabView
  //     lazy
  //     navigationState={{index: tabBarIndex, routes}}
  //     renderScene={renderScene}
  //     renderTabBar={renderTabBar}
  //     onIndexChange={handleTabBarIndexChange}
  //   />
  // );
}
