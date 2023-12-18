// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'product/'

export const productService = {
   query,
   getById,
   save,
   remove,
}
window.cs = productService

async function query(filterBy = { productName: '' }) {
   return httpService.get(STORAGE_KEY, filterBy)
}

function getById(productId) {
   return httpService.get(`product/${productId}`)
}

async function remove(productId) {
   return httpService.delete(`product/${productId}`)
}

async function save(product) {
   var savedproduct
   if (product._id) {
      savedproduct = await httpService.put(`product/${product._id}`, product)
   } else {
      savedproduct = await httpService.post('product', product)
   }
   return savedproduct
}

// function getEmptyproduct() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }
