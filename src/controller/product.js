const products =[
    {
    id : 1,
    name : "baju",
    stock: 10,
    price:30000
    },
    {
    id : 2,
    name : "kemeja",
    stock: 5,
    price:50000
    },
    
]

const productController ={
    getAllProduct :  (req,res) =>{
        res.send(products);
    },
    getProduct :  (req,res) =>{
        const id = Number(req.params.id);
        const product = products.find(product => product.id === id )
        res.send(product);
    },
    insert : (req,res) =>{
        const {name,stock,price} = req.body;
        const productNew ={
            id : products.length + 1,
            name,
            stock,
            price
        }
        products.push(productNew);
        res.json({
            Message : "product created"
        })
    },
    update : (req,res) =>{
        const id = Number(req.params.id);
        const {name,stock,price} = req.body;
        const index = products.findIndex(product => product.id === id)
        const productUpdate ={
            id : products[index].id,
            name,
            stock,
            price
        }
        products[index] = productUpdate;
        res.json({
            Message : "product updated"
        }
    )},
    delete : (req,res) =>{
        const id = Number(req.params.id);
        const index = products.findIndex(product => product.id === id)
        products.splice(index,1);
        res.json({
            Message : "product deleted"
        });
    }
}

module.exports = productController