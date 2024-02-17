import axios from 'axios';
import { error } from 'console';

export const apiUtil = async(url: string, method: string, data?: string) => {
  const options = {
    method: method,
    headers: {
        'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) :undefined,
  }
  try{
    const response = await fetch(url, options);

    if(!response.ok){
        throw new Error('{response.status}')
    }
    const responseData = await response.json();
    return responseData;
  }
  catch (error){
    console.error(error);
    throw error;
  }
};