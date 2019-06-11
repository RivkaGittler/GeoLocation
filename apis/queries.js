Pool = require('pg').Pool;
pool = new Pool({
  user: 'gittler',
  host: 'localhost',
  database: 'geolocationdb',
  password: '0504165885',
  port: 5432,
});


poolQuery=function(query,vars,next){
    console.log(query);
    pool.query(query, vars, function(error, results) {
        if (error) {
            throw error;
        }
        console.log('this is function pool query in queries.js: ',results.rows,'\n\n\n\n\n');
        // return next(!Object.keys(results.rows).length ? true : results.rows[0]);
        return next(results);
    }); 
};

var queryStrings={
    insertRow: 
             `with data(name1, name2, distance) as (values($1, $2,$3)),
            city1 as(insert into cities(name) select name1 from data ON CONFLICT(name) DO UPDATE SET name = EXCLUDED.name returning id as id1, name as name1),
            city2 as(insert into cities(name) select name2 from data ON CONFLICT(name) DO UPDATE SET name = EXCLUDED.name returning id as id2, name as name2)
            insert into distances(source, destination, distance) select id1, id2, distance from data
            JOIN city1 USING(name1)
            JOIN city2 USING(name2);`,
    selectDistances: `select d.id as id, c1.name as source, c2.name as destination, d.distance from cities as c1, distances as d, cities as c2 where c1.name = $1 and c2.name=$2 and d.source=c1.id and d.destination=c2.id`,
    updateHits: `update distances set hits=(hits+1) where id= $1;`,
    selectPopular: `select c1.name as source, c2.name as destination, d.hits as hits from cities as c1, distances as d, cities as c2 where d.source=c1.id and d.destination=c2.id order by d.hits desc LIMIT $1`,
};

module.exports = {
    poolQuery: poolQuery,
    queryStrings: queryStrings,
};