import SHOP_DATA from '../../shop-data.json';
import './shop.component.scss';

const Shop = () => {
     

    return (
        <div>
            {SHOP_DATA.map(({id, name, imageUrl }) => (
                <div key={id} className='shop-components'>
                    <img src= {imageUrl}/>
                    <h1> {name} </h1>
                </div>
            ))}
        </div>
    )

}




export default Shop ; 