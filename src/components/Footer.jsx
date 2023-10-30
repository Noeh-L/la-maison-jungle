import { useState } from 'react'
import '../styles/Footer.css'

function Footer() {
	const [inputValue, setInputValue] = useState('')

    function handleInput(e) {
        setInputValue(e.target.value);
    }
    function handleBlur(e) {
        !(e.target.value).includes('@') && alert("Il manque un @ dans l'adresse renseingée.");
    }

	return (
		<footer className='lmj-footer'>
			<div className='lmj-footer-elem'>
				Pour les passionné·e·s de plantes 🌿🌱🌵
			</div>
			<div className='lmj-footer-elem'>Laissez-nous votre mail :</div>
            <input
                placeholder='Entrez votre adresse mail'
                value={inputValue}
                onChange={(e) => handleInput(e)}
                onBlur={(e) => handleBlur(e)}
            />
		</footer>
	)
}

export default Footer