import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3

async function query(filterBy = { productName: '' }) {
   try {
    //   console.log(filterBy)
      const criteria = {
         productName: { $regex: filterBy.productName, $options: 'i' },
      }
      const collection = await dbService.getCollection('product')
      var productCursor = await collection.find(criteria)

      const products = productCursor.toArray()
      return products
   } catch (err) {
      logger.error('cannot find products', err)
      throw err
   }
}

async function getById(productId) {
   try {
      const collection = await dbService.getCollection('product')
      const product = collection.findOne({ _id: ObjectId(productId) })
      return product
   } catch (err) {
      logger.error(`while finding product ${productId}`, err)
      throw err
   }
}

async function remove(productId) {
   try {
      const collection = await dbService.getCollection('product')
      await collection.deleteOne({ _id: ObjectId(productId) })
      return productId
   } catch (err) {
      logger.error(`cannot remove product ${productId}`, err)
      throw err
   }
}

async function add(product) {
   try {
      const collection = await dbService.getCollection('product')
      await collection.insertOne(product)
      return product
   } catch (err) {
      logger.error('cannot insert product', err)
      throw err
   }
}

async function update(product) {
   try {
      const productToSave = {
         vendor: product.vendor,
         price: product.price,
      }
      const collection = await dbService.getCollection('product')
      await collection.updateOne(
         { _id: ObjectId(product._id) },
         { $set: productToSave }
      )
      return product
   } catch (err) {
      logger.error(`cannot update product ${productId}`, err)
      throw err
   }
}

async function addProductMsg(productId, msg) {
   try {
      msg.id = utilService.makeId()
      const collection = await dbService.getCollection('product')
      await collection.updateOne(
         { _id: ObjectId(productId) },
         { $push: { msgs: msg } }
      )
      return msg
   } catch (err) {
      logger.error(`cannot add product msg ${productId}`, err)
      throw err
   }
}

async function removeProductMsg(productId, msgId) {
   try {
      const collection = await dbService.getCollection('product')
      await collection.updateOne(
         { _id: ObjectId(productId) },
         { $pull: { msgs: { id: msgId } } }
      )
      return msgId
   } catch (err) {
      logger.error(`cannot add product msg ${productId}`, err)
      throw err
   }
}

export const productService = {
   remove,
   query,
   getById,
   add,
   update,
   addProductMsg,
   removeProductMsg,
}
