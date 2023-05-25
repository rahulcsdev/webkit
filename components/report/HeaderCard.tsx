"use client";
import client from "@/apolloClient";
import { GET_USERS } from "@/services";
import { Roboto } from "next/font/google";
import React, { useState, useEffect } from "react";
import { MdOutlineAnalytics } from "react-icons/md";
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const HeaderCard = () => {
  const initalValue = {
    userId: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  const [formData, setFormData] = useState(initalValue);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_USERS,
      });
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);
  return (
    <div className=" bg-white rounded-md  drop-shadow-md relative">
      {/* Header card */}
      <div className="bg-secondary px-4 py-2 flex items-center justify-between ">
        <h1 className="text-white text-lg font-medium">User Report</h1>
        <MdOutlineAnalytics color="#fff" size={26} />
      </div>
      {/* Card body */}
      <div className="p-3">
        <form
          action=""
          className="flex items-end justify-start gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-px flex-col ">
            <label
              className={`text-md text-gray-600 ${roboto.className}`}
              htmlFor="userId"
            >
              Select User
            </label>
            <select
              className="min-w-[150px] rounded-md border-[1px] border-gray-400   outline-none"
              name="userId"
              id="userId"
              value={formData.userId}
              onChange={onChange}
            >
              <option className="px-2 py-1" value="" disabled>
                Select one
              </option>
              {loading ? (
                <option>Loading....</option>
              ) : users.length <= 0 ? (
                <option>No users available</option>
              ) : (
                users.map((user: any) => (
                  <option key={user?.id} value={user?.id}>
                    {user?.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex gap-px flex-col ">
            <label
              className={`text-md text-gray-600 ${roboto.className} `}
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              onChange={onChange}
              type="date"
              name="startDate"
              id="startDate"
              className={`border-[1px] border-gray-400 rounded-md outline-none `}
            />
          </div>
          <div className="flex gap-px flex-col ">
            <label
              className={`text-md text-gray-600 ${roboto.className} `}
              htmlFor="endDate"
            >
              End Date
            </label>
            <input
              onChange={onChange}
              type="date"
              name="endDate"
              id="endDate"
              className={`border-[1px] border-gray-400 rounded-md outline-none `}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-secondary text-white"
            >
              Submit
            </button>
            <button
              type="reset"
              className="px-3 py-1 rounded-md bg-primary text-white"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeaderCard;
