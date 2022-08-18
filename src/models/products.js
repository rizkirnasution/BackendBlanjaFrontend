const Pool = require('../config/db')

const searchKeywordsProducts = (keywords) => {
    return Pool.query("SELECT * FROM products  WHERE id || ' ' || name ILIKE $1", [`%${keywords}%`]);
};
const selectAllProductsLimit = ({limit,offset,sort,sortby}) => {
    return Pool.query(`SELECT * FROM products  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const selectAll = () => {
    return Pool.query(`SELECT products.name, products.stock, products.price, category.name as category_name, transactions.address as address_transactions FROM products INNER JOIN category ON products.category_id = category.id INNER JOIN transactions ON products.transactions_id = transactions.id;`);
}
const select =(id)=>{
    return Pool.query(`SELECT * from products where id=${id}`);
}
const insert =(id, name, stock, price, category_id, transactions_id)=>{
    return Pool.query(`INSERT INTO products(id, name, stock, price, category_id, transactions_id) VALUES(${id},'${name}', ${stock}, ${price}, ${category_id}, ${transactions_id})`);
}
const update = (id, name, stock, price, category_id, transactions_id) => {
    return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price}, category_id=${category_id}, transactions_id=${transactions_id} WHERE id=${id}`)
}
const deleteProducts = (id) =>{
    return Pool.query(`DELETE FROM products WHERE id=${id};`)
}
const countProducts = () => {
    return Pool.query(`SELECT COUNT(*) FROM products`);
};

module.exports = {
    searchKeywordsProducts,
    selectAllProductsLimit,
    selectAll,
    select,
    insert,
    update,
    deleteProducts,
    countProducts
}