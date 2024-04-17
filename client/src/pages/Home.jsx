import "./home.css";
import Item from "../components/Item.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
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
      <div className="home">
        <div className="home__container">
          <div className="home__row">
            <Item
              id={4}
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98}
              image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            />

            <Item
              id={2}
              title="The Lean Startup: How Constant Innovation Create Radically Successful Businesses Paperback"
              price={29}
              image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.SX325_B01,204,203,200_.jpg"
            />

            <Item
              id={3}
              title="Samsung LC49RG90SSUXEN 49 Curve Led Gaming Monitor"
              price={199}
              image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
            />

            <Item
              id={5}
              title="New Apple iPad Pro (12.9-inch, Wi-fi, 128GB) - Siver (4th Generation)"
              price={598}
              image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
            />

            <Item
              id={1}
              title="Kenwood kMix Stand Miser for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk"
              price={229}
              image="https://st.depositphotos.com/1765561/4857/i/450/depositphotos_48579839-stock-photo-opened-blue-stand-mixer.jpg"
              rating={4}
            />

            <Item
              id={6}
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual QHD 5120 x 1440"
              price={1094}
              image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
