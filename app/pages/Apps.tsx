"use client"

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apolloClient/index';

interface AppProps {
  children: React.ReactNode;
}

const Apps = ({children}:AppProps) => {
  return (
    <>
    <ApolloProvider client={client}>
    {children}
    </ApolloProvider>
    </>
  )
}

export default Apps;