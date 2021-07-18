import React, {useState} from 'react';
import {SortingOption} from '../../const';
import PropTypes from 'prop-types';

function SortingOptions(props) {
  const [listIsOpened, setListState] = useState(false);
  const {sortKey, onChangeSelect} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={(event) => {
          event.preventDefault();
          setListState(!listIsOpened);
        }}
      >
        {SortingOption[sortKey]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${listIsOpened ? 'places__options--opened' : ''}`}>
        {Object.entries(SortingOption).map(([optionKey, optionLabel]) => (
          <li
            key={optionKey}
            className={`places__option ${sortKey === optionKey ? 'places__option--active' : ''}`}
            tabIndex="0"
            onClick={(event) => {
              event.preventDefault();
              setListState(!listIsOpened);
              onChangeSelect(optionKey);
            }}
          >
            {optionLabel}
          </li>
        ))}
      </ul>
    </form>
  );
}

SortingOptions.propTypes = {
  onChangeSelect: PropTypes.func.isRequired,
  sortKey: PropTypes.oneOf(Object.keys(SortingOption)).isRequired,
};

export default SortingOptions;
