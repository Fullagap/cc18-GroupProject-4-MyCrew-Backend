// controllers/clockInOut.js
const createError = require("../utils/createError");
const prisma = require("../config/prisma");

module.exports.getAttendanceData = async (req, res, next) => {
  try {
    const { id } = req.user;
    const attendanceData = await prisma.attendance.findMany({
      where: {
        user: {
          supId: id,
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            profileImg: true,
          },
        },
        site: {
          select: {
            siteName: true,
          },
        },
      },
    });
    res.json(attendanceData);
  } catch (err) {
    next(err);
  }
};

module.exports.clockIn = async (req, res, next) => {
  try {
    const { latitude, longitude, location } = req.body;
    const { id } = req.user;

    // get location to compare

    const locationData = await prisma.site.findFirst({
      where: {
        id: location,
      },
    });

    const officeLocation = {
      latitude: locationData.latitude, // Example: Wannasorn building
      longitude: locationData.longitude,
      radius: locationData.area, // meters
    };

    // Calculate distance (simplified for testing)
    const distance = calculateDistance(
      latitude,
      longitude,
      officeLocation.latitude,
      officeLocation.longitude
    );

    const currentDate = new Date();

    // Check if user standing in area or not
    if (distance > officeLocation.radius) {
      return res.status(400).json({
        ok: false,
        message: "You are not within office premises",
        distance: Math.round(distance),
        maxAllowedDistance: officeLocation.radius,
      });
    }

    // Create attendance record

    // check if user already clock-in or not
    const isClockIn = await prisma.attendance.findFirst({
      where: {
        userId: id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
        day: currentDate.getDay(),
      },
    });

    if (isClockIn) {
      return res.json({
        ok: false,
        message: "You have already clocked in today",
      });
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId: id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
        day: currentDate.getDay(),
        dateTime: currentDate,
        checkInTime: currentDate,
        isWorkingDay: !(currentDate.getDay() === 6)
          ? !(currentDate.getDay() === 0)
            ? true
            : false
          : false,
        siteId: location, // we will record where user logged-in are we?
      },
    });
    res.json({
      ok: true,
      message: "Clock in successful",
      data: attendance,
      location: {
        submitted: { latitude, longitude },
        office: officeLocation,
        distance: Math.round(distance),
      },
    });
  } catch (error) {
    console.error("Clock in error:", error);
    next(createError("Failed to clock in", 500));
  }
};

// Helper function to calculate distance using Haversine formula
//get this fomula from chatGPT

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

module.exports.clockOut = async (req, res, next) => {
  try {
    const { latitude, longitude, location } = req.body;
    const { id } = req.user;
    const currentDate = new Date();
    // Find today's attendance record
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId: id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate(),
        // date: {
        //   gte: new Date(currentDate.setHours(0, 0, 0, 0)),
        //   lt: new Date(currentDate.setHours(23, 59, 59, 999)),
        // },
      },
    });

    if (!existingAttendance) {
      return res.status(400).json({
        ok: false,
        message: "No clock-in record found for today",
      });
    }

    // Update attendance record with clock out time
    const updatedAttendance = await prisma.attendance.update({
      where: { id: existingAttendance.id },
      data: {
        checkOutTime: currentDate,
      },
    });

    res.json({
      ok: true,
      message: "Clock out successful",
      data: updatedAttendance,
    });
  } catch (error) {
    console.error("Clock out error:", error);
    next(createError("Failed to clock out", 500));
  }
};

module.exports.CheckIsSup = async (req, res, next) => {
  try {
    console.log(req.user.id)
    const supData = await prisma.user.findFirst({ where: { supId: req.user.id } });
    res.status(201).json(supData);
  } catch (err) {
    next(err);
  }
};