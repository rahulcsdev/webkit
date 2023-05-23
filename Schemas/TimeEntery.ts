import { list } from "@keystone-6/core";
import { text, password, select } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { multiselect, relationship, timestamp } from "@keystone-6/core/fields";
type Session = {
  data: {
    role: string[];
  };
};
function isAdmin({ session }: { session: Session | undefined }) {
    // Filter the session roles to find admin or timeEntryManagement roles
  const admin = session?.data.role.filter((el) =>
    ["admin", "timeEntryManagement"].includes(el)
  );

  // If session is not defined, consider the user as a non-admin
  if (!session) return false;

  // If admin roles are found, consider the user as an admin
  if (admin?.length != 0) return true;

  // Otherwise, consider the user as a non-admin
  return false;
}

export default list({
  access: {
    operation: {
       // Set access control rules for create, update, delete, and query operations
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
      query: () => {
        return true;
      },
    },
  },
  fields: {
    // Define fields for the timeEntry entity
    project: relationship({ ref: "Project" }),
    task: relationship({ ref: "Task" }),
    activities: text(),

    code: text({ defaultValue: " ", ui: { itemView: { fieldMode: "read" } } }),
    File: relationship({ ref: "File", many: true }),

    duration: text(),

    projectType: select({
       // Define options for the projectType field
      options: [
        { label: "Internal project", value: "Internal project" },

        { label: "Hourly cost project", value: "Hourly cost project" },

        { label: "Fixed cost project", value: "Fixed cost project" },
      ],
    }),

    projectManager: relationship({ ref: "User" }),

    userName: relationship({ ref: "User" }),
    reviewStatus: select({
        // Define options for the reviewStatus field
      options: [
        { label: "Approved", value: "Approved" },

        { label: "Pending", value: "Pending" },

        { label: "Rejected", value: "Rejected" },
      ],
    }),
    remarks: text(),

    reviewedBy: relationship({
      ref: "User",
    }),

    reviewedAt: text(),

    date: timestamp(),
  },

  hooks: {
    afterOperation: async ({
      operation,
      resolvedData,
      context,
      originalItem
    }) => { 
      // console.log(operation)
      if(operation=="create"){

      //  console.log(resolvedData)
      //  console.log(originalItem)
      const proejctId = resolvedData?.project.connect.id;
      const taskId = resolvedData?.task.connect.id;
     
      const project:any = await context.db.Project.findOne({
        where: { id:proejctId},
      });
      const task:any= await context.db.Task.findOne({
        where: { id:taskId},
      });
    
     const milestone:any= await context.db.Milestone.findOne({
      where: { id:task?.milestoneId},
    });
     
      let Projectduration:number ;
      let taskDuration:number;
      let milestoneDuration:number;
      if(project?.totalTimeUtilized==0||task?.totalTimeUtilized==0){
        Projectduration= +(resolvedData.duration)
        taskDuration=+(resolvedData.duration)
      }else{
         Projectduration = project?.totalTimeUtilized+(+(resolvedData.duration))
         taskDuration= task?.totalTimeUtilized+(+(resolvedData.duration));
      }
      if(milestone?.totalTimeUtilized=="null"){
          milestoneDuration= taskDuration
          // console.log(taskDuration)
      }else{
        milestoneDuration=milestone?.totalTimeUtilized+taskDuration
        // console.log(milestoneDuration)
      }
       
        const updateProject= await context.db.Project.updateOne({
          where: { id: proejctId },
          data: {
            totalTimeUtilized: Projectduration,
          },
        });
        const updateTask= await context.db.Task.updateOne({
          where: { id: taskId },
          data: {
            totalTimeUtilized: taskDuration,
          },
        });
        const updateMilestone=await context.db.Milestone.updateOne({
          where: { id: task?.milestoneId },
          data: {
            totalTimeUtilized: milestoneDuration,
          },
        });
      
        return resolvedData
    }
    else if(operation==="update"){
      
      if(!isNaN(resolvedData.duration)){
        const Projectid:any = originalItem.projectId
        const taskId:any= originalItem.taskId
       const project:any = await context.db.Project.findOne({
         where: { id: Projectid},
       });
       const task:any= await context.db.Task.findOne({
         where: { id: taskId},
       });
      const milestone:any= await context.db.Milestone.findOne({
       where: { id: task?.milestoneId},
     });
       let Projectduration:number ;
       let taskDuration:number;
       let milestoneDuration:number;
       if(project?.totalTimeUtilized==0||task?.totalTimeUtilized==0){
         Projectduration= +(resolvedData.duration)
         taskDuration=+(resolvedData.duration)
 
       }else{
          const deletePriviousProjectData= project?.totalTimeUtilized-(+(originalItem?.duration));
          const deletePriviousTaskData=task?.totalTimeUtilized-(+(originalItem?.duration));
          const deleteMilestoneData= milestone?.totalTimeUtilized-task.totalTimeUtilized;
 
          Projectduration= deletePriviousProjectData+(+(resolvedData.duration));
          taskDuration=deletePriviousTaskData+(+(resolvedData.duration));
          milestoneDuration= deleteMilestoneData+(+(resolvedData.duration));
          
       }
         
         const updateProject= await context.db.Project.updateOne({
           where: { id: Projectid },
           data: {
             totalTimeUtilized: Projectduration,
           },
         });
         const updateTask= await context.db.Task.updateOne({
           where: { id: taskId },
           data: {
             totalTimeUtilized: taskDuration,
           },
         });
         const updateMilestone= await context.db.Milestone.updateOne({
           where: { id: task?.milestoneId },
           data: {
             totalTimeUtilized: milestoneDuration,
           },
         });
      }
        // console.log(updateTask)
        return resolvedData
      
    }
    else if(operation==="delete"){
      const Projectid:any = originalItem.projectId
      const taskId:any= originalItem.taskId
     const project:any = await context.db.Project.findOne({
       where: { id: Projectid},
     });
     const task:any= await context.db.Task.findOne({
       where: { id: taskId},
     });
    const milestone:any= await context.db.Milestone.findOne({
     where: { id: task?.milestoneId},
   });
   const Projectduration = project?.totalTimeUtilized-(+(originalItem?.duration));
   const taskDuration=task?.totalTimeUtilized-(+(originalItem?.duration));
   const milestoneDuration = milestone?.totalTimeUtilized-task.totalTimeUtilized;
   
   const updateProject= await context.db.Project.updateOne({
    where: { id: Projectid },
    data: {
      totalTimeUtilized: Projectduration,
    },
  });
 
  const updateTask= await context.db.Task.updateOne({
    where: { id: taskId },
    data: {
      totalTimeUtilized: taskDuration,
    },
  });
  
  const updateMilestone= await context.db.Milestone.updateOne({
    where: { id: task?.milestoneId },
    data: {
      totalTimeUtilized: milestoneDuration,
    },
  });
    }
    else{
      return resolvedData
    }
      
    },
    resolveInput: async ({ resolvedData, context,operation }) => {
    if(operation==="create"){
      const taskId = resolvedData.task.connect.id;
      const task = await context.db.Task.findOne({
        where: { id: taskId },
      });
      const count = await context.db.TimeEntery.count({});
      if (task) {
        var taskCode = task.code;
      }
      const timeEnteries = await context.db.TimeEntery.findMany({});
        // If no time entries exist, set the code as "<taskCode>-TSE0001"
      if (timeEnteries.length === 0) {
        return {
          ...resolvedData,
          code: `${taskCode}-TSE0001`,
        };
      }
      const lastTimeEntry = timeEnteries[timeEnteries.length - 1];
      const lastCode: any = lastTimeEntry?.code;
      let splitCode = lastCode.split("-");
      const timeEnteryCode = splitCode[splitCode.length - 1];
      let matches = timeEnteryCode.match(/^([a-zA-Z]+)(\d+)$/);
      let newCode = "";
      if (matches) {
        let prefix = matches[1];
        let numberStr = matches[2];
        let number = parseInt(numberStr);
        number++;
        let newNumberStr = number.toString().padStart(numberStr.length, "0");
        newCode = prefix + newNumberStr;
      }
      return {
        ...resolvedData,
        code: `${taskCode}-${newCode}`,
      };
    }else{
      return {
        ...resolvedData,
      }
    }
    },
  },
});
