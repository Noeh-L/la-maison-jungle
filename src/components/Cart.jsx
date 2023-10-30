import '../styles/Cart.css'
import { useState, useEffect } from 'react';

function Cart({cart, updateCart, isCartIncreasing, setIsCartIncreasing}) {
	const [isOpen, setIsOpen] = useState(false)
	const total = cart.reduce((acc, item) => {
					return(
						acc + (item.quantity*item.price)
					)
				}, 0)
	const totalQuantity = cart.reduce((acc, item) => {
					return (
						acc + item.quantity
					)
				}, 0)

	const [isQtyIndicatorVisibleForTheFirstTime, setIsQtyIndicatorVisibleForTheFirstTime] = useState(false)
	const [isQtyIndicatorVisible, setIsQtyIndicatorVisible] = useState(false)


	// Modification dynamique du <title> en fonction du total du panier.
	useEffect(() => {
		document.title = `LMJ : ${total}€ d'achats 💸`
	}, [total])

	//Cette Effect permet d'appliquer l'animation '.appear' au dernier article added.
	useEffect(() => {
		if (!isOpen) return
		if (cart.length === 0) return

		const indexOfLastItem = cart.length - 1
		const articleJustAdded = cart[indexOfLastItem]
		const articleJustAddedDOM = document.getElementById(`${articleJustAdded.name}`)

		const allArticlesInCartExeptLastOne = cart.slice(0, indexOfLastItem)
		const allArticlesInCartExeptLastOneDOM = []

		if (isCartIncreasing && cart.length > 1) {
			// j'ajoute l'animation d'appararition au dernier élement ajouté. J'utilise useEffect car l'animation se joue sur les autres articles quand le cart se re-render.
			articleJustAddedDOM.classList.add('appear')

			// Je me tous les previous article du DOM dans un tableau, et je retire leur classe .appear pour ne plus qu'ils aient à s'animer
			allArticlesInCartExeptLastOne.forEach(plant => {
				const articleInDom = document.getElementById(`${plant.name}`)
				allArticlesInCartExeptLastOneDOM.push(articleInDom)

				allArticlesInCartExeptLastOneDOM.forEach(plantInDOM => {
					plantInDOM.classList.remove('appear')
				})
			});

		} else if (isCartIncreasing && cart.length === 1 && articleJustAdded.quantity === 1) {
			// Ici j'anime l'article seulement s'il est le premier article ajouté.
			articleJustAddedDOM.classList.add('appear')
		}

		
		// Ce commentaire ci-dessous permet de désactiver le message WARNING orange de ESlint qui nous demande d'indiquer toutes les dépendances utilisées dans le tableau de dépendance. Or ici, nous n'avon spas besoin que le useEffect s'active en fonction de 'isCartIncreasing' par exemple.
    	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart, isOpen])

	// Apparition de la notif qui indique le nombre d'articles quand panier est fermé
	useEffect(() => {
		
		if (totalQuantity === 0) {
			setIsQtyIndicatorVisible(false)
		}

		if (totalQuantity > 0) {
			setIsQtyIndicatorVisible(true)
		}

		if (totalQuantity === 1 && isCartIncreasing) {
			setIsQtyIndicatorVisibleForTheFirstTime(true)
		} else {
			setIsQtyIndicatorVisibleForTheFirstTime(false)
		}

    	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalQuantity])

	return isOpen ? (

		<div className='lmj-cart isOpen'>
			<button
				className='lmj-cart-toggle-button closeCart'
				onClick={() => setIsOpen(false)}
			>
				<i className="fa-solid fa-xmark"></i>
			</button>

			<h2>Panier</h2>

			{(cart.length === 0)
			? <div>Votre panier est vide 🍃</div>
			: <div className='articlesAdded'>
				{cart.map((plant, index) => {
					return(
						<div 
							key={`${plant.name}-${index}`} 
							className='articleAdded'
							id={`${plant.name}`}
						>
							<div>
								{plant.quantity} x {plant.name} <br/> 
								<em>Sous-total : <strong>{plant.quantity * plant.price} €</strong></em>
							</div>
							
							<div className='buttons'>
								<button onClick={() => {
									const updatedCart = [...cart]
									const itemIndex = updatedCart.findIndex((item) => item.name === plant.name)

									if (itemIndex !== -1) {
										updatedCart[itemIndex].quantity++
									}

									updateCart(updatedCart);
								}}>
									<i className="fa-solid fa-plus"></i>
								</button>

								<button onClick={() => {
									const updatedCart = [...cart]
									const itemIndex = updatedCart.findIndex((item) => item.name === plant.name)

									setIsCartIncreasing(false)

									if (itemIndex !== -1) {
										updatedCart[itemIndex].quantity--
										
										
										if (updatedCart[itemIndex].quantity === 0) {
											updatedCart.splice(itemIndex, 1)
										}
										
										updateCart(updatedCart);
									}
								}}>
									<i className="fa-solid fa-minus"></i>
								</button>

								<button onClick={() => {
									const updatedCart = [...cart]
									const itemIndex = updatedCart.findIndex((item) => item.name === plant.name)
									
									setIsCartIncreasing(false)
									
									updatedCart.splice(itemIndex, 1)
									updateCart(updatedCart);
								}}>
									<i className="fa-solid fa-trash"></i>
								</button>
							</div>
						</div>
					)
				})
				}
				<h3>
					Total : {total} €
				</h3>
				<button 
					className='clearCart' 
					onClick={() => {
						updateCart([]); 
						localStorage.clear();
						setIsCartIncreasing(false)
					}}
				>
					<i className="fa-solid fa-broom"></i>
					Vider le panier
				</button>
			</div>}

		</div>
		
	) : (

		<div className='lmj-cart isClosed'>
			<button
				className='lmj-cart-toggle-button openCart'
				onClick={() => setIsOpen(true)}
			>
				{isQtyIndicatorVisibleForTheFirstTime && isQtyIndicatorVisible && totalQuantity > 0
				? (<div className="quantityIndicator displayFirstTime">{totalQuantity}</div>) 
				: isQtyIndicatorVisible && totalQuantity > 0 
				? (<div className="quantityIndicator">{totalQuantity}</div>)
				: null
				}

				<i className="fa-solid fa-cart-shopping"></i>
				Mon panier
			</button>
		</div>
	)
}

export default Cart;