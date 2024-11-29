import { SignInButton } from '@clerk/nextjs';
import React from 'react';
import NavBar from './components/navbar';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default HomePage;
