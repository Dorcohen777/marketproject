import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.mjs'
import { log } from '../../middlewares/logger.middleware.mjs'
import {
   getProducts,
   getProductById,
   addProduct,
   updateProduct,
   removeProduct,
   addProductMsg,
   removeProductMsg,
} from './product.controller.mjs'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', log, getProducts)
router.get('/:id', getProductById)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', removeProduct)
// router.delete('/:id', requireAuth, requireAdmin, removeProduct)

router.post('/:id/msg', requireAuth, addProductMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeProductMsg)

export const productRoutes = router
