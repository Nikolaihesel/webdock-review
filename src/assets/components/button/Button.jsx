import { useState } from 'react';

//css
import './button.css';

//components
import SendPost from '../../../services/SendPosts';
export const Button = () => {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		if (!modal) {
			setModal(true);
			console.log(modal);
		} else {
			setModal(false);
			console.log(modal);
		}
	};
	return (
		<div>
			{modal && (
				<div className='modal-post back-drop'>
					<div className='modal-center'>
						<div className='modal-bg'>
							<button onClick={handleModal}>close</button>
							<SendPost />
						</div>
					</div>
				</div>
			)}
			<button
				className='RequestButton'
				onClick={handleModal}>
				Press me
			</button>
		</div>
	);
};

export default Button;
