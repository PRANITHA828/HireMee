import { Company } from "../models/companymodel.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Comapany name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({
        message: "You can't add same company",
        success: false,
      });
    }
    company = await Company.create({
      name,
      description,
      website,
      location,
      logo,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({userId: userId});
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
        companies,
        success:true
    })
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req,res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company info",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company info updated",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    
  }
};
