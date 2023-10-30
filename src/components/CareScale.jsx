// import { useState } from 'react';
import sun from '../assets/sun.svg';
import water from '../assets/water.svg';

function CareScale({ scaleValue, careType }) {
	const range = [1, 2, 3]
	const scaleType = careType === 'water' ?
        (<img src={water} alt="Sun icone" className={careType} />) :
        (<img src={sun} alt="Water icone" className={careType} />);



	return (
		<div>
			{range.map((rangeElem) =>
				scaleValue >= rangeElem ? (
					<span key={rangeElem.toString()}>{scaleType}</span>
				) : null
			)}
		</div>
	)
}

export default CareScale