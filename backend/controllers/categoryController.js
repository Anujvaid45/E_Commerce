const categoryModel = require("../models/categoryModel.js");
const slugify = require('slugify')

const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:'Name is required'})
        }

        const exisitingCategory = await categoryModel.findOne({name})
        if(exisitingCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already exists'
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Category"
        })
    }
};

//update controller
const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Updating Category'
        })
    }

}

//get all categories
const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All Categories List',
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Displaying Categories'
        })
    }
}

//get single category

const singleCategoryController = async(req,res)=>{
    try {
        const {slug} =req.body;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:'Your selected Category',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Displaying single Category'
        })
    }
}

const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'category deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error While Deleting Category'
        })
    }
}

module.exports = {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController}
