/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable no-empty */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const cloud = require('cloudinary').v2;
const { uuid } = require('uuidv4');
const db = require('../../Models');

const employerss = db.Employer;
const documentupload = db.Employerdocument;
const comoany_type = db.Company_category;

// configure cloudinary
cloud.config({
  cloud_name: process.env.TALENT_POOL_CLOUD_NAME,
  api_key: process.env.TALENT_POOL_CLOUD_API,
  api_secret: process.env.TALENT_POOL_CLOUD_SECRET,
});

// create a class to handle all operations regarding the employer
class Employers {
  // create a static method
  static async create(req, res) {
    // validate the file first
    if (!req.files) {
      return res.status(400).json({
        status: 'error',
        message: 'no file selected',
      });
    }
    // const dir =req.hostname +'/profile/'
    const employer_id = uuid();
    const file = req.files.photo;
    // validate image function below
    validateimage(file, req, res, 1000000);
    // check for individual information
    const {
      employer_name,
      company_category_id,
      employer_type,
      description,
      employer_phone,
      employer_email,
      employer_address,
      employer_country,
      website,
      user_id,
      sex,
      facebook,
      twitter,
      linkedin,
      instagram,
      hear_about_us,
    } = req.body;
    // file.name=`${dir}${organization_name}.png`
    // eslint-disable-next-line no-unused-vars
    const fname = file.name;
    // eslint-disable-next-line no-console
    const employer = {
      employer_name,
      company_category_id,
      employer_type,
      description,
      employer_id,
      employer_phone,
      employer_email,
      employer_address,
      employer_country,
      employer_photo: 'No image yet',
      website,
      sex,
      facebook,
      twitter,
      linkedin,
      instagram,
      hear_about_us,
      user_id,
    };
    try {
      // check if employer already exist
      const info = await employerss.findOne({ where: { user_id } });
      if (info) {
        return res.status(400).send({
          status: 'error',
          message: 'Record already exist',
        });
      }

      const employeroperation = await employerss.create(employer);
      if (!employeroperation) {
        return res.status(400).send({
          status: 'error',
          message: 'Profile already created',
        });
      }
      // success message for empployers profile creation
      // call a file upload function
      // file.mv('./profile/'+fname)
      // upload to cloudinary
      const result = await cloud.uploader.upload(file.tempFilePath);
      const { secure_url } = result;
      // update the image
      await employerss.update(
        { employer_photo: secure_url },
        {
          where: { employer_id },
          returning: true,
          plain: true,
          force: true,
        },
      );
      return res.status(201).send({
        status: 'success',
        message: 'profile successfully created',
      });
    } catch (err) {
      res.status(500).send({
        status: 'error',
        message: 'An error occurred, make sure you fill all forms field',
      });
    }
  }

  // update employers profile
  static async updateemployer(req, res) {
    // validate the file files
    if (!req.files) {
      return res.status(400).json({
        status: 'error',
        message: 'no file selected',
      });
    }
    // validation functionction should be he
    const file = req.files.photo;
    validateimage(file, req, res, 1000000);
    const {
      // eslint-disable-next-line camelcase
      employer_name,
      company_category_id,
      employer_type,
      employer_id,
      description,
      employer_phone,
      employer_email,
      employer_address,
      employer_country,
      website,
      sex,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = req.body;
    const employersInfoUpdate = {
      employer_name,
      company_category_id,
      employer_type,
      description,
      employer_phone,
      employer_email,
      employer_address,
      employer_country,
      employer_photo: 'No image yet',
      website,
      sex,
      facebook,
      twitter,
      linkedin,
      instagram,
    };
    try {
      const result = await employerss.update(employersInfoUpdate, {
        where: { employer_id },
        returning: true,
        plain: true,
      });
      if (result[1] === 1) {
        // do the file upload and update
        const result = await cloud.uploader.upload(file.tempFilePath);
        const { secure_url } = result;
        // update the image
        await employerss.update(
          { employer_photo: secure_url },
          {
            where: { employer_id },
            returning: true,
            plain: true,
            force: true,
          },
        );
        return res.status(200).send({
          status: 'success',
          message: 'Profile updated',
        });
      }
      return res.status(400).send({
        status: 'error',
        message: 'An error occured updating profile info',
      });
    } catch (err) {
      res.status(500).send({
        status: 'error',
        message: 'An error occured updating profile info',
      });
    }
  }

  static async getemployerdetails(req, res) {
    const { id } = req.params;
    try {
      const getemployerdetails = await employerss.findAll({
        where: {
          employer_id: id,
        },
        include: [comoany_type],
      });
      if (getemployerdetails.length <= 0) {
        return res
          .status(400)
          .json({ status: 'error', message: 'Employer details not found' });
      }
      return res.status(201).json({
        status: 'success',
        getemployerdetails,
      });
    } catch (err) {
      res.status(500).send({
        status: 'error',
        message: 'An error occured',
      });
    }
  }

  static async documentupload(req, res) {
    // upload document
    const { employer_id, document_name, document_number } = req.body;
    if (!req.files) {
      return res.status(400).json({
        status: 'error',
        message: 'no file selected',
      });
    }

    const file = req.files.image_document;
    // verify if file is png/jpg
    validateimage(file, req, res, 5000000);
    const validate = await employerss.findOne({
      where: { employer_id },
    });
    if (!validate) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid employer id' });
    }
    // run the process
    const resultview = await cloud.uploader.upload(file.tempFilePath);
    const { secure_url } = resultview;
    // eslint-disable-next-line no-console
    console.log(secure_url);
    const documentobject = {
      document_id: uuid(),
      employer_id,
      document_number,
      document_name,
      file_link: secure_url,
    };
    try {
      const result = await documentupload.create(documentobject);
      if (!result) {
        return res.status(400).send({
          status: 'error',
          message: 'document not uploaded',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Document successfully uploaded',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error has occured,contact administrator',
      });
    }
  }

  static async getemployersdocument(req, res) {
    const { id } = req.params;
    try {
      const getdocumentdetails = await documentupload.findAll({
        where: {
          employer_id: id,
        },
      });
      if (getdocumentdetails.length <= 0) {
        return res
          .status(400)
          .json({ statu: 'error', message: 'No document found' });
      }

      return res.status(201).json({
        status: 'success',
        getdocumentdetails,
      });
    } catch (err) {
      res.status(500).send();
    }
  }
}
// separate function to handle cloudinary file upload
const validateimage = (file, req, res, size) => {
  try {
    if (!file) {
      return res
        .status(400)
        .send({ status: 'error', message: 'No image selected' });
    }
    if (!(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')) {
      return res
        .status(400)
        .send({ status: 'error', message: 'File is not an image' });
    }
    if (file.size > size) {
      return res.status(400).json({
        status: 'error',
        message: `upload file size lower than ${size / 1000}kb`,
      });
    }
  } catch (error) {}
};
module.exports = Employers;
