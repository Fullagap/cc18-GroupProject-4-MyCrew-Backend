const { date } = require("joi");
const { getLeaveType } = require("../repository/leaveCategory-repo");
const { getUserLeaveData, updateUser } = require("../repository/user-repo");

exports.reduceUserLeaveAmount = async (id, leaveTypeId,startDate,endDate) => {
  intId = Number(id);
  intLeaveTypeId = Number(leaveTypeId);
  const duration = getDuration(startDate,endDate)
  const leaveType = await getLeaveType(intLeaveTypeId);
  console.log("leaveType", leaveType);
  const user = await getUserLeaveData(intId);
  console.log("user", user);
  const objData = {};
  objData[leaveType.leaveName] = user[leaveType.leaveName] - duration;
  console.log("objData", objData);
  const resp = await updateUser(intId, objData);
  return resp;
};
exports.increaseUserLeaveAmount = async (id, leaveTypeId,startDate,endDate) => {
  intId = Number(id);
  intLeaveTypeId = Number(leaveTypeId);
  const duration = getDuration(startDate,endDate)
  const leaveType = await getLeaveType(intLeaveTypeId);
  console.log("leaveType", leaveType);
  const user = await getUserLeaveData(intId);
  console.log("user", user);
  const objData = {};
  objData[leaveType.leaveName] = user[leaveType.leaveName] + duration;
  console.log("objData", objData);
  const resp = await updateUser(intId, objData);
  return resp;
};
function getDuration(startDate,endDate)
{
    let start = new Date(startDate)
    let end = new Date(endDate)
    let duration = (Math.abs(end-start)/(1000*60*60*24))+1
    console.log('duration', duration)
    return duration
}