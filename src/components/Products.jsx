import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'
import {useState} from 'react'
          
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'

import axios from 'axios'




export function Products ({ products }) {
  initMercadoPago('TEST-49855530-d537-4141-90d5-d9c0786ece77', {
    locale: "es-AR"
  });
  const [preferenceId, setPreferenceId] = useState(null)
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const handleBuy = async () => {
    const id = await createPreferenceMP()
    if (id) {
      setPreferenceId(id)
    }
  } 

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)
          const createPreferenceMP = async () => {
            try {
              const response = await axios.post("dsads", {
                title: product.title,
                quantity: 1,
                price: product.price

              })
              const { id } = response.data
              return id;
            }
            catch (error) {
              console.log(error)
            }
      
          }
          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
              />
              <div>
                <strong>{product.title}</strong> - ${product.price}
                
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }} onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }}
                >
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
                <button onClick={handleBuy}>Comprar ya</button>
                {preferenceId && <Wallet initialization={{preferenceId: preferenceId}} />}
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
