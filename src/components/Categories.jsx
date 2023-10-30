import { Fragment } from "react";
import '../styles/Categories.css'

function Categories({isCatChecked, setIsCatChecked}) {

    function handleCheckboxChange(event) {
        const category = event.target.name
        const updatedIsCatChecked = { ...isCatChecked }
        
        // Si l'une des catégorie est checkée, alors on déchecke la case 'Tout'
        if (category !== 'Tout') {
            updatedIsCatChecked['Tout'] = false;
            setIsCatChecked(updatedIsCatChecked);
        } else {
            updatedIsCatChecked['classique'] = false;
            updatedIsCatChecked['extérieur'] = false;
            updatedIsCatChecked['plante grasse'] = false;
            setIsCatChecked(updatedIsCatChecked);
        }
        
        setIsCatChecked((prevIsCatChecked) => ({...prevIsCatChecked, [category]: !prevIsCatChecked[category]}))
    }

    return ( 
        <form action="" className="lmj-categories">

            {/* Pour chaque clé dans le state isCatChecked, je crée un input checkbox */}
            {Object.keys(isCatChecked).map((category, index) => 
                        <Fragment key={category}>
                            <label htmlFor={category} className="checkboxContainer">{category}
                                <input 
                                    key={index}
                                    type="checkbox" 
                                    name={category} 
                                    id={category}
                                    checked={isCatChecked[category]}
                                    onChange={(e) => handleCheckboxChange(e)}
                                />
                                <span className="checkmark"></span>
                            </label>

                            
                        </Fragment>
                )}

        </form>
     );
}

export default Categories;