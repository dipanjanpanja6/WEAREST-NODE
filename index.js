const express = require('express')
const app = express()
require('dotenv').config();
const cors = require('cors')
const bodyparser = require('body-parser')

const http = require('http');
const userIP = require('user-ip');
const localIpUrl = require('local-ip-url');
var geoip = require('geoip-lite');
const request = require('request');
const axios = require('axios');

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use(cors({origin:"*"}))
app.options('*', cors())

const {getLocation, getIp} = require('./home/home')

app.get('/location/:city/main', getLocation)
app.get('/location/ip', getIp)

app.listen(7070)
