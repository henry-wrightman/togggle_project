import renderer from 'react-test-renderer';
import { GuessForm } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';
import { render, screen, waitFor } from "@testing-library/react";

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessForm components', async () => {
  const onCallback = () => {};
  
  render(<GuessForm onCallback={onCallback} />);

  const dropDown = await screen.findByText(/Select Bet../);
  expect(dropDown).not.toBeNull();

  expect(screen.getByRole("button", { name: /place/i })).not.toBeNull();
  expect(screen.getByRole("button", { name: /refresh/i })).not.toBeNull();
});