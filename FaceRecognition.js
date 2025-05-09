import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma'>
		<div className='absolute mt2'>
		  <img id='imputimage' alt='' src = {imageUrl} width='500px' heigh='auto'/>
		  <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, Left: box.leftCol}}></div>
		</div>  
		</div>
		);
}

export default FaceRecognition;