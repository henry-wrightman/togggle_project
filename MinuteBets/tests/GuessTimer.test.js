import { GuessTimer } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial GuessTimer state', async () => {
  const onCallback = () => {};
  
  render(<GuessTimer onCompletion={onCallback} />); // no target

  await waitFor(() => expect(screen.findByText(/until guess resolves/)).rejects, // not found
    { timeout: 3000 });

});

it('active GuessTimer state', async () => {
  const onCallback = () => {};
  
  render(<GuessTimer onCompletion={onCallback} target={Date.now()+5000} />);

  await waitFor(() => expect(screen.findByText(/until guess resolves/)).resolves.not.toBeNull(),
    { timeout: 3000 });

});