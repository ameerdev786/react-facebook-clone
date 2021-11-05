const express = require("express");
const slug = require("slugify");
const Category = require("../model/category");

    exports.addCategory = (req, res) => {
    
      const categoryObj = {
        name: req.body.name,
        sku: slug(req.body.name)
      };
      if (req.file ) {
        categoryObj.categoryImage= "http://localhost:2000/public/" + req.file.filename
      }

      if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
      }
      const category = new Category(categoryObj);
      category.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) return res.status(201).json({ category });
      });
    };

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
          img:cat.categoryImage
        });
      }
      return categoryList;
    };
    exports.getCategories = (req, res) => {
      Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
          const categoryList = getWithchilds(categories);
          res.status(200).json({ categoryList });
        }
      });
    };
