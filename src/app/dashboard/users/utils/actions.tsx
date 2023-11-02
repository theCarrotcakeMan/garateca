import axios from 'axios';
import { useState, setState } from "react";
import { capitalizeFirst } from 'src/lib/utils';

import {
    CustomColumn,
    CategoricalColumn,
    StringColumn,
    NumericalColumn,
    NUMERICAL_FORMATS
} from 'baseui/data-table';

type RowDataType = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    branch: string;
    UBProgress: number;
    UAProgress: number;
    UEProgress: number;
    courses: any;
};

const getUsers = async (setData, setColumns) => {

    try {
      await axios.get('/api/users')
      .then( response => {

        const responseData = response?.data;
        const alteredData = responseData.map(n => (Object.assign( { 'UAProgress': Math.floor(Math.random()*100),'UBProgress': Math.floor(Math.random()*100),'UEProgress': Math.floor(Math.random()*100) }, n )) );
        console.log("alteredData", alteredData);
        setColumns([

          StringColumn({
            title: 'Usuario',
            mapDataToValue: (data: RowDataType) => data.username,
          }),
          StringColumn({
            title: 'Nombre(s)',
            mapDataToValue: (data: RowDataType) => data.firstName,
          }),
          StringColumn({
            title: 'Apellidos',
            mapDataToValue: (data: RowDataType) => data.lastName,
          }),
          CategoricalColumn({
            title: 'Puesto',
            mapDataToValue: (data: RowDataType) => capitalizeFirst(data.role),
          }),
          CategoricalColumn({
            title: 'Sucursal',
            mapDataToValue: (data: RowDataType) => data.branchName,
          }),
          NumericalColumn({
            title: 'U Básica',
            highlight: (n: number) => (n >= 60),
            format: NUMERICAL_FORMATS.PERCENTAGE,
            mapDataToValue: (data: RowDataType) => data.UBProgress,
          }),
          NumericalColumn({
            title: 'U Avanzada',
            highlight: (n: number) => (n >= 60),
            format: NUMERICAL_FORMATS.PERCENTAGE,
            mapDataToValue: (data: RowDataType) => data.UAProgress,
          }),
          NumericalColumn({
            title: 'U Especial.',
            highlight: (n: number) => (n >= 60),
            format: NUMERICAL_FORMATS.PERCENTAGE,
            mapDataToValue: (data: RowDataType) => data.UEProgress,
          }),
        ]);

        setData( alteredData.map(r => ({id: r._id, data: r})) );

      } );
    } catch (error) {
      console.log(error);

    }

}

export { getUsers };
