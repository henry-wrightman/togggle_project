import React, { useState } from 'react';
import i18n from 'i18n-js';
import { Button, SelectDropdown } from '../common';

function GuessForm({ onCallback, active }) {
  const [data, setData] = useState('');

  const submitGuess = async () => {
    if (!data.bet) {
      onCallback({ error: "NO_GUESS_SELECTED" });
      return; 
    } else if (active) {
      onCallback({ error: "GUESS_ALREADY_ACTIVE" });  
      return;    
    }

    onCallback(data);
  };

  const submitRefresh = async () => {
    onCallback({ refresh: true });
  }

  const selectOnChange = (selection) => {
    setData({ bet: selection.value });
  }

  const selectOptions = [{ value: 1, label: i18n.t('upSelectionLabel')}, 
                          { value: -1, label: i18n.t('downSelectionLabel')}];

  return (
      <div className='centerAlignAndJust contentContainer row'>
        <SelectDropdown
          className={'select'}
          options={selectOptions}
          placeholder={i18n.t('selectBet')}
          onChange={selectOnChange} />
        <Button 
          className='button row centerAlignAndJust lightText' 
          onClick={submitGuess} 
          text={i18n.t('submitButtonTitle')} />
        <Button 
          className='button row centerAlignAndJust lightText' 
          onClick={submitRefresh} 
          text={i18n.t('refreshButtonTitle')} />
    </div>
  );
};

export { GuessForm };
