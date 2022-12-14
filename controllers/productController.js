const Products = require("../models/Product")

class APIfeatures {
  constructor(query , queryString)
  {
    this.query = query ;
    this.queryString = queryString ;
  } 
  filtering(){
    const queryObj = {...this.queryString}
    //console.log({ before : queryObj});
    const excludedFields = ['page' , 'sort' , 'limit']
    excludedFields.forEach(el => delete(queryObj[el]))
    
   // console.log({after : queryObj}) ;
    let queryStr = JSON.stringify(queryObj)
    
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g , match => '$' + match)
    //console.log({queryStr})
    this.query.find(JSON.parse(queryStr))
    return this ;
    
  }

  sorting(){
    if(this.queryString.sort)
    {
      const sortBy = this.queryString.sort.split(',').join(' ')
      console.log(sortBy)
      this.query = this.query.sort(sortBy)
    }
    else{
      this.query = this.query.sort("-createdAt")
    }
    return this ;
  }

  pagination(){
      const page = this.queryString.page * 1 || 1 ;
      const limit = this.queryString.limit * 1 || 3 ;
      const skip = (page-1)*limit ;
      this.query = this.query.skip(skip).limit(limit)
      return this ;
  }
}

const productController = {
    getProducts: async (req,res) => {
      console.log(req.query);
      /* const features = new APIfeatures(Products.find() , req.query).filtering().sorting().pagination()
      const products = await features.query  */
         Products.find(function(err , products) {
          if(err)
          {
              return res.status(500).json({msg : err.message})
          }
          /* res.json({
            status : "success" ,
            result : products.length ,
            products : products
          }); */
          res.json({products});
        })
          
        
      } ,
      createProduct : async (req,res)=> {
        //only admin has the access tp create , update and delete operations
        const {product_id , title , description , content , images , category , price } = req.body ;
        if(!images)
        {
          return res.status(400).json({msg : "No image upload"})

        }
        const product = await Products.findOne({product_id});
        if(product)
        {
          return res.status(400).json({msg : "Product aldready exits!!"});
        }
        const newProduct = new Products({product_id , title , description , content , images , category , price }) ;
        await newProduct.save();

        res.json({msg : "Created a new Product"})
        res.json("Check admin success");
      } ,
      deleteProduct : async (req,res) => {
        await Product.findByIdAndDelete({_id : req.params.id})
        res.json({msg : "Deleted a Category"})
  
      } ,
      updateProduct : async (req , res) => {
        const {title , description , content , images , category , price} = req.body ;
        if(!images)
        {
          return res.status(400).json({msg : "No image upload"})
        }
        await Products.findByIdAndUpdate({_id : req.params.id} ,{
          title , description , content , images , category , price})
        res.json({msg : "Updated a Product"})   
      }
    }


module.exports = productController ;