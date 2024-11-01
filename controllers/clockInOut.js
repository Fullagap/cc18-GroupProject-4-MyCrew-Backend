// controllers/clockInOut.js
const createError = require("../utils/createError");
const prisma = require("../config/prisma");

module.exports.clockIn = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;

    // Mock-up office location (for testing)
    const officeLocation = {
      latitude: 13.7563, // Example: Wannasorn building
      longitude: 100.5018,
      radius: 100, // meters
    };

    // Calculate distance (simplified for testing)
    const distance = calculateDistance(
      latitude,
      longitude,
      officeLocation.latitude,
      officeLocation.longitude
    );

    // Mock user data
    const userId = 1; // Test user ID,actually we get it from token
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
    const attendance = await prisma.attendance.create({
      data: {
        userId: userId,
        date: currentDate,
        checkInTime: currentDate,
        isWorkingDay: true,
        // checkInLocation: `${latitude},${longitude}` // we will record where user logged-in are we?
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
    const { latitude, longitude } = req.body;
    const userId = 1; // Test user ID
    const currentDate = new Date();

    // Find today's attendance record
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId: userId,
        date: {
          gte: new Date(currentDate.setHours(0, 0, 0, 0)),
          lt: new Date(currentDate.setHours(23, 59, 59, 999)),
        },
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
