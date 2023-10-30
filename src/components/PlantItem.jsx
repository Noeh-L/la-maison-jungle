import "../styles/PlantItem.css";
import CareScale from "./CareScale";

function PlantItem({ name, cover, light, water, price}) {

    return (
        <li className="lmj-plant-item">

			<img className='lmj-plant-item-cover' src={cover} alt={`${name} cover`} />
            {name}

            <div className='lmj-plant-item-carescale'>
                <CareScale scaleValue={water} careType="water" />
                <CareScale scaleValue={light} careType="light" />
            </div>

            <div className="lmj-plant-item-price">{price} €</div>
        </li>
    );
}

export default PlantItem;