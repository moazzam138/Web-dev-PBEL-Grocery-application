import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Profile = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-200px)] py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Please login to view your profile</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-16 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-16 h-16"
                  />
                )}
              </div>
            </div>

            {/* User Details */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {user.name || "User"}
              </h1>
              <p className="text-gray-600 text-lg mb-4">{user.email}</p>

              {/* Role Badge */}
              <div className="inline-block">
                <span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">
                  {user.role || "Customer"}
                </span>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Name */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <p className="text-gray-800 text-lg">{user.name || "Not provided"}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <p className="text-gray-800 text-lg">{user.email}</p>
              </div>

              {/* Member Since */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <p className="text-gray-800 text-lg">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Recently joined"}
                </p>
              </div>

              {/* Account Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Status
                </label>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-800 text-lg">Active</span>
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  // TODO: Implement edit profile functionality
                  alert("Edit profile feature coming soon!");
                }}
                className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/my-orders")}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition duration-200"
              >
                View Orders
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Account Information</h3>
              <p className="text-blue-800 text-sm">
                You can manage your email, password, and other account settings here. For security reasons, we recommend updating your password regularly.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Orders Card */}
          <div
            onClick={() => navigate("/my-orders")}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">View and track your orders</p>
          </div>

          {/* Addresses Card */}
          <div
            onClick={() => navigate("/add-address")}
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Addresses</h3>
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Manage delivery addresses</p>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">Account settings & preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
