import { getBooks } from '@src/actions';
import HomePage from '@src/components/pages/home-page';
import React from 'react';

const Home = async () => {
  const books = await getBooks({ page: 1, limit: 10 });
  return (
    <>
      <HomePage books={books} />
    </>
  );
};

export default Home;