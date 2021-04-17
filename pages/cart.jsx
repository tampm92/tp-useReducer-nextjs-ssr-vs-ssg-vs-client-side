// Client-side Pgage
import React, { useEffect } from 'react'
import Link from 'next/link'

import { useGlobalContext } from '@/shared/contexts/GlobalContext'
import { GlobalActions } from '@/store/GlobalStore'
import { useProductStore, ProductActions } from '@/store/ProductStore'
import ProductService from '@/shared/services/ProductService'

const CartPage = ({}) => {
  const { dispatch: globalDispatch } = useGlobalContext()
  const { state: { cart: products }, dispatch } = useProductStore()

  useEffect(async () => {
    globalDispatch(GlobalActions.setLoading(true))

    const res = await ProductService.getCart()
    dispatch(ProductActions.setProductCart(res))
    
    globalDispatch(GlobalActions.setLoading(false))
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Product Cart (Client-side Page)</h1>

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

export default CartPage
