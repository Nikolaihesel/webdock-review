import React from 'react'
import { useState } from 'react'


function CreatePost() {
    const CreateRequest = ({ isOpen, onClose }) => {
        const [inputValue, setInputValue] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission logic here
          console.log('Submitted:', inputValue);
          // Close the modal
          onClose();
        };
   
        return isOpen ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-btn" onClick={onClose}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <label>
                  Enter something:
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        ) : null;
      };

}

export default CreatePost