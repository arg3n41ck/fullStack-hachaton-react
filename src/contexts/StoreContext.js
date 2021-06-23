import axios from "axios";
import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

const INIT_STATE = {
  products: [],
  brands: [],
  brandDetail: null,
  productDetail: null,
  total: 0,
  cart: {},
  favorites: {},
  login: [],
  registration: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload.data,
        total: action.payload.total,
      };
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "REMOVE_PRODpUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "CLEAR_PRODUCT":
      return {
        ...state,
        productDetail: null,
      };
    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "SET_BRAND_DETAIL":
      return {
        ...state,
        brandDetail: action.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "SET_LOGIN":
      return {
        login: action.payload,
      };
    case "SET_REGISTRATION":
      return {
        registration: action.payload,
      };
    default:
      return state;
  }
};

export const storeContext = React.createContext();
const { REACT_APP_API_URL: URL } = process.env;

export default function StoreContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchProducts = async (page = 0) => {
    try {
      const response = await axios.get(
        `${URL}/products/?_start=${page * 4}&_end=${4 * (page + 1)}`
      );
      const products = response.data;
      const total = response.headers["x-total-count"];
      console.log(URL);

      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          data: products,
          total,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSearchProducts = async (value) => {
    const response = await axios.get(`${URL}/products/search/?q=${value}`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const fetchProductDetail = async (id) => {
    const response = await axios.get(`${URL}/products/${id}/`);
    const productDetail = response.data;
    dispatch({
      type: "SET_PRODUCT_DETAIL",
      payload: productDetail,
    });
  };

  const createProduct = async (product) => {
    const response = await axios.post(`${URL}/products/create/`, product);
    const createdProduct = response.data;

    dispatch({
      type: "ADD_PRODUCT",
      payload: createdProduct,
    });

    return createdProduct.id;
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${URL}/products/delete/${id}/`);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id,
    });
  };

  const updateProduct = async (id, data) => {
    await axios.patch(`${URL}/products/update/${id}/`, data);
    dispatch({
      type: "CLEAR_PRODUCT",
    });
  };

  const fetchBrands = async () => {
    const response = await axios.get(`${URL}/brands`);
    const brands = response.data;

    dispatch({
      type: "SET_BRANDS",
      payload: brands,
    });
  };

  const fetchBrandProducts = async (brandId) => {
    const response = await axios.get(`${URL}/products/?brand=${brandId}`);
    const products = response.data;
    const total = response.headers["x-total-count"];

    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        data: products,
        total,
      },
    });
  };

  const fetchBrandDetail = async (brandId) => {
    const response = await axios.get(`${URL}/brands/${brandId}`);
    const brand = response.data;

    dispatch({
      type: "SET_BRAND_DETAIL",
      payload: brand,
    });
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const addProductToCart = (product) => {
    console.log(product);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0,
    };

    let filteredCart = cart.products.filter(
      (elem) => elem.item.id === product.id
    );
    if (filteredCart.length > 0) {
      cart.products = cart.products.filter(
        (elem) => elem.item.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }

    newProduct.subPrice = calcSubPrice(newProduct);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((elem) => {
      if (elem.item.id === id) {
        elem.count = count;
        elem.subPrice = calcSubPrice(elem);
      }
      return elem;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };

  const getFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    }
    dispatch({
      type: "GET_FAVORITES",
      payload: favorites,
    });
  };

  const addProductToFavorites = (product) => {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {
        products: [],
      };
    }

    let newProducts = {
      items: product,
    };

    let filteredFavorites = favorites.products.filter(
      (element) => element.items.id === product.id
    );
    if (filteredFavorites.length > 0) {
      favorites.products = favorites.products.filter(
        (element) => element.items.id !== product.id
      );
    } else {
      favorites.products.push(newProducts);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const setLogin = async () => {
    const response = await axios.post(`${URL}/accounts/login/`);
    const loginUser = response.data;

    dispatch({
      type: "SET_LOGIN",
      payload: loginUser,
    });
  };

  const setRegistration = async () => {
    const response = await axios.post(`${URL}/accounts/register/`);
    const regUser = response.data;

    dispatch({
      type: "SET_REGISTRATION",
      payload: regUser,
    });
  };

  return (
    <storeContext.Provider
      value={{
        products: state.products,
        total: state.total,
        productDetail: state.productDetail,
        brands: state.brands,
        brandDetail: state.brandDetail,
        cart: state.cart,
        favorites: state.favorites,
        login: state.login,
        registration: state.registration,
        fetchProducts,
        fetchProductDetail,
        createProduct,
        deleteProduct,
        updateProduct,
        fetchSearchProducts,
        fetchBrands,
        fetchBrandProducts,
        fetchBrandDetail,
        getCart,
        addProductToCart,
        changeProductCount,
        getFavorites,
        addProductToFavorites,
        setLogin,
        setRegistration,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
}