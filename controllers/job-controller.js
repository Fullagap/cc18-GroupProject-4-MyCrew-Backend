const jobService = require("../service/job-service");
const jobController = {};

jobController.getProject = async (req, res, next) => {
  try {
    const data = await jobService.getProject();
    res.json({ message: "Success getProject", data });
  } catch (err) {
    next();
  }
};

jobController.projectCreate = async (req, res, next) => {
  try {
    const {
    //   id,
      title,
      description,
      dueDate,
      completeDate,
      isCompleteDate,
      comment,
    } = req.body;
    const body = req.body;
    const data = await jobService.projectCreate(body);
    res.json({ message: "Success projectCreate", data });
  } catch (err) {
    next();
  }
};

jobController.projectUpdate = async (req, res, next) => {
  try {
    const { projectId } = req.params
    const { completeDate, isCompleteDate, comment } = req.body;
    let dataToUpdate = {};

    // อันนี้แยกใส่ทีละค่า เพราะอะไรไม่รู้ ถ้าใส่ทีละค่าใน prisma ค่าที่ไม่ได้ใส่ไปมันจะเปลี่ยนข้อมูลให้กลายเป็น null
    if (completeDate) {
      dataToUpdate.completeDate = new Date(completeDate);
    }
    if (isCompleteDate) {
      dataToUpdate.isCompleteDate = new Date(isCompleteDate);
    }
    if (comment) {
      dataToUpdate.comment = comment;
    }

    const data = await jobService.projectUpdate(projectId, dataToUpdate);
    res.json({ message: "Success projectUpdate", data });
  } catch (err) {
    next();
  }
};

jobController.projectDelete = async (req, res, next) => {
  try {
    const { projectId } = req.params
    await jobService.projectDelete(projectId);
    res.json({ message: "Success" });
  } catch (err) {
    next();
  }
};

module.exports = jobController;
