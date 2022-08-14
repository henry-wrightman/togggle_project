import React from 'react';
import translations from './translations';
import './styles/main.scss';
import { HeavyText } from './components/common';
import { GuessContainer } from './components/guess';
import i18n from 'i18n-js';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nunito:400'],
  },
});

const App = () => {
  i18n.defaultLocale = 'en';
  i18n.translations = translations;

  return (
    <div className="centerAlignAndJust column">
      <HeavyText otherClasses="marginSides embolden">{i18n.t('minuteBets')}</HeavyText>
      <GuessContainer />
    </div>
  );
};

export default App;
