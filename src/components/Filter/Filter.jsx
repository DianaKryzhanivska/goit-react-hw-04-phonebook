import React from 'react';
import PropTypes from 'prop-types';
import { Div, Label, Input } from './Filter.styled';

export const Filter = ({ value, onUpdateFilter }) => {
  return (
    <Div>
      <Label>
        Find contacts by name
        <Input type="text" value={value} onChange={onUpdateFilter} />
      </Label>
    </Div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onUpdateFilter: PropTypes.func.isRequired,
};
