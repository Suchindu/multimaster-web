
import axios from "axios";
import Product from "./Product";
import React,{ useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";


const ProductGrid = () => {

    const [products, setProducts] = useState([]);

useEffect(() => {
axios.get("http://localhost:4000/api/products")
    .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
    })
    .catch((err) => {
        console.log(err);
    });

}, []);

const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const { isSuccess } = useQuery({
    queryKey: ["getUser"],
    cacheTime: 15 * (60 * 1000),
    staleTime: 10 * (60 * 1000),
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (token === null) {
        throw new Error("Error retrieving user details");
      }

      try {
        const response = await axios.post("http://localhost:4000/profile", {
          token: token,
        });
        if (response.data.status === "ok") {
          return response.data.user; // Update user state with received user data
        } else {
          console.error("Error retrieving user details:", response.data.data);

          throw new Error("Error retrieving user details");
        }
      } catch (error) {
        console.error("Error retrieving user details:", error.message);

        throw new Error("Error retrieving user details");
      }
    },
  });
    

    return (
      <div>
      <div className="flex justify-between items-center my-4 mx-2">
        <div
          className={`bg-blue-600 py-2 px-4 rounded text-white font-bold  ${
            getTotalQuantity() > 0 ? "cursor-pointer" : "grayscale"
          }`}
          onClick={() => {
            if (getTotalQuantity() > 0) {
              navigate("/cart");
            }
          }}
        >
          Cart
          <span className="rounded-full px-2 py-1 ml-2 bg-white text-black">
            {getTotalQuantity() || 0}
          </span>
        </div>
        {isSuccess ? (
          <NavLink to={`/profile`}>
            <div className="bg-red-500 py-2 px-4 rounded text-white font-bold cursor-pointer">
              Profile
            </div>
          </NavLink>
        ) : (
          <NavLink to={`/login`}>
            <div className="bg-blue-600 py-2 px-4 rounded text-white font-bold cursor-pointer">
              Login
            </div>
          </NavLink>
        )}

        {/* <div className="ClockIcon" onClick={() => navigate("/cart")}>
          <ClockIcon id="cartIcon" />
          <p>{getTotalQuantity() || 0}</p>
        </div> */}
        
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {products.map((product) => {
            return (
            <Product key={product._id} product={product} />
            )
        })}
        </div>
      
    </div>
    )

}

export default ProductGrid;
