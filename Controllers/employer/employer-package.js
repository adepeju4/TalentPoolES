/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
const { uuid } = require('uuidv4');
const connection = require('../../Models/index');

const { Package } = connection;

const { errorResMsg, successResMsg } = require('../../Utils/response');

/**
 * @description Creates a new package
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {object} An object containing the user data and token
 */

const create = async (req, res) => {
  try {
    const packageId = uuid();
    const { package_name } = req.body;

    const packageBody = { ...req.body, package_id: packageId };

    // check if package name already exist
    const query = await Package.findOne({ where: { package_name } });

    const packageData = await query;

    if (!packageData) {
      const result = await Package.create(packageBody);

      const data = await result;
      return successResMsg(res, 200, data);
    }
    return errorResMsg(res, 400, 'The package Id already exist');
  } catch (error) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

const getAll = async (req, res) => {
  try {
    const packages = await Package.findAll({
      attributes: ['package_name', 'description', 'package_type', 'package_id'],
    });
    const data = await packages;
    return successResMsg(res, 200, data);
  } catch (error) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

const packageGet = async (req, res) => {
  try {
    const { package_id } = req.params;

    const query = await Package.findOne({
      where: {
        package_id,
      },
      attributes: ['package_name', 'description', 'package_type', 'package_id'],
    });

    const data = await query;

    if (!data) {
      return errorResMsg(res, 404, 'Package not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

const packageUpdate = async (req, res) => {
  // validateRequest(req, res);
  try {
    const { package_id } = req.params;

    await Package.update(req.body, { where: { package_id } });

    // Get updated profile for return
    const updatedPackage = await Package.findOne({
      where: { package_id },
      attributes: ['package_name', 'description', 'package_type', 'package_id'],
    });

    const update = await updatedPackage;

    if (!update) {
      return errorResMsg(res, 404, 'Package not found');
    }

    const data = { message: 'Package updated', data: update };
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

const softDeletePackage = (req, res) => {
  const { package_id } = req.params;

  Package.destroy({
    where: { package_id },
  })
    .then((num) => {
      if (num === 1) {
        return successResMsg(res, 200, 'Package soft deleted!');
      }
      return errorResMsg(res, 400, 'Package not deleted');
    })
    .catch((err) => errorResMsg(res, 400, err.message));
};

const restoreDeletedPackage = (req, res) => {
  const { package_id } = req.params;

  Package.restore({
    where: { package_id },
  })
    .then((num) => {
      if (num === 1) {
        return successResMsg(res, 200, 'Package restored successfully!');
      }
      return errorResMsg(res, 400, 'Package not restored');
    })
    .catch((err) => errorResMsg(res, 400, err.message));
};

module.exports = {
  create,
  getAll,
  packageGet,
  packageUpdate,
  softDeletePackage,
  restoreDeletedPackage,
};
