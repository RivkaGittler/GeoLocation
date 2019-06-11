var express = require('express');
var db = require('./queries');
var Distance = require('./distanceClass');
var dis = new Distance();

    //select
    function select(dis,next){
        // if (err) return console.log(err);
        // console.log(dis);
        if(dis)
        console.log('select');
        console.log(dis);
        db.poolQuery(db.queryStrings.selectDistances, [dis.source, dis.destination], function(res){
            // if (err) return console.log(err);
            console.log('res.rows=========',res.rows);
            return next(res);
        });
    }

    //update
    function update(res,next){
        console.log('update');
        db.poolQuery(db.queryStrings.updateHits, [res.id],function(res){
            // if (err) return console.log(err);
            return next(res);
        });
    }

    //google api conn
    var distanceApi = require('google-distance');
    distanceApi.apiKey = '??????';

    //google api function 
    function googleApi(dis,next) {
        distanceApi.get({
            origin: '\'' + dis.source + '\'',
            destination: '\'' + dis.destination + '\''
        },
        function (err, data) {
            if (err) return console.log(err);
            console.log(data);
            console.log(dis.setDistance(data.distance.replace(' km', '')));
            return next(data);
        });
    }

    //insert
    function insert(dis,next){
        console.log('insert');
        db.poolQuery(db.queryStrings.insertRow, [dis.source, dis.destination, dis.distance],function(res){
            // if (err) return console.log(err);
            return next(res);
        });
    }

//select
//if success{
    //update
    //return distance
//}
//else{
    //google api
    //get distance
    //insert
//}

// module.exports=Distance;

module.exports = function(a,b,next){
    
    try {
        dis.setSource(a);
        console.log(dis.source);
        dis.setDestination(b);
        console.log(dis.destination);
        dis.get(function(res){
            // if (err) return console.log(err);
            console.log('this is list',res);
            return select(res,function(res){
                if(Object.keys(res.rows).length){
                    console.log(dis.setDistance(res.rows[0].distance));
                    return update(res.rows[0], function (res) {
                        console.log(dis.distance);
                        return next(dis.distance);
                    });
                }
                else{
                    return googleApi(dis, function (res) {
                        return insert(dis, function (res) {
                            return next(dis.distance);
                        });
                    });
                }
            });
        });  
    } catch (error) {
        return console.error();
    }
};