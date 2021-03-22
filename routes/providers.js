const express = require('express');
const router = express.Router();
const pool = require('../database.js');

const GET_PROVIDERS = `SELECT * FROM DELIVERY_PROVIDER`;
const INSERT_PROVIDER = `INSERT INTO DELIVERY_PROVIDER (provider_name) VALUES ($1) RETURNING provider_id`;

router.get('/', async (req, res, next) => {
  const providers = await pool.query(GET_PROVIDERS);
  return res.status(200).send(providers.rows);
});

router.post('/', async (req, res, next) => {
    const providerData = req.body;

    pool.query(INSERT_PROVIDER, 
             [providerData.name])
        .then(result => {
            const provider_id = result.rows[0].provider_id;
            return res.json({provider_id});
        })
        .catch(e => {
            console.error(e);
            return res.status(500).send(e.stack);
        })
})

module.exports = router;
