const http = require('http');
const express = require('express');
const parser = require('body-parser');
const util = require('util');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'titan100',
    database: 'realestate'
});

pool.getConnection((err,connection) =>{
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if(connection) connection.release();

    return

});


module.exports = pool;

