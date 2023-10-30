import '../styles/Modal.css'

// function Modal({data, closeModalFunction}) {
//     const [animationClass, setAnimationClass] = useState('appear')

//     function modalDisappearing() {
//         setAnimationClass('disappear')

//         setTimeout(() => {
//             closeModalFunction() //remise à 0 du state quand on ferme la modale, pour que l'animation d'apparition s'effectue
//         }, 2000)
//     }

//     return !data ? null : (
//         <div className={`modal__container ${animationClass}`}>

//             <h2 className="title">
//                 {data.name}
//             </h2>

//             <article>
//                 {data.description}
//             </article>

//             <button
//                 className='closeModalBtn'
//                 onClick={() => modalDisappearing()} 
//             >
//                 FERMER
//             </button>
//         </div>)
// }

// export default Modal;

function Modal({modalVisible, setModalVisible, data}) {
// state
const toggleOverlayClassName = modalVisible.LEAVING ? "overlayDisappear" : "overlayAppear"
const toggleModalClassName = modalVisible.LEAVING ? "disappear" : "appear"

const quantityLabel = {
  1: "peu",
  2: 'moyennement',
  3: 'beaucoup'
}


// comportement
const closeModal = () => {
  const modalLeaving = {...modalVisible, LEAVING: true}
  const modalHidden = {...modalLeaving, HIDDEN: true}
  
  setModalVisible(modalLeaving)

  setTimeout(() => {
    setModalVisible(modalHidden)
  }, 300)

  // Un peu d'explication : j'ai créé un état intermediaire 'LEAVING' qui permet en fait de jouer l'animation sans pour autant démonter le composant. Une fois l'animation finie, je démonte le composant en mettant HIDDEN à true.
}


// affichage (render)  
    return (
      <div className={`modal__overlay ${toggleOverlayClassName}`} onClick={closeModal}>
        <div className={`modal__container ${toggleModalClassName}`} onClick={(e) => e.stopPropagation() /**Permet de garder la modale ouverte même si on clique dessus. */}>
          <h2>{data.name}</h2>

          <section className='main'>
            <div className='main_cover'>
              <img src={data.cover} alt={data.cover} />
            </div>

            <div className='main_infos'>
              <div className='description'>
                <h3>Descritpion</h3>
                <p>{data.description}</p>
              </div>

              <div className="caracteristics">
                <h3>Informations complémentaires</h3>
                <div className='caracteristic water'>
                  <i className="fa-solid fa-droplet"></i>
                  <p>Cette plante requiert {quantityLabel[data.water]} d'eau.</p>
                </div>
                <div className='caracteristic light'>
                  <i className="fa-solid fa-sun"></i>
                  <p>Cette plante requiert {quantityLabel[data.light]} de lumière.</p>
                </div>
              </div>
            </div>
          </section>

          

          <button className='closeBtn' onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      
    );
  }
  
  export default Modal;