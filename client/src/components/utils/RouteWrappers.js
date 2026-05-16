import React from 'react';
import { useParams } from 'react-router-dom';
import SubCategoryList from '../SubCategoryList';
import ProductList from '../ProductList';
import ProductDetail from '../ProductDetail';

export function SubCategoryListWrapper({ navigate }) {
  const { catId } = useParams();
  return <SubCategoryList activeCat={catId} setSubCat={(sc) => navigate(`/category/${catId}/${sc}`)} setView={navigate} goBack={() => navigate("/categories")} />;
}

export function ProductListWrapper({ navigate, products, loading }) {
  const { catId, subCatId } = useParams();
  return <ProductList category={catId} subCat={subCatId} setSelectedProduct={(p) => navigate(`/product/${p.id}`)} setView={navigate} goBack={() => navigate(`/category/${catId}`)} products={products} loading={loading} />;
}

export function ProductDetailWrapper({ addToCart, navigate, isLoggedIn, products }) {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return <div className="py-20 text-center font-black text-2xl italic mt-10">Product not found 🌸</div>;
  return (
    <ProductDetail product={product} addToCart={addToCart}
      goBack={() => navigate(-1)}
      navigateToCart={() => navigate("/cart")}
      navigateToCheckout={() => isLoggedIn ? navigate("/checkout") : navigate("/login")}
    />
  );
}
