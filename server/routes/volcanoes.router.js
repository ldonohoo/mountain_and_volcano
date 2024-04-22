const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();


// GET /things - - - - - - - Respond with all the things.
router.get('/', (req, res) => {
    sqlText = `
        SELECT * FROM volcanoes
            ORDER BY id
    `
    pool.query(sqlText)
    .then((dbResult) => {
        let volcanoes = dbResult.rows;
        console.log('sucessful GET of volcanoes in /volcanoes route', volcanoes);
        res.send(volcanoes);
    })
    .catch((dbErr) => {
        console.log('Error in GET of /volcanoes: ', dbErr);
        res.sendStatus(500);
    })
});

// GET /things/:id - - - - - Respond with one thing.
router.get('/:id', (req, res) => {
    console.log('in get single volcano server.js')
    let volcanoId = req.params.id;
    sqlText = `
        SELECT * FROM volcanoes
            WHERE id = $1
    `
    pool.query(sqlText, [volcanoId])
    .then((dbResult) => {
        let volcano = dbResult.rows;
        console.log('sucessful GET of volcano in /volcanoes/:id route', volcano);
        res.send(volcano);
    })
    .catch((dbErr) => {
        console.log('Error in GET of /volcanoes/:id ', dbErr);
        res.sendStatus(500);
    })
});

// POST /things - - - - - -  Create one thing.

router.post('/', (req, res) => {
    let volcano = req.body.volcano;
    sqlText = `
        INSERT INTO volcanoes 
            (name, erupting_now, last_year_erupted, country, pic)
            VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(sqlText, [volcano.name, 
                        volcano.erupting_now, 
                        volcano.last_year_erupted, 
                        volcano.country,
                        volcano.pic])
    .then((dbResult) => {
        console.log('Add of new volcano sucessfull!!');
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('Error in /volcanoes POST:', dbErr);
        res.sendStatus(500);
    })
});


// DELETE /things/:id - - -  Delete one thing.
router.delete('/:id', (req, res) => {
    let volcanoId = req.params.id;
    let sqlText = `
        DELETE FROM volcanoes
            WHERE id = $1
    `;
    pool.query(sqlText,[volcanoId])
    .then((dbResult) => {
        console.log('Delete of volcano in worked');
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log('Error on DELETE in /volcanoes', dbError);
        res.sendStatus(500);
    })
}); 


// PUT /things/:id - - - - - Update one thing
router.put('/:id', (req, res) => {
    let volcanoId = req.params.id;
    let volcano = req.body.volcano;
    let sqlText = `
        UPDATE volcanoes
            SET name = $2,
                erupting_now = $3,
                last_year_erupted = $4,
                country = $5,
                pic = $6
            WHERE id = $1;
        `;
    pool.query(sqlText, [volcanoId,
                         volcano.name, 
                         volcano.erupting_now, 
                         volcano.last_year_erupted, 
                         volcano.country,
                         volcano.pic])
    .then(response => {
        console.log('Update of volcano worked in PUT volcanoes/:id');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('Error in update of a volcano in PUT /volcanoes/:id', err);
        res.sendStatus(500);
    })
});


module.exports = router;
