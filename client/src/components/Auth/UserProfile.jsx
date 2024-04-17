import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./User.css";

function UserProfile() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
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

  if (isLoading) {
    return (
      <div className="text-center text-red-600 mt-8 text- font-bold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-8 text- font-bold">
        Error Loading Data
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="login-topic my-4">Welcome Back {data?.name} </h1>
      <div className="user_profile">
        <div>
          <div>
            <div>
              <h3 className="profile-name">Name : {data?.name}</h3>
              <h3 className="profile-email"> Gmail : {data?.email}</h3>
              <h3 className="profile-address">Address : {data?.address}</h3>
              <h3 className="profile-phone">Phone : {data?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
      <span
        className="bg-red-500 py-2 px-4 rounded text-white font-bold mt-5 cursor-pointer"
        onClick={async () => {
          await localStorage.removeItem("token");

          queryClient.removeQueries({ queryKey: ["getUser"] });

          navigate("/");
        }}
      >
        Logout
      </span>
    </div>
  );
}

export default UserProfile;
