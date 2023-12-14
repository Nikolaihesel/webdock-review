import './NeumorphicBox.scss';

const NeumorphicBox = ({ RoutesHeading }) => {
	// const getShadowColor = (color) => {
	// 	// Extract RGB values from the background color
	// 	const colorValues = color.match(/\w\w/g).map((hex) => parseInt(hex, 16));

	// 	// Calculate light and dark shadow colors based on the background color
	// 	const lightShadowColor = colorValues
	// 		.map((val) => Math.min(255, val + 30))
	// 		.join(',');
	// 	const darkShadowColor = colorValues
	// 		.map((val) => Math.max(0, val - 30))
	// 		.join(',');

	// 	return { lightShadowColor, darkShadowColor };
	// };

	// const rootStyles = getComputedStyle(document.documentElement);
	// const cssBackgroundColor = rootStyles.getPropertyValue('--background-color');

	// const shadowColors = getShadowColor(cssBackgroundColor);

	return (
		<div className='neumorphic-box'>
			<h2 className='routes-heading'>{RoutesHeading}</h2>
		</div>
	);
};

export default NeumorphicBox;
