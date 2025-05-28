import React from 'react';
import ProductCatalog from './ProductCatalog';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
    const { category } = useParams();
    return <ProductCatalog initialCategory={category} />;
}