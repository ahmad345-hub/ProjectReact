import { Typography } from '@mui/material';
import React from 'react';
import Hero from "../../components/Hero/Hero.jsx";
import Catagories from '../../components/Catagories/Catagories.jsx';
import Products from '../../components/Products/Products.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      < Catagories />
      <Products />
    </>
  );
}
