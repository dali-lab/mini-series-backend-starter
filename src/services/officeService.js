/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const apiUrl = 'https://officeapi.dev/api';

export const getRandomOfficeQuote = async () => {
  const { data } = await axios.get(`${apiUrl}/quotes/random`);
  return data.data.content;
};
