import { useState } from 'react'  
import { useCart } from '../hooks/useCart.js'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { AddToCartIcon, PurchaseNowIcon, RemoveFromCartIcon } from './Icons.jsx'
import { processPreferenceMP }  from '../service/proccessPreference.js'
import './Products.css'      

export function Products ({ products }) {
  initMercadoPago(
    'TEST-49855530-d537-4141-90d5-d9c0786ece77', {
    locale: "es-AR"
  });

  const [preferenceId, setPreferenceId] = useState(null)
  const { addToCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      {products.slice(0, 10).map(product => {
        const isProductInCart = checkProductInCart(product)      
        return (
   
            <div key={product.id} className="card">
              <div className="card-header">
                <h2 className="card-title">{product.title}</h2>
              </div>
              <div className="card-image">
                <img className="card-image" src={product.thumbnail} alt={product.title} />
              </div>
              <div className="card-body">
                <p className="price"><span className="price-discount">{product.price}</span>$20.00</p>
                <div className="btn-container">
                  <button className="btn" onClick={() => {
                    isProductInCart
                      ? handleBuy(product)
                      : addToCart(product)
                  }}>{
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }</button>
                </div>
                <div className="floating-heart">&#10084;</div>
              </div>
            </div>
          )
        })}
     </div>)}

