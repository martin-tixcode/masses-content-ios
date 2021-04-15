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
<h2><u>INTRODUCTION</u></h2>
<p>Welcome to the Mobile Application and the Internet Site <a href="http://www.masses-app.com">www.masses-app.com</a> &nbsp;and its associated services, such as the mobile and/or web applications(hereinafter "The Mobile Application and the Site") owned by MASSESGLOBAL SAS (together with its affiliated and related companies, “MASSES”and/or “MASSES GLOBAL SAS”). The terms and conditions described below(hereinafter the "T&Cs") are intended to regulate the use made by peoplewho access the Mobile Application and the Site.</p>
<p>We call "User" of the Mobile Application and the Site any person registeredor who uses the Mobile Application and the Site. Anyone can register or usethe Mobile Application and the Site as long as they accept the T&Cs, alongwith all other policies and principles that govern The Mobile Application andthe Site, such as the "Privacy Policies", "Legal Notices", "T&Cs" and "CookiesPolicies".</p>
<p>MASSES only provides the Mobile Application and the Site to bring togetherboth the Offering User of a service (hereinafter "Offering Users") and theUser interested in contracting such offers (hereinafter "User", and as awhole with the Offering Users " Users ”).</p>
<p>The Offering User may offer on the Platform Audiovisual Content Generatedby the same (hereinafter the "UGC"), and each User will be able to identifythe Offering Users when selecting the UGC that is of interest, since whenpreviously selecting a UGC it is indicated that it is sold and delivered by theselected Offering User.</p>
<p>MASSES only makes available to all its Users, through the Mobile Applicationand the Site, a virtual linking space, it being a mere technical intermediarybetween the Parties (hereinafter the "Linking Space"). In the event that oneor more Users or any third party initiate any type of claim or legal actionsagainst a User or Offering User, each and every one of those involved in saidclaims or actions exempts MASSES and its directors, managers, employees,agents, officers, representatives and attorneys from all liability.</p>
<p>The Linking Space is limited to the provision of a technology platform thatallows the Users of the Mobile Application and the Site, to link immediatelywith Users from all over the world and thus be able to meet the needs ofone with the UGC of the other.</p>
<p>The User knows and accepts that when carrying out operations with otherUsers or third parties, they do so at their own risk and that they will makean evaluation of the risks incurred when hiring an Offering User, keepingdue proportion between the risk and the selected means.</p>
<p>This agreement does not create any partnership, mandate, franchise, oremployment relationship between MASSES and the Users. The Usersacknowledge and accept that MASSES is not a party to any operation, nordoes it have any control over the quality, security or legality of the UGC oradvertisements, the veracity or accuracy of the advertisements, the Users'ability to provide such content or to pay for them.</p>
<p>The T&Cs as well as the Privacy Policies and/or information about the MobileApplication and the Site apply to all Users of the Mobile Application and theSite from the first moment they enter it. These T&Cs are mandatory andbinding and apply to all activities carried out on the Mobile Application andthe Site. If Users do not fully accept these T&Cs, and the Privacy Policies andother legal notices of the Site, they shall not use the Mobile Application andthe Site.</p>
<p>The User and Offering User are responsible for ensuring that all persons whoaccess the Mobile Application and the Site through their Internet connectionare aware of the T&Cs and that they comply with them.</p>
<h2>Declaration of Offering Users and Users.</h2>
<p><br />The Offering User declares, understands and declares:</p>
<ul>
<li>That he/she is not carrying out any performance and interpretationthrough the UGC, he/she states that he/she is not an actor/actress,and that the UGC sent through the MASSES Web and MobileApplication must not contain any performance, nor are they scripted.</li>
<li>And he/she guarantees that the UGC uploaded and made available onthe Mobile Application and the Site, do not contain any pre-existingand/or infringing material, as well as he/she guarantees and declaresto have obtained all the pertinent authorizations to the UGC, whichallow the peaceful use thereof.</li>
<li>He/she declares that his/her UGC is of a purely testimonial nature andnot theatrical, and any specific legislation related to actors shall notbe applicable to the relationship between the parties.</li>
<li>He/she expressly declares that he/she is not a member of SAG-AFTRA,and that you do not have the right to be one by virtue of the UGCuploaded and offered through the Mobile Application and the Site.</li>
</ul>
<p>MASSES accepts and receives said declaration and states that it is not a filmproduction company, but a mere technical intermediary, which through itsTechnological Platform (hereinafter the "Platform") allows the Users of theMobile Application and the Site, to link in an immediate way being able tobring the UGC created by the Offering Users to the User. The Users declarethat said intervention and/or link through the technological platform shallnot constitute any type of employment relationship with MASSES for theOffering User and the User.</p>
<h2>You must know</h2>
<p>Before each contract, as User and Offering User, you will have to read,understand and accept all the conditions established in the T&Cs and in thePolicies of MASSES. If you use the Mobile Application and the Site, it meansthat you have fully accepted the conditions established in the T&Cs and inthe MASSES Policies. We shall have the right to suspend or delete certainUser accounts that by action or omission commit a violation of these T&Cs.</p>
<p>Once you have registered as Offering User you will periodically receivenotifications through the App and/or you may eventually receive emails and/or any other method for your convenience, with the information fromthe Mobile Application and the Site and the calls that are related to yourprofile. If you do not want to receive more emails, you must indicate it byclicking on the corresponding box in "My account" or through the email thatwe have sent you in the option that appears at the end of it.</p>
<h2>When you register as a MASSES User</h2>
<p>It is mandatory that you complete all the fields of the registration form withvalid data in order to start participating in the calls of The Mobile Applicationand the Site. You must complete it with the personal information in anexact, precise and true way ("Personal Data") undertaking the commitmentto update the Personal Data as necessary.</p>
<p>As Users, you must guarantee and respond, in any case, to the truthfulness,accuracy, validity and authenticity of the Personal Data entered.</p>
<p>MASSES may use various means to identify its Users, but MASSES is notresponsible for the accuracy of the Personal Data provided by its Users.</p>
<p>MASSES has the right to request some proof and/or additional data in orderto confirm the Personal Data, as well as to temporarily or permanentlysuspend those Users whose data could not be confirmed. In cases ofdisqualification, they shall be removed from possible future calls, withoutgenerating any right to compensation.</p>
<p>MASSES has the right to reject any application for registration or cancel aregistration previously accepted, without being compelled to communicateor state the reasons for its decision and without generating any right tocompensation or indemnification.</p>
<p>Remember that by submitting the UGC you are granting us and our affiliatesa perpetual, irrevocable, worldwide, non-exclusive, royalty-free and fullysublicensable right and a license to use, reproduce, modify, adapt, publish,translate, distribute, perform and show said UGC, always by virtue of thepurposes proposed for each call. If in the UGC you have included personaldata about another person, before sending it, you must ensure andguarantee that said person has consented to be bound by these T&Cs.</p>
<p>As User and Offering User, you accept and understand that MASSES cankeep your content for as long as it needs to complete the purposes forwhich it was collected. If the call has ended and after the selection processyour UGC has not been chosen by the User, we will proceed to fully destroywhat you have sent us by virtue of said call.</p>
<p>If your UGC has been selected, the rights and terms thereof shall be subjectto what is established and specified in the contract that you subsequentlyenter into through our platform.</p>
<h2>UGC rules, that is, all content uploaded, sent and chosen</h2>
<p>You have to know that as Offering User you are accepting and guaranteeingthat the UGC sent does not contain:</p>
<ul>
<li>Material that is Defamatory for anyone.</li>
<li>Any obscene, offensive, defamatory material.</li>
<li>Any sexually explicit material.</li>
<li>Any material that promotes violence.</li>
<li>Any material that promotes discrimination based on race, sex,religion, national origin, disability, sexual orientation or age.</li>
<li>Any copyright, database right, or trademark of any other person.</li>
<li>The privacy rights of any other person.</li>
<li>The personal data of another person, unless you ensure that saidperson has consented to be bound by these T&Cs.</li>
<li>Any material that promotes any illegal activity.</li>
<li>Threats, abuse, or invasion of another person's privacy.</li>
<li>Content that causes unnecessary inconvenience, inconvenience, oranxiety.</li>
<li>Harassment, upsets, or content that embarrasses, alarms, or upsetsany other person.</li>
<li>Content by which you violate the identity of another person.</li>
</ul>
<p>The Offering User expressly declares and guarantees that the UGC does notcontain any pre-existing or infringing material and that it has obtained thecorresponding authorizations to allow the peaceful use of the UGC.</p>
<p>Any UGC that you upload to the Mobile Application and the Site will beconsidered non-confidential and MASSES has the right to use, copy anddisclose said content to third parties for the purposes of the Call. MASSEShas the right to reveal the identity of the same to any third party who claimsthat any content sent constitutes a violation of their intellectual propertyrights, or their right to privacy.</p>
<p>MASSES will not be liable to third parties for the UGC or the accuracy of anysent UGC. MASSES has the right to remove any UGC or advertisement sentthrough the Mobile Application and the Site at its sole discretion.</p>
<h2>Your password key</h2>
<p>As Users, you are responsible for the confidentiality and use of yourpassword keys and all the information that you enter in the MobileApplication and the Site.</p>
<p>Remember that as Users only you are authorized to your own accounts andtherefore you should not reveal your passwords to anyone else. If youdiscover that someone unauthorized is using your account, please contactus immediately.</p>
<h2>Operating through MASSES</h2>
<p>You must also understand and accept that all the risks and consequencesinvolved in the operations carried out through the Mobile Application andthe Site shall be your sole responsibility, exempting MASSES from any typeof responsibility that may be incurred during the operation of the MobileApplication and the Site.</p>
<p>MASSES may modify the structure of the Mobile Application and the Site aswell as the mechanism by which the instructions are given, notifying Usersthrough the mechanisms established in the T&Cs. MASSES shall understandthat Users have acknowledged of and accepted the modifications bycontinuing to use the Mobile Application and the Site and participating incalls.</p>
<p><strong>OFFERING Users and Users </strong></p>
<ol>
<li>Any natural person who receives a user account from MASSES inorder to be able to offer their UGC to other Users on the MobileApplication and the Site is recognized as Offering User.</li>
<li>Any natural and/or legal person who subscribes and receives fromMASSES a user account in the Mobile Application and the Site in orderto contract the UGC uploaded and offered by the Offering Users isrecognized as User.</li>
</ol>
<p><strong>Legal responsibilities of Offering Users and Users before MASSES</strong></p>
<ol>
<li>MASSES is a mere technical intermediary that makes a TechnologicalPlatform,  a digital mechanism, available so that Offering Users canoffer content generated by themselves, such as videos, audio and/orphotos, to the community of Users of the Mobile Application and theSite.</li>
<li>In no case shall MASSES be responsible for damages and/or lossesand/or losses of any kind that the Offering Users and/or Users maysuffer as a consequence or on the occasion of the contractingbetween them, nor shall it be responsible for the terms of contractingagreed between the Users.</li>
<li>MASSES is solely a mere technical intermediary between Users,offering a platform that facilitates the meeting between OfferingUsers and Users so that they can be linked, some offering their UGCin the Mobile Application and the Site and others being able to buysuch offers. Likewise, the Offering User, when offering their UGC,accepts and acknowledges that MASSES does not have a directrelationship with the User, therefore, Users must be aware and acceptthat MASSES is not responsible for any act committed by Users and/orby third parties, including but not limited to pre-selected UGCwithdrawals or cancellation thereof, delays, refusals of payments,losses, and others. Users accept that they must have the knowledgeand that they approve that when using the Mobile Application and theSite they must assume the risks that this entails under their soleresponsibility.</li>
</ol>
<p><strong>Indemnity</strong></p>
<p>The Offering User and the User shall defend, exonerate  and hold MASSESharmless from all damage, responsibility and cost that may arise as a resultof a third party claim, action or lawsuit against MASSES and/or its directorsand/or representatives and/or employees of any position, including, but notlimited to reasonable legal expenses, resulting from any UGC and/ormaterial that they have provided to MASSES through any improper use ofthe virtual linking environment provided by the Platform or in violation ofthese Terms and Conditions. MASSES shall promptly notify them of any demand, action or process through the data that they themselves haveprovided at the time of registration on the platform that MASSES offers. Byaccepting these Terms and Conditions, Users acknowledge and accept thatMASSES has no direct or indirect responsibility in relation to the UGCacquired between the Offering Users and each User and/or with thirdparties.</p>
<h2>Payment</h2>
<p>We clarify that the commercial conditions offered in the Mobile Applicationand the Site are for Users. MASSES is a mere technical intermediary andtherefore does not participate in the effective contracting in any way.</p>
<p>By requesting and/or participating in a call you shall be giving your expressconsent to the use of PayPal as the available form for the payment of theUGC offered. The Users are obliged not to modify the cachet offered in theCall.</p>
<p>In the event that your video is selected, MASSES shall be the FacilitatingAgent so that the User can pay for the UGC generated by the Offering User.For this, MASSES shall make its own PayPal account available to bothcategories of Users so that these transactions can be carried out withoutany difficulty, thus facilitating the payment link between the Offering Usersand each User.</p>
<p>Consequently, MASSES shall not be responsible for damages and/or lossesand other losses that may be caused, which will be the sole responsibility ofthe contracting User and/or companies during the commercial managementof their businesses. The Users are obliged to hold MASSES harmless fromany third party claim for any payment made or to be made by virtue of theuse made by the contracting User and/or companies of the UGC for themanagement of their businesses.</p>
<h2>Liability - Waiver</h2>
<p>All information, products, content and other materials in The MobileApplication and the Site, accessible from the same, or in third party Sitesshall be provided "as is" and without warranties or representations of anykind, either expressly or implicitly.</p>
<p>Users acknowledge, accept and take responsibility for the risks derived fromthe use of the Internet as a means of electronic commerce, in no caseneither MASSES nor its suppliers shall be responsible for direct, indirect,punitive, incidental, special, resulting damages or any other other types,including, but not limited to, damages for loss of use, data or earnings,arising from or related to the use of the Mobile Application and the Site, withthe impossibility or delay in being able to use The Mobile Application andthe Site, or due to the execution of orders or the inability to do so, or withany related information, software, products or graphics obtained throughthe Mobile Application and the Site, or which have been accessed from anyother form related to the use of the Mobile Application and the Site. Thisprovision is applicable whether the origin of the damage is contractual, noncontractual, even if MASSES or any of its suppliers have been notified of thepossibility of damage.</p>
<p>The Users acknowledge and accept that the System used for the operationthrough the Mobile Application and the Site is a sensitive system thatdepends on different resources and that it may suffer crushes, cuts and/orinterruptions beyond the control of MASSES, and that system response canvary due to various factors, including operating volumes and systemperformance. Users assume the risks and damages that said operation couldgenerate.</p>
<h2>Company Name and Address</h2>
<p>The business name of the company is MASSES GLOBAL SAS, and itestablishes its domicile for all questions related to these T&Cs and for anyeventuality at Av. Dr. Luis Alberto de Herrera 1248, 11300 Montevideo,Uruguay. (Sinergia  WTC).</p>
<h2>Notifications</h2>
<p>All notifications and/or communications that must be made for the use ofthe website under these T&Cs, must be made in writing: (i) To Users: byemail, to the email account provided by them, or by registered letter, to theaddress declared in the registration form; (ii) to MASSES: to the email account postmaster@lamasaapp.com, or to its legal address indicated in theprevious item.</p>
<h2>Jurisdiction and Applicable Law</h2>
<p>These T&Cs are governed without exception and in all their items by thelaws of Uruguay and shall be interpreted in accordance with them.</p>
<p>In the event of any difference, disagreement or conflict derived from theinterpretation, validity, scope and/or application of these T&C, the Usersshall communicate with MASSES in a reliable way, sending their claim, sothat the parties try to reach an agreement.</p>
<p>In the event that it is not possible to reach a solution, and to guaranteeconsumers full access to justice, Users may submit their claim to theordinary Courts of Montevideo, Uruguay with competence in the matter inthe absence of another jurisdiction established by the applicable specialregulations. In the event that said option is cumbersome or economicallyunfeasible for Users domiciled abroad, the parties, at the request of theUsers, shall determine by common agreement a mutually convenientmechanism to resolve their differences.</p>
<h2>Terms and Conditions update</h2>
<p>MASSES shall have the right to modify the T&Cs at any time and withoutprior notice, serving its updated publication on the Mobile Application andthe Site as sufficient notification to the Users. Users accept that a printedversion of these T&Cs and of any communication given electronically shallbe admissible as full evidence in the judicial or administrative proceedingsconcerning the Mobile Application and the Site.</p>
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
        style={{ color: colors.secondary, padding: 10 }}
        onPress={() => navigation.goBack()}
      />
      <Text style={[styles.titulo, { color: 'white' }]}>Terms and Conditions</Text>
      <View style={styles.cardContainer}>
        <ScrollView style={{ padding: '5%', width: '95%' }}>
          <HTML source={{ html: htmlContent }} />
        </ScrollView>
      </View>
    </View>
  );
}
