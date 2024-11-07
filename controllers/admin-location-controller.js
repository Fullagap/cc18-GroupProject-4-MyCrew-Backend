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
  