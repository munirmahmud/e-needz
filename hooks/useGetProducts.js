import { useState } from 'react'
import {
  getProductsByCategoriesHelper,
  getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers'
import ProductRepository from '~/repositories/ProductRepository'

export default function useGetProducts() {
  const [loading, setLoading] = useState(false)
  const [productItems, setProductItems] = useState(null)
  const [product, setProduct] = useState(null)

  return {
    loading,
    productItems,
    product,
    setProductItems: (payload) => {
      setProductItems(payload)
    },

    setLoading: (payload) => {
      setLoading(payload)
    },

    getProductsByCollection: async (payload) => {
      setLoading(true)
      // const responseData = await getProductsByCollectionHelper(payload);
      if (payload.endPoint) {
        let responseData = await fetch(
          `http://178.128.30.38/${payload.endPoint}`,
          {
            method: 'post',
            body: JSON.stringify({
              per_page: payload.perPage,
              category_id: payload.cat_id,
            }),
          }
        )
        responseData = await responseData.json()
        if (responseData) {
          setProductItems(responseData.data)
          setTimeout(
            function () {
              setLoading(false)
            }.bind(this),
            250
          )
        }
      }
    },

    getProductsByCategory: async (payload) => {
      setLoading(true)
      const responseData = await getProductsByCategoriesHelper(payload)
      if (responseData) {
        setProductItems(responseData.items)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getProducts: async (payload) => {
      setLoading(true)
      let responseData
      if (payload) {
        responseData = await ProductRepository.getProducts(payload)
      } else {
        const queries = {
          _limit: 12,
        }
        responseData = await ProductRepository.getProducts(queries)
      }
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getProductById: async (payload) => {
      setLoading(true)
      const responseData = await ProductRepository.getProductsById(payload)
      if (responseData) {
        setProduct(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },
  }
}
