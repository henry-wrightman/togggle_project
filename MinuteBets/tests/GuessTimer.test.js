import renderer from 'react-test-renderer';
import { GuessTimer } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessTimer state', () => {
  const onCallback = () => {};
  
  const component = renderer.create(
    <GuessTimer onCompletion={onCallback} target={Date.now()+5000} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});