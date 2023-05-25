"use client";
import React, { useEffect, useRef, useState } from "react";
import client from "@/apolloClient";
import { authItem } from "@/services";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { User_data } from "./context/context";

export const getAuthData = () => {
  const router = useRouter();

  const { setUser }: any = useContext(User_data);

  const { data, error, loading, refetch } = useQuery(authItem, {
    context: {
      headers: {
        Authorization: localStorage.getItem('userToken'),
      },
    },
  });

  useEffect(() => {

    if (data) {
      if (!data?.authenticatedItem) {
        return router.push("/login");
      }
      else {
        setUser(data?.authenticatedItem)
      }
    }
  }, [data]);

  return {
    data: data,
    refetch: refetch,
  };
};
