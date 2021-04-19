import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert, Text as NativeText, ScrollView } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  TextInput,
  Text,
  SubHeader,
} from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { validateEmail } from '@utils';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RepositoryFactory } from '@repositories/RepositoryFactory';
import { checkAuth } from '@repositories/Repository';
import { useDispatch } from 'react-redux';
import { AuthActions } from '@actions';
import HTML from "react-native-render-html";

const authRepository = RepositoryFactory.get('auth');

const htmlContent = `
<h1><a name="_Toc22891591"></a>PRIVACY POLICY</h1>
<p>&nbsp;</p>
<p><a name="_Toc525719715"></a><strong>1.- Who is responsible for the processing of your data?</strong></p>
<p><strong>&nbsp;</strong></p>
<p>PRIVACY POLICY1.- Who is responsible for the processing of your data?The one responsible for the processing of your personal data is MASSESGLOBAL SAS (hereinafter, "MASSES"), with registered office at Av. Dr. LuisAlberto de Herrera 1248, 11300 Montevideo, Uruguay (Sinergia WTC).</p>
<p>&nbsp;</p>
<p>We inform you that the ownership of the Website of https://masses-app.com/hereinafter, “the Website”), belogns to MASSES.</p>
<p>&nbsp;</p>
<p>The access and/or use of the Website, confers you the condition of User(hereinafter, the "User"), and implies the acceptance, from said accessand/or use, of this Privacy Policy.</p>
<p>&nbsp;</p>
<p>Users may contact MASSESat the following email address: info@MASSES-app.com.<a name="_Toc525719716"></a></p>
<p>&nbsp;</p>
<p><strong>2.- Why is MASSES entitled to carry out the data processing?</strong></p>
<p><strong>&nbsp;</strong></p>
<p>MASSES is entitled to process your data in order to be able to carry out, as amere technical intermediary, the link between the Offering Users and the Users.</p>
<p>&nbsp;</p>
<p>MASSES takes the protection of your privacy and personal data veryseriously. Therefore, your personal information is kept secure and handledwith the utmost care.</p>
<p>&nbsp;</p>
<p>This Privacy Policy regulates the access and use of the Website (hereinafter,the "Access and Use of the Site") that are available to Users interested inlinking to others in the Website.</p>
<p>&nbsp;</p>
<p><strong>3.- What are the purposes of the processing of your personal databy MASSES?</strong></p>
<p><strong>&nbsp;</strong></p>
<p><a name="_Toc525719717"></a>Your personal data collected by MASSES may be used for the followingpurposes, according to the consent granted in the correspondingregistration form:</p>
<ul>
<li>Linking both categories of Users on the Website.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>The sending of commercial communications and/or Newsletter byMASSES and on behalf of third parties:</li>
</ul>
<p>If the User has so consented, their personal data may be used to sendthem by letter, telephone, email, SMS/MMS, or by other equivalentelectronic means of communication, commercial communications orinformation from companies related to those with the sectors of:</p>
<p>&nbsp;</p>
<ul>
<li><strong>Telecommunications</strong>: Telecommunications and technologyproducts and services.</li>
<li><strong>Marketing or commercial prospecting</strong>.</li>
<li><strong>Media and Audiovisual</strong>.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Transfer of personal data to third-party businesses: If the User hasconsented to this, their data may be transferred to companies related tothe sectors that are listed and detailed in item 3.2.</li>
</ul>
<p>&nbsp;</p>
<p>The purpose of the assignment will be to send, by letter, telephone,email, SMS/MMS, or by other equivalent electronic means of communication by these companies of information and commercialcommunications that may be of interest to you.</p>
<p>&nbsp;</p>
<p><strong>4.- Veracity of the data provided by the Users and data of minors</strong></p>
<p><strong>&nbsp;</strong></p>
<p>Users guarantee that the personal data provided are true and they takeresponsibility for communicating to MASSES any modification thereof. Usersshall respond, in any case, for the veracity of the data provided, andMASSES shall reserve the right to exclude from the functions provided onthe Website and/or App any User who has provided false data, withoutprejudice to other actions applicable by Law.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719718"></a><strong>5.-Conservation of data</strong></p>
<p><strong>&nbsp;</strong></p>
<p>The personal data provided shall be kept by MASSES as long as the Users donot express their willingness to unsubscribe from the Website and/or App,and this in order to receive information about the company's products.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719719"></a><strong>6.- Users' rights in relation to their data</strong></p>
<p><strong>&nbsp;</strong></p>
<p>Users have the right to:</p>
<p>&nbsp;</p>
<ul>
<li>Access your personal data.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Request the rectification of inaccurate data.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Request its deletion.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Request the limitation of the processing of their data.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Oppose the processing of their data.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Request its portability.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>Not be subject to automated individual decisions.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>In addition, Users may exercise their right to be forgotten.</li>
</ul>
<p>&nbsp;</p>
<p>Users   can   exercise   all   these   rights   at   the   following   email   addressinfo@MASSES-app.com indicating the reason for their request and providinga copy of their ID.</p>
<p>Users can also send their request by ordinary mail to the following address:</p>
<p>&nbsp;</p>
<p>MASSES GLOBAL SAS</p>
<p>Av. Dr. Luis Alberto de Herrera 1248, 11300 Montevideo, Uruguay (Sinergia WTC).</p>
<p>&nbsp;</p>
<p>Without prejudice to any other administrative remedy or legal action, Usersshall have the right to file a claim with a Supervisory Authority, in particularin the Member State in which they have their habitual residence, place ofwork or place of the alleged infringement, in in case they consider that theprocessing of their personal data is not adequate to the regulations, as wellas in the case of not being satisfied with the exercise of their rights. Thesupervisory authority to which the claim has been submitted will inform theclaimant about the course and result of the claim.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719720"></a><strong>7.- Data security</strong></p>
<p><strong>&nbsp;</strong></p>
<p>The protection of the privacy and personal data of Users is very important toMASSES. Therefore, MASSES does everything in its power to prevent theirdata from being used improperly, allowing access to it only to authorizedpersonnel.</p>
<p>&nbsp;</p>
<p>MASSES maintains the security levels of protection of personal data inaccordance with the applicable regulations and has established all thetechnical means at its disposal to prevent the loss, misuse, alteration,unauthorized access and theft of the data that Users provide through theWebsite without prejudice to informing you that the security measures onthe Internet are not impregnable.</p>
<p>&nbsp;</p>
<p>MASSES undertakes to comply with the duty of secrecy and confidentialityregarding personal data in accordance with the applicable legislation, aswell as to grant them a secure processing in the international transfers andassignments of data that, where appropriate, may occur.</p>
<p>&nbsp;</p>
<p>To register as Offering User and/or User of the Website, they must choose apassword. Users are responsible for maintaining the confidentiality of this password, as well as all the activities that occur in the session started withtheir name and password.</p>
<p>&nbsp;</p>
<p>Users undertake to notify MASSES as soon as possible of the unauthorizeduse of their Username and/or password or any other security failure.MASSES shall not be responsible for the damages or losses that couldoriginate due to the non-fulfillment of this obligation by the User.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719721"></a><strong>8.- Changes</strong></p>
<p><strong>&nbsp;</strong></p>
<p>MASSES reserves the right to review its Privacy Policy at the time it deemsappropriate. For this reason, we ask that you regularly check this PrivacyPolicy to read the most recent version of it.</p>
<p>&nbsp;</p>
<p>However, any change that occurs in this Privacy Policy will becommunicated to the User.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719722"></a><strong>9.- Links to web pages</strong></p>
<p><strong>&nbsp;</strong></p>
<p>The MASSES Website may contain links to the websites of third partycompanies and entities. MASSES cannot be held responsible for the way inwhich these companies treat the protection of privacy and personal data, sowe advise you to carefully read the Privacy Policy statements of these webpages that are not owned by MASSES regarding the use, processing andprotection of personal data.</p>
<p>&nbsp;</p>
<p>The conditions offered by these web pages may not be the same as thoseoffered by MASSES.</p>
<p>&nbsp;</p>
<p><a name="_Toc525719723"></a><strong>10.- Questions</strong></p>
<p><strong>&nbsp;</strong></p>
<p>If you have any questions about this Privacy Policy or the processing of yourdata, please contact MASSES by email at the following email address:info@MASSES-app.com.<a name="_Toc525719724"></a></p>
<p>&nbsp;</p>
<p><strong>11.- Acceptance and Consent</strong>.</p>
<p>&nbsp;</p>
<p>Users declare to have been informed of the conditions on protection ofpersonal data, accepting and consenting to the treatment thereof by MASSES, in the manner and for the purposes indicated in this Privacy Policy.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
`;

export default function SignUp({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();




  return (
    <View style={styles.container}>
      <Icon
        name="arrow-left"
        size={20}
        style={{ color: colors.secondary, padding: 10, marginTop: Platform.OS == 'ios' ? 50 : null }}
        onPress={() => navigation.goBack()}
      />
      <Text style={[styles.titulo, { color: 'white' }]}>{t('Pivacy_Policy')}</Text>
      <View style={styles.cardContainer}>
        <ScrollView style={{ padding: '5%', width: '95%' }}>
          <HTML source={{ html: htmlContent }} />
        </ScrollView>
      </View>
    </View>
  );
}
