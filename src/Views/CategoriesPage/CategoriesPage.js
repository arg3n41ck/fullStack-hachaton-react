import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import HeroSlider from "../../components/HeroSlider";
import Loader from "../../components/Loader";
import ProductsList from "../../components/ProductsList";
import { authContext } from "../../contexts/AuthContext";
import { storeContext } from "../../contexts/StoreContext";
import MainLayout from "../../Layouts/MainLayout";

export default function CategoriesPage() {
  const { id } = useParams();
  const {
    products,
    fetchBrandProducts,
    fetchBrandDetail,
    brandDetail,
    getCategory,
  } = useContext(storeContext);

  useEffect(() => {
    fetchBrandProducts(id);
    fetchBrandDetail(id);
  }, [id]);

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <MainLayout>
      {products.length && brandDetail ? (
        <>
          <HeroSlider
            slider={brandDetail.sliderImages.map((src) => ({
              title: `${brandDetail.title} hero slider`,
              src,
            }))}
          />
          <ProductsList products={products} />
        </>
      ) : (
        // <Loader />
        <p>Comedy</p>
      )}
    </MainLayout>
  );
}
