import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { LatestGuess, GuessContent, GuessForm, GuessTimer} from './';
import i18n from 'i18n-js';
import useApiCall from '../../hooks/useApiCall';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

const TIMER_BUFFER = 1100; // buffer to pad countain client-side against server-side timer
const LATEST_GUESS_DISPLAY_OFFSET = 60000; // display offset (~1m) for showing the current/latest guess results; overrides on refresh

function reducer(state, action) {
  switch (action.type) {
    case 'bet':
      return { ...state, bet: action.bet };
    case 'data':
      return { ...state, tokenData: action.tokenData, player: action.player, error: null, bet: null, loading: false };
    case 'error':
      return { ...state, error: action.error, bet: null };
    case 'refresh':
      return { ...state, bet: null, error: null, refresh: !state.refresh }
    case 'timerActive':
      return { ...state, timerActive: !state.timerActive, refresh: !state.refresh };    
    default:
      throw new Error();
  }
}

const INITIAL_STATE = {
  error: null,
  loading: true,
  bet: null,
  tokenData: null,
  player: null,
  refresh: false,
  timerActive: false
};

function GuessContainer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [currentPrice, setPrice] = useState(0);
  const [cookies, setCookie] = useCookies(['user']);
  const [active, setActiveTimer] = useState(false);

  const fetchTokenData = useApiCall("/", "GET");
  //const fetchLeaderboard = useApiCall("/leaderboard", "GET");
  const fetchUser = useApiCall("/player", "POST", { identifier: cookies.user });
  const requestBet = useApiCall("/guess", "POST", { playerId: state.player?.id || undefined, guess: state.bet || undefined, initialPrice: currentPrice });

  useEffect(
    function() {
      async function queryData() {
        handleCookiedUser();

        const tokenData = await fetchTokenData();
        const user = await fetchUser();
        if (tokenData.data.error || user.data.error) {
          dispatch({ type: 'error', error: (tokenData.data.error || user.data.error)});
        } else {
          setPrice(tokenData.data.bitcoin.usd);
          dispatch({ type: 'data', tokenData: tokenData.data, player: user.data }); 
        }       
      } 
      queryData();
    },
    [state.refresh, cookies.user]
  );

  useEffect(
    function () {
      async function attemptedRequest() {
        if (state.bet && state.player.id) {
          const response = await requestBet();
          if (response.data.error) {
            dispatch({ type: 'error', error: response.data.error });
          } else {
            dispatch({ type: 'timerActive' });
          }
        } 
      }
      attemptedRequest();
    },
    [state.bet]
  );

  const onFormSubmission = useCallback(
    function (data) {
      if (data.error) dispatch({ type: 'error', error: data.error });
      else if (data.refresh) dispatch({ type: 'refresh' });
      else dispatch({ type: 'bet', bet: data.bet });
    }
  );

  const handleCookiedUser = () => {
    const exists = cookies.user;
    return exists ? cookies.user : setCookie('user', uuidv4());
  }

  const timerCompleted = () => {
    dispatch({ type: 'refresh' });
  }

  const canDisplayContent = !state.loading;
  const latestGuess = state.player && state.player.guesses ? state.player.guesses[state.player.guesses.length-1] : undefined;
  const currentGuessETA = latestGuess ? new Date(latestGuess.expiresAt) : undefined;
  const displayCurrentGuess = latestGuess && currentGuessETA && (new Date(currentGuessETA.getTime() + LATEST_GUESS_DISPLAY_OFFSET) > Date.now());
  return (
    <>
    <div className='centerAlignAndJust column container'>
    { displayCurrentGuess && (
      <div className='contentContainer borderLightRounded'>
        <LatestGuess data={latestGuess} />
        <GuessTimer onCompletion={timerCompleted} target={new Date(currentGuessETA.getTime() + TIMER_BUFFER)} />      
      </div>
    )}
    </div>
    <div className='centerAlignAndJust column container'>
      {state.loading && i18n.t('loading')}
      {canDisplayContent && (
        <div className='contentContainer borderLightRounded'>
          <GuessForm onCallback={onFormSubmission} active={currentGuessETA > Date.now()}/>
          <GuessContent data={state} />
        </div>
      )}
    </div>
    </>
  );
};

export { GuessContainer };