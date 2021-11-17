import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'CODE', width: 70 },
    { field: 'libelle', headerName: 'LIBELLE', width: 150 },
    { field: 'unite', headerName: 'UNITE', width: 70 },
    { field: 'prixUnitaire', headerName: 'PRIXUNITAIRE', width: 140 },
    { field: 'stocks', headerName: 'STOCKS', width: 100 },
    { field: 'stocksVal', headerName: 'STOCKS VAL', width: 120 },
    { field: 'allergène', headerName: 'ALLERGENE', width: 130 },
  ];

  const rows = [
    { id: "100", libelle: "Epaule d\'agneau sans os", unite: "Kg", prixUnitaire:"8,49 €",stocks: "", stocksVal:"",allergène:true },
    { id: "101", libelle: 'Filet de poulet', unite: "Kg", prixUnitaire:"4,12 €",stocks: "", stocksVal:"",allergène:false },
  ];

export default function Table() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    );
  }