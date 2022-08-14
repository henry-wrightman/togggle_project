import React from 'react';
import i18n from 'i18n-js';
import { HeavyText, NormalText } from '../common';

function LatestGuess({ data }) {
  const active = data && new Date(data.expiresAt) > Date.now();
  return (
    <div className="centerAlignAndJust contentContainer">
      {data && (
        <>
          <div className="menuTotal row">
            <NormalText>{i18n.t('latestWager')}:</NormalText>
            <HeavyText otherClasses="marginSides">
              {data.guess === 1 ? i18n.t('upSelectionLabel') : i18n.t('downSelectionLabel')}
            </HeavyText>
          </div>
          <div className="menuTotal row">
            <NormalText>{i18n.t('status')}:</NormalText>
            <HeavyText otherClasses="marginSides">
              {active ? i18n.t('pending') : data.winner ? i18n.t('winner') : i18n.t('loser')}
            </HeavyText>
          </div>
        </>
      )}
      {data && !active && (
        <>
          <div className="menuTotal row">
            <NormalText>{i18n.t('initialPrice')}:</NormalText>
            <HeavyText otherClasses="marginSides">
              {data.initialPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </HeavyText>
            <NormalText>{i18n.t('finalPrice')}:</NormalText>
            <HeavyText otherClasses="marginSides">
              {data.finalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </HeavyText>
          </div>
        </>
      )}
    </div>
  );
}

export { LatestGuess };
