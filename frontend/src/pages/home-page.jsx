import React, { useEffect, useState } from 'react'
import { productService } from '../services/product.service'
import { LoadingAnimation } from './loading'

export function HomePage() {
   const [productName, setProductName] = useState('')
   const [productDetails, setProductDetails] = useState(null)
   const [error, setError] = useState(null)
   const [isSearching, setIsSearching] = useState(null)

   useEffect(() => {
      console.log(productDetails)
   }, [productDetails])

   function handleChange(e) {
      const formValue = e.target.value
      setProductName(formValue)
   }

   async function onSearchProduct(name) {
      try {
         setIsSearching(true)
         console.log(name)
         const filterBy = { productName: name }
         const product = await productService.query(filterBy)

         if (product && product.length > 0) {
            setProductDetails(product)
            setError(null)
         } else {
            setProductDetails(null)
            setError('Product not found, check name')
         }
      } catch (err) {
         console.log('err', err)
         setError('Error occurred while fetching product details')
      } finally {
         setIsSearching(false)
      }
   }

   return (
      <section className='homepage-main-container'>
         <h1>The market</h1>
         <h2>search for product name to find his ID</h2>
         <p>
            products that are in the store:{' '}
            <span className='product-list'>cake, pizza, bread, banana</span>
         </p>
         <div className='search-input-container'>
            <label htmlFor=''>search product</label>
            <input type='search' onChange={(e) => handleChange(e)} />
            <button onClick={() => onSearchProduct(productName)}>
               search product
            </button>
         </div>
         <div>
            {error ? (
               <h3>{error}</h3>
            ) : (
               productDetails && (
                  <h3>the product id is: {productDetails[0].productId}</h3>
               )
            )}
         </div>
         {isSearching && <LoadingAnimation/>}
      </section>
   )
}
