const controller = {};
console.log("customer controller");
controller.list = (req, res) => 
{   
    req.getConnection((err, conn) => {
       console.log("error");
       conn.query('SELECT * FROM customer', (err, customers) =>{
           if(err){
            console.log("error");
               res.json(err);
           }
           res.render('customers', {
               data: customers
            });
           console.log(customers);
       })
    });
};

controller.save = (req, res) => 
{   
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO customer set ?', [data], (err, customer) =>{
            if(err){
                console.log("error");
                res.json(err);
            }            
            res.redirect('/');
        })
    });  
};

controller.buscar = (req, res) => 
{   
    const id = req.params.id;
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) =>{
            if(err){
                console.log("error");
                res.json(err);
            }
            res.render('customers_edit', {
                data: customer[0]
            });            
            
        })
    });  
};


controller.update = (req, res) => 
{   
    const id = req.params.id;
    const newCustomer = req.body;
    req.getConnection((err, conn) =>{
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) =>{
            if(err){
                console.log("error");
                res.json(err);
            }
            res.redirect('/');                 
        })
    });  
};


controller.delete = (req, res) => 
{   
    const id = req.params.id;
    req.getConnection((err, conn) =>{
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, customer) =>{
            if(err){
                console.log("error");
                res.json(err);
            }            
            res.redirect('/');
            
        })
    });
};

module.exports = controller;