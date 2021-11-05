const Category=require('../../model/category')
const Products=require('../../model/product')

exports.initialData=async(req,res)=>{
    
    const getWithchilds = (categories, parentId = null) => {
        const categoryList = [];
        let category;
        if (parentId == null) {
          category = categories.filter((category) => category.parentId == undefined);
        } else {
          category = categories.filter((category) => category.parentId == parentId);
        }
        for (let cat of category) {
          categoryList.push({
            _id: cat._id,
            name: cat.name,
            sku: cat.sku,
            category: getWithchilds(categories, cat._id),
            all: categories._id,
          });
        }
        return categoryList;
      };
        const category= await Category.find({}).exec()
        const products=await Products.find({}).select("_id name category price description  productPicture quantity sku").populate("category").exec()
        res.status(200).json({
            category:getWithchilds(category),
            products
        })

}