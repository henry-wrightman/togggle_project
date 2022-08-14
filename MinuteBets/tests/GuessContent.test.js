import renderer from 'react-test-renderer';
import { GuessContent } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessContent state', () => {
  const data = {};
  
  const component = renderer.create(
    <GuessContent data={data} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //console.log(JSON.stringify(tree));
  //expect().toBe();

  //manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseEnter();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseLeave();
  // });
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});