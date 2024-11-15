const prisma = require("../config/prisma");
const jobService = {};

jobService.getProject = async () => await prisma.project.findMany();

jobService.projectCreate = async (data) =>
  await prisma.project.create({
    data,
  });

jobService.projectUpdate = async (
  projectId,
  dataToUpdate
) =>
  await prisma.project.update({
    where: { id: parseInt(projectId) },
    data: dataToUpdate , 
  });

jobService.projectDelete = async (projectId) =>
  await prisma.project.delete({
    where: { id: parseInt(projectId) }
  });

module.exports = jobService;
