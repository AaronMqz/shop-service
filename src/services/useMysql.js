import mysql from "mysql";
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB } = process.env;

var db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
});

export const getProductsListMysql = async () => {
  console.log("*** MYSQL PRODUCT LIST START ***");
  var results;
  const sql = `select p.id, p.title, p.description, p.price, s.count 
    from db_product_services_mysql.products p 
    inner join db_product_services_mysql.stocks s 
    on p.id = s.product_id`;

  await new Promise(function (resolve, reject) {
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      results = res.map((mysqlObj, index) => {
        return Object.assign({}, mysqlObj);
      });

      resolve(results);
    });
  });

  console.log("MYSQL RESULTS: ", results);
  return results;
};

export const getProductByIdMysql = async (product_id) => {
  console.log("*** MYSQL PRODUCT BY ID START ***");
  var results;
  const sql = `select p.id, p.title, p.description, p.price, s.count 
    from db_product_services_mysql.products p 
    inner join db_product_services_mysql.stocks s 
    on p.id = s.product_id 
    and p.id="${product_id}"`;

  await new Promise(function (resolve, reject) {
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      results = res.map((mysqlObj, index) => {
        return Object.assign({}, mysqlObj);
      });

      resolve(results);
    });
  });

  console.log("MYSQL RESULTS: ", results);
  return results.length > 0 ? results[0] : results;
};

export const createProductMysql = async (newProduct) => {
  console.log("*** MYSQL CREATE PRODUCT START ***");
  var results;
  const sqlProducts = `insert into db_product_services_mysql.products(id, title, description, price) 
  values("${newProduct.id}","${newProduct.title}", "${newProduct.description}", ${newProduct.price})`;

  const sqlStocks = `insert into db_product_services_mysql.stocks(product_id, count) 
  values("${newProduct.id}",${newProduct.count})`;

  const products = new Promise(function (resolve, reject) {
    db.query(sqlProducts, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  const stocks = new Promise(function (resolve, reject) {
    db.query(sqlStocks, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  await Promise.all([products, stocks])
    .then((res) => {
      console.log("SUCCESS: 200", "MYSQL: ", res);
      results = true;
    })
    .catch((err) => {
      console.log("Error Create Product Mysql", err);
      results = false;
    });

  return results;
};
