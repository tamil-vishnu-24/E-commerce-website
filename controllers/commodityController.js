const Category = require("../models/commodityItems.js");


const categoryController = {
    getCategory : async (req,res) => {
          Category.find(function(err , items) {
            if(err)
            {
                return res.status(500).json({msg : err.message})
            }
            res.json({items});
            
          })
        } ,
    createCategory : async (req,res)=> {
      //only admin has the access tp create , update and delete operations
      const {commodityname} = req.body ;
      const category = await Category.findOne({commodityname});
      if(category)
      {
        return res.status(400).json({msg : "Category aldready exits!!"});
      }
      const newCategory = new Category({commodityname})
      await newCategory.save();
      res.json({msg : "Created a new category"})
      res.json("Check admin success");
    } ,
    deleteCategory : async (req,res) => {
      await Category.findByIdAndDelete(req.params.id)
      res.json({msg : "Deleted a Category"})

    } ,
    updateCatrgory : async (req , res) => {
      
      await category.findByIdAndUpdate({_id : req.params.id} , {commodityname})
      res.json({msg : "Updated a category"})
    }  
}

module.exports = categoryController ;