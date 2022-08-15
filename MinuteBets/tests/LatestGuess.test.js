import { LatestGuess } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';
import { render, screen, waitFor } from '@testing-library/react';

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial empty LatestGuess state', async () => {
  const data = undefined;

  render(<LatestGuess data={data} />);

  await waitFor(() => expect(screen.findByText(/Latest Wager/)).rejects, { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Status/)).rejects, { timeout: 3000 });
});

it('populated active LatestGuess state', async () => {
  const data = {
    id: 38,
    playerId: 2,
    guess: 1,
    initialPrice: 24618,
    finalPrice: 24618,
    winner: false,
    createdAt: '2022-08-14T02:57:33.930Z',
    expiresAt: new Date(Date.now() + 60000),
  };

  render(<LatestGuess data={data} />);

  await waitFor(() => expect(screen.findByText(/Latest Wager/)).resolves.not.toBeNull(), { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Status/)).resolves.not.toBeNull(), { timeout: 3000 });

  await waitFor(
    () => expect(screen.findByText(/error/)).rejects, // not found
    { timeout: 3000 }
  );
});

it('populated inactive LatestGuess state', async () => {
  const data = {
    id: 38,
    playerId: 2,
    guess: 1,
    initialPrice: 24618,
    finalPrice: 24618,
    winner: false,
    createdAt: '2022-08-14T02:57:33.930Z',
    expiresAt: Date.now().toString(),
  };

  render(<LatestGuess data={data} />);

  await waitFor(() => expect(screen.findByText(/Latest Wager/)).resolves.not.toBeNull(), { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Status/)).resolves.not.toBeNull(), { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Initial Price/)).resolves.not.toBeNull(), { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Final Price/)).resolves.not.toBeNull(), { timeout: 3000 });
});
