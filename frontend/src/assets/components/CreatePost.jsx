import React from 'react'
import { useState } from 'react'


//denne skal deles op i komponenter som Modal og Form eller requestForm


    const CreatePost = ({ isOpen, onClose }) => {
        const [inputValue, setInputValue] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission logic here
          console.log('Submitted:', inputValue);
          // Close the modal
          onClose();
        };
            
        return isOpen ? (
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close-btn" onClick={onClose}>
                  &times;
                </span>
              </div>
              <div className="modal-body">
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
          </div>
        ) : null;
      };


export default CreatePost