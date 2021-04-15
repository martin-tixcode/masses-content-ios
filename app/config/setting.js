/**
 * Basic Setting Variables Define
 */
const production = true;

export const BaseSetting = {
  name: 'Masses Content',
  displayName: 'Masses Content',
  appVersion: '1.0.7',
  defaultLanguage: 'en',
  languageSupport: ['en', 'es'],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    es: {
      translation: require('../lang/es.json'),
    },
  },
  AWS_ACCESS_KEY_ID: 'AKIAQBOIHUWX2G4XI6IZ',
  AWS_SECRET_ACCESS_KEY: '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',
  AWS_DEFAULT_REGION: 'us-east-2',
  AWS_BUCKET: 'dev-masses',

  serverUrl: production
    ? 'https://masses-app.com'
    : 'https://dev.masses-app.com',
  apiUrl: production
    ? 'https://masses-app.com/api'
    : 'https://dev.masses-app.com/api',
  agoraAppId: '86d4de3522d54b789d7a86356809f981',
  // agora: 86d4de3522d54b789d7a86356809f981

  // agoraGonza: 4e9e0ea2bd564a7c83e42d21258bd94c
};
