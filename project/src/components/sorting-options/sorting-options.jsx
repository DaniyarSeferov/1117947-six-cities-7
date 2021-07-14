import React from 'react';
import {SortingOption} from '../../const';

function SortingOptions(props) {
  const activeOptionKey = 'POPULAR';

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {SortingOption[activeOptionKey]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.entries(SortingOption).map(([optionKey, optionLabel]) => (
          <li key={optionKey} className={`places__option ${activeOptionKey === optionKey ? 'places__option--active' : ''}`} tabIndex="0">{optionLabel}</li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
