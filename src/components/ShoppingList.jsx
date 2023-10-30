import {plantList} from "../datas/plantList"
import "../styles/ShoppingList.css"
import PlantItem from "./PlantItem"
import Categories from "./Categories"
import Modal from "./Modal"
import { Fragment, useState } from "react"

function ShoppingList({cart, updateCart, isCatChecked, setIsCatChecked, isCartIncreasing, setIsCartIncreasing}) {
// state 
    // allFalse renvoie True si toutes les valeurs de isCatChecked sont fausse
    const allFalse = Object.values(isCatChecked).every((cat) => cat === false)

    const [modalData, setModalData] = useState(null)
    const [modalVisible, setModalVisible] = useState(
            {
                VISIBLE: false, 
                HIDDEN: true, 
                ENTERING: false, 
                LEAVING: false
            }
        )


// comportement
    function openModal(data) {
        setModalVisible(
            {
                VISIBLE: true, 
                HIDDEN: false, 
                ENTERING: true, 
                LEAVING: false
            }
        )
        
        setModalData(data)
    }


// affichage (render)
    return (
        <div className="lmj-main">
            <Categories isCatChecked={isCatChecked} setIsCatChecked={setIsCatChecked}/>
            
            <ul className="lmj-plant-list">
                {/* Si aucune catégorie n'est séléctionnée, cela renvoi ce message */}
                {allFalse && <div>Veuillez séléctionner une catégorie de plante 🌵</div>}

                {/* En gros, tant qu'une catégorie est cochée, il render <PlantItem> de la catégorie checké */}
                {plantList.map((plant, index) =>
                        (isCatChecked['Tout'] === true) || (isCatChecked[plant.category])
                        ? <Fragment key={plant.id} >
                            <div 
                                key={plant.id} 
                                className="plantContainer"
                                onClick={(e) => openModal(plant)}
                                >
                                <PlantItem
                                    key={plant.id}
                                    id={plant.id}
                                    name={plant.name}
                                    cover={plant.cover}
                                    light={plant.light}
                                    water={plant.water}
                                    price={plant.price}
                                />

                                <button 
                                    className="add-button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        const existingItem = cart.find((item) => item.name === plant.name);

                                        setIsCartIncreasing(true);

                                        if (existingItem) {
                                            const updatedCart = cart.map((item) =>
                                                    item.name === plant.name
                                                        ? { ...item, quantity: item.quantity + 1 }
                                                        : item
                                                    ) 
                                            updateCart(updatedCart);
                                        } else {
                                            const updatedCart = [
                                                ...cart,
                                                {
                                                name: plant.name,
                                                quantity: 1,
                                                price: plant.price,
                                                },
                                            ] 
                                            updateCart(updatedCart);
                                        }
                                    }}
                                >
                                    <i className="fa-solid fa-circle-plus"></i>
                                    Ajouter
                                </button>
                                
                            </div>
                        </Fragment>
                        : null                  
                    )}
            </ul>

            {
                modalVisible.HIDDEN ? 
                null :
                <Modal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible} 
                    data={modalData}
                />
            }
        </div>
    )
}

export default ShoppingList