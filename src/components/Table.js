import React, { Component, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { getIngredients } from '../api/ingredient.api';

const columns = [
    { field: 'code', headerName: 'CODE', width: 70 },
    { field: 'libelle', headerName: 'LIBELLE', width: 150 },
    { field: 'unit', headerName: 'UNITE', width: 70 },
    { field: 'unitprice', headerName: 'PRIX UNITAIRE', width: 140 },
    { field: 'stocks', headerName: 'STOCKS', width: 100 },
    { field: 'stockvalue', headerName: 'STOCKS VAL', width: 120 },
    { field: 'allergene', headerName: 'ALLERGENE', width: 130 },
  ];

export default function Table() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then((result) => {
      setIngredients(result);
    });
  }, []);

  console.log(ingredients)

  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* <DataGrid
        rows={ingredients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div */}
      <table>
        <thead>
          <tr>
            <th>CODE</th>
            <th>LIBELLE</th>
            <th>UNITE</th>
            <th>PRIX UNITAIRE</th>
            <th>STOCKS</th>
            <th>VALEUR DU STOCK</th>
            <th>ALLERGENE</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((i) => (
            <tr key={i.code}>
              <th>{i.code}</th>
              <th>{i.libelle}</th>
              <th>{i.unit}</th>
              <th>{i.unitprice}</th>
              <th>{i.stocks}</th>
              <th>{i.stockvalue}</th>
              <th>{i.allergene}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}