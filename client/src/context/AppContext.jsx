import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// Configure axios with baseURL
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// Add response interceptor to handle 401 errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors silently - don't show toast
    if (error.response?.status === 401) {
      // Only log, don't show to user
      console.warn("Unauthorized request:", error.config?.url);
      // You can add logic here to redirect to login if needed
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [userOrders, setUserOrders] = useState([]);

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems || {});
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success(`cart updated`);
  };

  // total cart items
  const cartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success(`remove from cart`);
      setCartItems(cartData);
    }
  };

  // Logout function - clears user session and redirects to home
  const logout = async () => {
    try {
      // Only call logout endpoint if user exists (has valid token)
      if (user) {
        await axios.get("/api/user/logout");
      }
    } catch (error) {
      // Silently handle errors - we're logging out anyway
      console.error("Logout error:", error.message);
    } finally {
      // Clear all authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      
      // Clear app context state
      setUser(null);
      setIsSeller(null);
      setCartItems({});
      setUserOrders([]);
      setShowUserLogin(false);
      
      // Redirect to homepage
      navigate("/", { replace: true });
      
      // Show success message
      toast.success("Logged out successfully");
    }
  };

  // Fetch user orders from backend
  const fetchUserOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setUserOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Fetch orders error:", error.message);
      // Silently fail - will show dummy data as fallback
    }
  };

  // Place a new order
  const placeOrder = async (orderData) => {
    try {
      const { data } = await axios.post("/api/order/place", orderData);
      if (data.success) {
        toast.success("Order placed successfully! 🎉");
        // Refresh orders after placing new order
        await fetchUserOrders();
        return { success: true, orderId: data.orderId };
      } else {
        toast.error(data.message || "Failed to place order");
        return { success: false };
      }
    } catch (error) {
      console.error("Place order error:", error.message);
      toast.error("Error placing order. Please try again.");
      return { success: false };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // update database cart items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });

        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        // Only show error toast for non-401 errors
        if (error.response?.status !== 401) {
          console.error("Cart update error:", error.message);
        }
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    axios,
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    fetchProducts,
    setCartItems,
    logout,
    userOrders,
    setUserOrders,
    fetchUserOrders,
    placeOrder,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;