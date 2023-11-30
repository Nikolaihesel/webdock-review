import {useState, useEffect} from 'react';

import './testdata.css';

function TestBackend() {

	const [title, setTitle] = useState('')
	const [status, setStatus] = useState('')
	const [text, setText] = useState('')
	const [error, setError] = useState(null)

	const submitForm = async (e) => {
		 e.preventDefault()

    const post = {title, status, text}

    const response = await fetch('http://localhost:4000/api/posts/', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if (!response.ok) {
        setError(json.error)
    } if (response.ok) {
        setError(null)
        setTitle('')
        setStatus('')
        setText('')
        console.log("new post added")

    }
	}


	return (
		<div className='test-data'>
			<div className='form-data-wrapper'>
				<div className='form-wrapper'>
					<form onSubmit={submitForm} className='test-form'>
						<input
							className='test-input '
							type='text' name="title"
							placeholder='Title'
							 onChange={(e) => setTitle(e.target.value)}
                     value={title} 
						/>

						{title}
						<input
							className='test-input '
							type='text' name="featureStatus"
							placeholder='Status' value="under review"
							onChange={(e) => setStatus(e.target.value)}
                   			
						/>
						<textarea
							className='test-input '
							type='text' name="bodyText"
							placeholder='Text'
							onChange={(e) => setText(e.target.value)}
                     value={text}  />

							<button>Submit</button>

							
				
					</form>
				</div>

				<div className='data-wrapper'>
					<h1>Data goes here</h1>
				</div>
			</div>
		</div>
	);
}

export default TestBackend;
