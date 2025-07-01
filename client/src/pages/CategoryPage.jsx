import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const ProductCatalog = lazy(() => import('./ProductCatalog'));

export default function CategoryPage() {
    const { category } = useParams();

    return (
        <Suspense fallback={<div className="text-center py-10">Loading category...</div>}>
            <ProductCatalog initialCategory={category} />
        </Suspense>
    );
}
