import React from 'react';
import i18n from 'i18n-js';
import { HeavyText, NormalText, Checkbox } from '../common';

function GuessContent({ data, checkboxOnTrigger }) {
  const hasData = data && data.tokenData && data.player;
  const guessCount = data.player && data.player.guesses ? data.player.guesses.length : 0;
  return (
      <div className='centerAlignAndJust contentContainer'>
        {hasData && !data.error ? (
        <div>
          <div className='menuTotal row'>      
            <NormalText>{i18n.t('currentPrice')}:</NormalText>
            <HeavyText otherClasses='marginSides'>${data.tokenData.bitcoin.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</HeavyText>
            <NormalText otherClasses='marginSides'><Checkbox label={i18n.t('realTimeCheckboxLabel')} value={data.realtime} onChange={checkboxOnTrigger} /></NormalText>
          </div>
          <div className='menuTotal row'>      
            <NormalText>{i18n.t('currentScore')}:</NormalText>
            <HeavyText otherClasses='marginSides'>{data.player.score.value}</HeavyText>
          </div>
          <div className='menuTotal row'>      
            <NormalText>{i18n.t('pastGuesses')}:</NormalText>
            <HeavyText otherClasses='marginSides'>{guessCount}</HeavyText>
          </div>
        </div>
      ) : (
        (data && data.error ? (
          <div className='menuTotal row'>      
            <NormalText>{i18n.t('error')}:</NormalText>
            <HeavyText otherClasses='marginSides'>{data.error}</HeavyText>
          </div>
        ) : (null))
      )}
    </div>
  );
};

export { GuessContent };
