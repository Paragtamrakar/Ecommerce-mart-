// yeh code cart ko manage karega , duplicate item add ni karega and so on. 

export const addToCart = (
  product,
  variant
) => {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const existing =
    cart.find(
      (item) =>
        item._id === product._id
    );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      _id: product._id,
      name: product.name,
      image: product.images[0],
      price: variant.price,
      quantity: 1,
      variant: variant.label,
      category: product.category.slug,
    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );

};