import React, {useState} from 'react';
import {View, ScrollView, Switch} from 'react-native';
import {SafeAreaView, Header, Icon, Text, TextInput, Button} from '@components';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Summary({navigation, route}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [carryOutIsEnabled, setCarryOutIsEnabled] = useState(false);
  const [comment, setComment] = useState(null);

  const totalPrice = () => {
    let price = 0;
    route.params.products.forEach(
      product => (price += product.product.price * product.quantity),
    );
    return price;
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('summary')}
        subTitle={t('your_order')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{padding: 20}}>
        {route.params.products.map((product, index) => {
          return (
            <View style={styles.product} key={index}>
              <Text body1 semibold style={styles.productLeft}>
                {product.product.name} x {product.quantity}
              </Text>
              <Text title3 light style={styles.productRight}>
                {route.params.products[0].product.categoryId !== 4 ? '$' : null}
                {product.product.price * product.quantity}
              </Text>
            </View>
          );
        })}
        <View style={styles.finalPrice}>
          <Text title2 semibold>
            {t('final_amount')}
          </Text>
          <Text title2 semibold>
            {route.params.products[0].product.categoryId === 4
              ? `${totalPrice()} Puntos`
              : `$${totalPrice()}`}
          </Text>
        </View>
        <View style={styles.switch}>
          <Text body1>{t('order_to_carry_out')}</Text>
          <Switch
            trackColor={{false: '#767577', true: 'white'}}
            thumbColor={carryOutIsEnabled ? colors.accent : '#f4f3f4'}
            onValueChange={() => {
              setCarryOutIsEnabled(previousState => !previousState);
            }}
            value={carryOutIsEnabled}
          />
        </View>
        <TextInput
          style={{marginVertical: 30, height: 70}}
          onChangeText={text => setComment(text)}
          textAlignVertical="top"
          multiline={true}
          placeholder={t('comments')}
          value={comment}
        />
      </ScrollView>
      <View style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
        <View>
          <Text caption1 semibold>
            {route.params.products.length}{' '}
            {route.params.products.length > 1 ? t('products') : t('product')}
          </Text>
          <Text title3 primaryColor semibold>
            {route.params.products[0].product.categoryId === 4
              ? `${totalPrice()} Puntos`
              : `$${totalPrice()}`}
          </Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate('Payment', {
              amount: totalPrice(),
              carryOut: carryOutIsEnabled,
              products: route.params.products,
            });
          }}>
          {t('finish_order')}
        </Button>
      </View>
    </SafeAreaView>
  );
}
