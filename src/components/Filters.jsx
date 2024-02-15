import { useId } from 'react'
import { CustomSelect } from './CustomSelect.jsx'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'
import { CustomInputRange } from './CustomInputRange.jsx';

export function Filters () {

  const options = [
    { value: 'all', label: 'Todas' },
    { value: 'laptops', label: 'Portátiles' },
    { value: 'smartphones', label: 'Celulares' },
    { value: 'frangances', label: 'Fragancias' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'home-decoration', label: 'Deco de interior' },
    

  ];

  const { filters, setFilters } = useFilters()
  const categoryFilterId= useId(),
        priceFilterId  = useId()

  const handlePriceChange = (prices) => {
    const { minPrice, maxPrice} = prices
    setFilters(prevState => ({
      ...prevState,
      minPrice: minPrice,
      maxPrice: maxPrice
    }))
  }

  const handleCategoryChange = (value) => {
    setFilters(prevState => ({
      ...prevState,
      category: value
    }))
  }

  return (
    <section className='filters'>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <CustomSelect className='custom-select' id={categoryFilterId} options={options} onChange={handleCategoryChange} />
      </div>
      <div> 
        <label htmlFor={priceFilterId}>Precio a partir de:</label>
        <CustomInputRange onChange={handlePriceChange}/>
      </div>
    </section>
  )
}