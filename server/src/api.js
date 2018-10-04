import querystring from 'querystring';
import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as R from 'ramda';

import apiInfo from '../../creds/linkedin-api-keys.json';

import config from './config';
const { CLIENT_ID, CLIENT_SECRET } = JSON.parse(JSON.stringify(apiInfo));

const router = express.Router();

const REQUEST_URI = 'http%3A%2F%2Flocalhost%3A8080%2Fapi%2Flinkedin%2Fcallback';

router.get('/linkedin/callback', async (req,res) => {
  res.redirect(`http://localhost:3000/verifying?${querystring.stringify(req.query)}`);
});

router.post('/login', async (req, res) => {
  try {
    // get state (CSFR)
    const { code } = req.body;

    const formData = `grant_type=authorization_code&code=${code}&redirect_uri=${REQUEST_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`; // eslint-disable-line
    const contentLength = formData.length;
    const data1 = await axios({
      url: 'https://www.linkedin.com/oauth/v2/accessToken',
      method: 'POST',
      headers: {
        'Content-Length': contentLength,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: formData,
    });

    // get access token
    const accessToken = data1.data['access_token'];

    // get the person's linkedin id
    const data2 = await axios({
      url: `https://api.linkedin.com/v1/people/~:(id)?format=json`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // get the linked in id
    const { id } = data2.data;

    const token = jwt.sign({ id, token: accessToken }, config.secret, {
      expiresIn: 14400 // expires in 24 hours
    });

    res.status(200).send({ token });
  } catch (err) {
    res.status(401).send({ error: 'LinkedIn verification failed.' })
  }
});

router.get('/linkedinData', async (req, res) => {
  try {
    const t = req.headers['x-access-token'];
    if (t === 'null' || R.isNil(t)) {
      throw 'no token provided';
    }
    jwt.verify(t, config.secret, async (err, decoded) => {
      const { id, token } = decoded;

      const data = await axios({
        url: `https://api.linkedin.com/v1/people/id=${id}:(first-name,last-name,headline,num-connections,num-connections-capped)?format=json`, // eslint-disable-line
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.status(200).send({ data: data.data });
    });
  } catch (err) {
    res.status(401).send({ error: 'LinkedIn verification failed.' })
  }
});


export default router;
