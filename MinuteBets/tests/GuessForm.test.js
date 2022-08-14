import renderer from 'react-test-renderer';
import { GuessForm } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessForm state', () => {
  const onCallback = () => {};
  
  const component = renderer.create(
    <GuessForm onCallback={onCallback} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});