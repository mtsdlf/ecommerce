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
    <main className='products'>
      <ul>
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
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
                 <div>
              
              </div>
              <div>
                <strong>{product.title}</strong> - ${product.price}
                
              </div>
           
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }} onClick={() => {
                    isProductInCart
                      ? handleBuy(product)
                      : addToCart(product)
                  }}
                >
                  {
                    isProductInCart
                      ? <Wallet  initialization={{preferenceId: preferenceId}} />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
