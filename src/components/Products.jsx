import { useState } from 'react'  
import { useCart } from '../hooks/useCart.js'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'
import { AddToCartIcon, PurchaseNowIcon } from './Icons.jsx'
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
    <div class='products grid  grid-cols-3 gap-6'>
      {products.slice(0, 10).map(product => {
        const isProductInCart = checkProductInCart(product)      
        const handleBuy = async () => {
          const id = await processPreferenceMP(cart)
          console.log("id"+id)
          if (id) {
            setPreferenceId(id)
          }
        } 
        return (
   
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">{product.title}</h2>
              </div>
              <div class="card-image">
                <img class="card-image" src={product.thumbnail} alt={product.title} />
              </div>
              <div class="card-body">
                <p class="price"><span class="price-discount">{product.price}</span>$20.00</p>
                <div class="btn-container">
                  <button class="btn" onClick={() => {
                    isProductInCart
                      ? handleBuy(product)
                      : addToCart(product)
                  }}>{
                    isProductInCart
                      ? <Wallet  initialization={{preferenceId: preferenceId}} />
                      : <AddToCartIcon />
                  }</button>
                </div>
                <div class="floating-heart">&#10084;</div>
              </div>
            </div>
     
          )
        })}
     </div>)}

