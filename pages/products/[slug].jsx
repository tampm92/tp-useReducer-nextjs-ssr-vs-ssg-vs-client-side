// SSG Pgage
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useProductStore, ProductActions } from '@/store/ProductStore'
import ProductService from '@/shared/services/ProductService'

/**
 * You can use `product` param to render page
 * Or set it to store
 * This component is only example to `How to use SSG`
 */
const ProductDetailPage = ({ product: productSSG }) => {
  const router = useRouter()
  const { state: { detail: product }, dispatch } = useProductStore()

  useEffect(async () => {
    dispatch(ProductActions.setProductDetail(productSSG))
  }, [])

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <h1 className="py-4 text-4xl font-bold">Product Detail (SSG Pgage)</h1>

      <img className="w-20 h-20 mr-4" src={product.image} />
      <h1 className="py-1 text-2xl">{product.name}</h1>
      <span>{product.description}</span>
      <span>Price: {product.price}</span>
    </div>
  )
}

export default ProductDetailPage

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

// This function runs at build time on the build server
export async function getStaticProps({ params }) {
  const res = await ProductService.getBySlug({ slug: params.slug })

  return {
    props: {
      product: res
    },
    revalidate: 60
  }
}
