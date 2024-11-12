const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.createOfficeSiteLocation = async (req, res, next) => {
  try {
    const { longitude, latitude, siteName, area } = req.body;
    // console.log('here is form > ',req.body)
    const createSiteLocationResult = await prisma.site.create({
      data: {
        siteName,
        latitude: Number(latitude),
        longitude: Number(longitude),
        area: Number(area),
      },
    });

    res.status(201).json({
      message: "Site location created successfully",
      data: createSiteLocationResult,
    });

    console.log("Site location created:", createSiteLocationResult);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "A site with this name already exists",
      });
    }
  }
};
exports.editOfficeSiteLocation = async (req, res, next) => {
  try {
    const { longitude, latitude, siteName, area, id } = req.body;
    // console.log('here is form > ',req.body)
    const updateSiteLocationResult = await prisma.site.update({
      where: {
        id: id,
      },
      data: {
        siteName,
        latitude: Number(latitude),
        longitude: Number(longitude),
        area: Number(area),
      },
    });

    res.status(201).json({
      message: "Site location updated successfully",
      data: updateSiteLocationResult,
    });

    console.log("Site location updated:", updateSiteLocationResult);
  } catch (err) {
    next(err);
  }
};
exports.deleteOfficeSiteLocation = async (req, res, next) => {
  try {
    const { id } = req.body;
    // console.log('here is form > ',req.body)
    const deleteSiteLocationResult = await prisma.site.delete({
      where: {
        id: id,
      }
    });

    res.status(201).json({
      message: "Site location deleted successfully",
      data: deleteSiteLocationResult,
    });

    console.log("Site location deleted:", deleteSiteLocationResult);
  } catch (err) {
    next(err);
  }
};
