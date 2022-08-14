import renderer from 'react-test-renderer';
import { GuessContent } from '../src/components/guess';
import React from 'react';
import translations from '../src/translations';
import i18n from 'i18n-js';
import { render, screen, waitFor } from "@testing-library/react";

i18n.defaultLocale = 'en';
i18n.translations = translations;

it('initial empty GuessContent state', async () => {
  const data = {};
  
  render(<GuessContent data={data} />);

  await waitFor(() => expect(screen.findByText(/Current BTC Price/)).rejects,
    { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Past Guesses/)).rejects,
    { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/error/)).rejects,
    { timeout: 3000 });
});

it('populated GuessContent state', async () => {
  const data = {
    "error": null,
    "loading": false,
    "bet": null,
    "tokenData": {
        "bitcoin": {
            "usd": 24542
        }
    },
    "player": {
        "id": 2,
        "identifier": "9eed8f75-3a66-496c-b9b5-c7fe587961fc",
        "score": {
            "id": 2,
            "value": -3,
            "time": "2022-08-14T06:56:45.138Z"
        },
        "guesses": [
            {
                "id": 38,
                "playerId": 2,
                "guess": 1,
                "initialPrice": 24618,
                "finalPrice": 24618,
                "winner": false,
                "createdAt": "2022-08-14T02:57:33.930Z",
                "expiresAt": "2022-08-14T02:58:33.930Z"
            },
        ]
    },
    "refresh": true,
    "timerActive": true
  };
  
  render(<GuessContent data={data} />);

  await waitFor(() => expect(screen.findByText(/Current BTC Price/)).resolves.not.toBeNull(),
    { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Past Guesses/)).resolves.not.toBeNull(),
    { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/error/)).rejects, // not found
    { timeout: 3000 });
});

it('error populated GuessContent state', async () => {
  const data = { error: "some error" };
  
  render(<GuessContent data={data} />);

  await waitFor(() => expect(screen.findByText(/some error/)).resolves.not.toBeNull(),
    { timeout: 3000 });

  await waitFor(() => expect(screen.findByText(/Current BTC Price/)).rejects, // not found
    { timeout: 3000 });
});