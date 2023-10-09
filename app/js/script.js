import React from 'react';
import ReactDOM from 'react-dom';
import Componente from "./components/component";

const testString = 'This is a test!';

console.log(testString);

const fruits = [
    'mango',
    'papaya',
    'lychee',
    'Sandia'
];

fruits.map((fruit) => {
    console.log(fruit);
});

ReactDOM.render(
    <>
        <Componente />
    </>,
    document.getElementById('root')
);

