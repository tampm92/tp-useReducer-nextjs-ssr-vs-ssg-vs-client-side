// SSR page
import React, { useEffect } from 'react'
import Link from 'next/link'

import { useProductStore, ProductActions } from '@/store/ProductStore'
import ProductService from '@/shared/services/ProductService'

/**
 * You can use `products` param to render page
 * Or set it to store
 * This component is only example to `How to use SSR`
 */
const ProductsPage = ({ products: productsSSR }) => {
  const { state: { list: products }, dispatch } = useProductStore()

  useEffect(async () => {
    dispatch(ProductActions.setProductList(productsSSR))
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Products (SSR Page)</h1>
      <ul>
        {products && products.map((product) => (
          <li key={product.id} className="flex flex-wrap py-2">
            <img className="w-10 h-10 mr-4" src={product.image} />
            <Link href={`/products/${product.slug}`}>
              <a className="hover:text-green-500">{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductsPage

// This function runs at request time on the server
export async function getServerSideProps() {
  const res = await ProductService.getAll()

  return {
    props: {
      products: res
    }
  }
}