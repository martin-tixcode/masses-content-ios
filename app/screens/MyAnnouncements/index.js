import React, {useState, useEffect} from 'react';
import {Images} from '@config';
import {View, ScrollView} from 'react-native';

import {SafeAreaView, SubHeader} from '@components';
import {useTranslation} from 'react-i18next';
import {BaseColor, useTheme} from '@config';
import AnnouncementsTabView from './AnnouncementsTabView';
import {RepositoryFactory} from '@repositories/RepositoryFactory';

const castingsRepository = RepositoryFactory.get('castings');

export default function MyAnnouncements({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [announcements, setAnnouncements] = useState([]);
  const [activeAnnouncements, setActiveAnnouncements] = useState([]);
  const [pendingAnnouncements, setPendingAnnouncements] = useState([]);
  const [finishAnnouncements, setFinishAnnouncements] = useState([]);

  const fetchActiveCastings = async () => {
    await setActiveAnnouncements(await castingsRepository.getActiveCastings());
  };

  const fetchPendingCastings = async () => {
    await setPendingAnnouncements(await castingsRepository.getPendingCastings());
  };

  const fetchFinishCastings = async () => {
    await setFinishAnnouncements(await castingsRepository.getFinishCastings());
  };

  useEffect(() => {
    const fetchdata = async () => {
      await fetchPendingCastings();
      await fetchFinishCastings();
      await fetchActiveCastings();
    };
    setAnnouncements(
      announcements.concat(
        activeAnnouncements,
        pendingAnnouncements,
        finishAnnouncements,
      ),
    );
    fetchdata();
  }, []);

  const [auxiliar] = useState([
    {
      id: 1,
      image: Images.announcement1,
      title: 'Título de las convocatoria',
      description:
        'Estamos buscando una persona con la capacidad para lorem impsum dolor sit amet lorem ipsum dolor sit',
      deadlineDate: '17/07',
      range: '$2000 - $3000',
      requirements: [
        {
          id: 1,
          title: 'Ser mayor de 22 años',
        },
        {
          id: 2,
          title: 'Tener auto',
        },
        {
          id: 3,
          title: 'Tener el pelo negro',
        },
      ],
      expired: false,

      // IF YOU JOINED TO THE ANNOUNCEMENT
      statusId: 1,
      //meetingDate: null,
      //sendedDate: null,
    },
    {
      id: 2,
      image: Images.announcement2,
      title: 'Título de la convocatoria',
      description:
        'Estamos buscando una persona con la capacidad para lorem impsum dolor sit amet lorem ipsum dolor sit',
      deadlineDate: '17/07',
      range: '$2000 - $3000',
      requirements: [
        {
          id: 1,
          title: 'Ser mayor de 22 años',
        },
        {
          id: 2,
          title: 'Tener auto',
        },
        {
          id: 3,
          title: 'Tener el pelo negro',
        },
      ],
      expired: false,

      // IF YOU JOINED TO THE ANNOUNCEMENT
      statusId: 2,
      //meetingDate: null,
      sendedDate: '12/06',
    },
    {
      id: 3,
      image: Images.announcement3,
      title: 'Título de la convocatoria',
      description:
        'Estamos buscando una persona con la capacidad para lorem impsum dolor sit amet lorem ipsum dolor sit',
      deadlineDate: '17/07',
      range: '$2000 - $3000',
      requirements: [
        {
          id: 1,
          title: 'Ser mayor de 22 años',
        },
        {
          id: 2,
          title: 'Tener auto',
        },
        {
          id: 3,
          title: 'Tener el pelo negro',
        },
      ],
      expired: false,

      // IF YOU JOINED TO THE ANNOUNCEMENT
      statusId: 3,
      meetingDate: '16/05 14:00',
      sendedDate: '16/05',
    },
    {
      id: 4,
      image: Images.announcement1,
      title: 'Título de la convocatoria',
      description:
        'Estamos buscando una persona con la capacidad para lorem impsum dolor sit amet lorem ipsum dolor sit',
      deadlineDate: '17/07',
      range: '$2000 - $3000',
      requirements: [
        {
          id: 1,
          title: 'Ser mayor de 22 años',
        },
        {
          id: 2,
          title: 'Tener auto',
        },
        {
          id: 3,
          title: 'Tener el pelo negro',
        },
      ],
      expired: false,

      // IF YOU JOINED TO THE ANNOUNCEMENT
      statusId: 4,
      meetingDate: '16/05 14:00',
      sendedDate: '16/05',
      // IF IT WAS ACCEPTED
      rate: 4,
    },
    {
      id: 5,
      image: Images.announcement3,
      title: 'Título de la convocatoria',
      description:
        'Estamos buscando una persona con la capacidad para lorem impsum dolor sit amet lorem ipsum dolor sit',
      deadlineDate: '17/07',
      range: '$2000 - $3000',
      requirements: [
        {
          id: 1,
          title: 'Ser mayor de 22 años',
        },
        {
          id: 2,
          title: 'Tener auto',
        },
        {
          id: 3,
          title: 'Tener el pelo negro',
        },
      ],
      expired: false,

      // IF YOU JOINED TO THE ANNOUNCEMENT
      statusId: 5,
      meetingDate: '18/05 15:00',
      sendedDate: '15/05',
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        <ScrollView>
          <SubHeader title={t('my_announcements')} />
          <View style={{paddingVertical: 4}}>
            <AnnouncementsTabView
              loading={loading}
              activeAnnouncements={activeAnnouncements}
              pendingAnnouncements={pendingAnnouncements}
              finishAnnouncements={finishAnnouncements}
              announcements={auxiliar}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
