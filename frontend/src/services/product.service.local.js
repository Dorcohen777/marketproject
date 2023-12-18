
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'product'

export const productService = {
    query,
    getById,
    save,
    remove,
}
window.cs = productService


async function query(filterBy = { txt: '', price: 0 }) {
    var products = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        products = products.filter(product => regex.test(product.vendor) || regex.test(product.description))
    }
    if (filterBy.price) {
        products = products.filter(product => product.price <= filterBy.price)
    }
    return products
}

function getById(productId) {
    return storageService.get(STORAGE_KEY, productId)
}

async function remove(productId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, productId)
}

async function save(product) {
    var savedproduct
    if (product._id) {
        savedproduct = await storageService.put(STORAGE_KEY, product)
    } else {
        // Later, owner is set by the backend
        savedproduct = await storageService.post(STORAGE_KEY, product)
    }
    return savedproduct
}



