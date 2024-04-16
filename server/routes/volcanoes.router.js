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

// POST /things - - - - - -  Create one thing.

router.post('/', (req, res) => {
    let volcano = req.body;
    sqlText = `
        INSERT INTO volcanoes 
            (volcano_name, erupting_now, last_year_erupted, country)
            VALUES ($1, $2, $3, $4);
    `;
    pool.query(sqlText, [volcano.volcano_name, 
                        volcano.erupting_now, 
                        volcano.last_year_erupted, 
                        volcano.country])
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


// PUT /things/:id - - - - - Update one thing.


module.exports = router;
