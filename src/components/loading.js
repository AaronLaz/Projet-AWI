import React from 'react';
import load from '../assets/loading.gif';
import './loading.css';

export const Loading = () => {

  return (
    <div>
        <img className="loader" src={load} alt="loading"/>
    </div>
  );
}