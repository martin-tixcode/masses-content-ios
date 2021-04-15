import React, {useState} from 'react';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {View, ScrollView, Text as NativeText, TouchableOpacity} from 'react-native';
import {useTheme, BaseColor} from '@config';
import {Text, Button} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function BottomModal({
  navigation,
  isVisible,
  onCloseModal,
  onAccept,
  type,
  title,
  agreementText,
}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const CurrentBottomModal = () => {
    switch (type) {
      case 'agreement':
        return (
          <Modal
            isVisible={isVisible}
            onSwipeComplete={onCloseModal}
            swipeDirection={['down']}
            style={styles.bottomModal}
            onBackdropPress={onCloseModal}
            >
              
            <View style={[styles.contentBottomModal, {backgroundColor: colors.card}]}>
              <View style={styles.contentSwipeDown}>
                <View style={styles.lineSwipeDown} />
              </View>
              <Text title2 semibold style={{textAlign: 'center', marginBottom: 10}}>
                {t(title)}
              </Text>
              
                
                <ScrollView>
                  <TouchableOpacity>

                <NativeText style={{fontSize: 16}}>{agreementText}</NativeText>
                  </TouchableOpacity>
                </ScrollView>
                
              
                
                
              
              <Button style={[styles.button, {marginTop: 20}]} onPress={onAccept}>
                {t('i_agree')}
              </Button>
              <Button
                styleText={{color: colors.primary}}
                style={([styles.button], {backgroundColor: 'none'})}
                onPress={onCloseModal}>
                {t('go_back')}
              </Button>
            </View>
          </Modal>
        );
    }
  };
  return <CurrentBottomModal />;
}

BottomModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  agreementText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};
