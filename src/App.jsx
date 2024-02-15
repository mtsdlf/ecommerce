import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.js'
import { Aside } from './components/Aside.jsx'
import { CartProvider } from './context/cart.jsx'
import { Filters } from './components/Filters.jsx'

function App () {
  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider>
      <Header />
      <div className="flex flex-row">
      <Aside>
        <Filters />
      </Aside>
      <Products products={filteredProducts} />
      </div>
   
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )
}

export default App
