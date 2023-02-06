import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Card from "@/components/products/card/Card";
import Loader from "@/components/util/Loader";




const categorie = () => {
  
  const router = useRouter();
  const { id } = router.query;
  const [products, setproducts] = useState(null);

  const fetchCategoryData = async () => {
    if (!id) return;
    const data = await fetch(`https://fakestoreapi.com/products/category/${id}`)
      .then((data) => data.json())
      .catch((err) => console.log(err));
    setproducts(data);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  if (!products) return <Loader />;

  return (
    <>
      <div className="all_Product_display">
        {products.map((product) => (
          <Card key={product.id} props={product} />
        ))}
      </div>
    </>
  );
};

export default categorie;
