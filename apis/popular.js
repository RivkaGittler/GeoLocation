var express = require('express');
var db = require('./queries');

// function select(next){
//     db.poolQuery.selectPopular
// }

//select
function select(limit,next) {
    // if (err) return console.log(err);
    // console.log(dis);
        console.log('select');
    db.poolQuery(db.queryStrings.selectPopular, [limit], function (res) {
        // if (err) return console.log(err);
        console.log('res.rows=========', res.rows);
        return next(res.rows);
    });
}

module.exports = function(limit,next) {
    try {
        select(limit,function(res){
            return next(res);
        });
    } catch (error) {
        return console.error();
    }
}