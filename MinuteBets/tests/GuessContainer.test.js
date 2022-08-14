import renderer from 'react-test-renderer';
import { GuessContainer } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessContainer state', () => {
  
  const component = renderer.create(
    <GuessContainer />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});