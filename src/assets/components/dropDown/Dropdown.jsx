import React, { useState } from 'react';

//css
import '../../../index.css'

function DropdownMenu({option1, option2, option3}) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="option1">{option1}</option>
        <option value="option2">{option2}</option>
        <option value="option3">{option3}</option>
      </select>
    </div>
  );
}

export default DropdownMenu;