import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// Configure axios base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Handle 401 errors globally
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request:", error.config?.url);
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
  const [searchQuery, setSearchQuery] = useState("");
  const [userOrders, setUserOrders] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // Update cart
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  // Cart count
  const cartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  // Cart total
  const totalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = products.find((p) => p._id === id);
      if (item) total += cartItems[id] * item.offerPrice;
    }
    return Math.floor(total * 100) / 100;
  };

  // Register user
  const registerUser = async (name, email, password) => {
    try {
      console.log("Registering user with:", { name, email });
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        const errMsg = data.message || "Registration failed";
        toast.error(errMsg);
        console.error("Registration error response:", data);
        return { success: false };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMsg);
      console.error("Register Error - Status:", error.response?.status, "Message:", errorMsg, "Full:", error);
      return { success: false };
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      console.log("Logging in user with email:", email);
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Logged in successfully!");
        return { success: true };
      } else {
        const errMsg = data.message || "Login failed";
        toast.error(errMsg);
        console.error("Login error response:", data);
        return { success: false };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Login failed";
      toast.error(errorMsg);
      console.error("Login Error - Status:", error.response?.status, "Message:", errorMsg, "Full:", error);
      return { success: false };
    }
  };

  // Check authentication
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      // User not authenticated
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
    } catch (error) {
      console.error("Logout API call failed:", error.message);
      // Continue with logout even if API call fails (clear local state)
    } finally {
      // Always clear local state regardless of API success
      localStorage.removeItem("user");
      sessionStorage.clear();
      setUser(null);
      setIsSeller(null);
      setCartItems({});
      setUserOrders([]);
      navigate("/", { replace: true });
      toast.success("Logged out successfully");
    }
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) setUserOrders(data.orders || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Place order
  const placeOrder = async (orderData) => {
    try {
      console.log("Placing order with data:", orderData);
      const { data } = await axios.post("/api/order/place", orderData);
      if (data.success) {
        toast.success("Order placed successfully 🎉");
        await fetchUserOrders();
        return { success: true };
      } else {
        const errMsg = data.message || "Order placement failed";
        toast.error(errMsg);
        console.error("Order placement error:", data);
        return { success: false };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Order failed";
      toast.error(errorMsg);
      console.error("Order Error - Status:", error.response?.status, "Message:", errorMsg, "Full:", error);
      return { success: false };
    }
  };

  // Check user authentication on app load
  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      try {
        await axios.post("/api/cart/update", { cartItems });
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error.message);
        }
      }
    };
    if (user) updateCart();
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
    addToCart,
    updateCartItem,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    cartCount,
    totalCartAmount,
    setCartItems,
    registerUser,
    loginUser,
    logout,
    checkAuth,
    userOrders,
    fetchUserOrders,
    placeOrder,
    axios,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;