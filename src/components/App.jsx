import Banner from './Banner';
import Cart from './Cart';
import Footer from './Footer';
import ShoppingList from './ShoppingList';
import '../styles/Layout.css'
import { useEffect, useState } from 'react';
import { plantList } from '../datas/plantList';

function App() {
  // Gestion du state du Panier
  const savedCart = localStorage.getItem('cart');
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
	const [isCartIncreasing, setIsCartIncreasing] = useState(false)

  // Gestion du state des catégories checkées
  const initialIsCatChecked = {'Tout': true};
  const categories = plantList.reduce(
    (acc, plant) => 
        acc.includes(plant.category) ? acc : acc.concat(plant.category),
        []
  )
      // Ici, après avoir extrait toute les catégorie de la database, je les ajoute à mon objet initialIsCatChecked, ce dernier étant en fait mon le contenu de mon state isCatChecked de départ.
  categories.forEach((cat) => {
    initialIsCatChecked[cat] = false
  })

  const [isCatChecked, setIsCatChecked] = useState(initialIsCatChecked)

  // Ce useEffect va permettre de sauvegarder le panier dans le LS uniquement quand mon state cart est modifié
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  return (
    <main>
      <Banner />

      <div className='lmj-layout-inner'>
        <Cart 
          cart={cart} 
          updateCart={updateCart} 
          isCartIncreasing={isCartIncreasing} 
          setIsCartIncreasing={setIsCartIncreasing} />
        <ShoppingList 
          cart={cart} 
          updateCart={updateCart} 
          isCatChecked={isCatChecked} 
          setIsCatChecked={setIsCatChecked}
          isCartIncreasing={isCartIncreasing} 
          setIsCartIncreasing={setIsCartIncreasing} />
      </div>

      <Footer />
    </main>
  );
}

export default App;
