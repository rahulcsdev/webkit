import { list } from "@keystone-6/core";
import { text, password, select } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { multiselect, relationship, timestamp ,float} from "@keystone-6/core/fields";
import { timeStamp } from "console";


type Session = {
  data: {
    role: string[];
  };
};


function isAdmin({ session }: { session: Session | undefined }) {
  const admin = session?.data.role.filter((el) =>
    ["admin", "taskManagement"].includes(el)
  );
  if (!session) return false;
  if (admin?.length != 0) return true;
  return false;
}
export default list({
   // Set access control rules for create, update, delete, and query operations
  access: {
    operation: {
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
      query: () => {
        return true;
      },
    },
  },
  fields: {
    // Define fields for the task entity
    name: text(),
    code: text({ defaultValue: " ", ui: { itemView: { fieldMode: "read" } } }),
    File: relationship({ ref: "File", many: true }),
     discription: text(),

    project: relationship({
      ref: "Project",
    }),

    priority: select({
      defaultValue: "No priority",

      options: [
        { label: "Urgent", value: "Urgent" },

        { label: "High", value: "High" },

        { label: "Medium", value: "Medium" },

        { label: "No priority", value: "No priority" },

        { label: "Backlog", value: "Backlog" },
      ],
    }),
    status: select({
      defaultValue: "Open",
      options: [
        { label: "Open", value: "Open" },

        { label: "Document Analysis", value: "Document Analysis" },

        { label: "In Progress", value: "In Progress" },

        { label: "Code Review", value: "Code Review" },

        { label: "Completed", value: "Completed" },
      ],
    }),
    milestone: relationship({
      ref: "Milestone",
    }),

    startDate: timestamp({ defaultValue: new Date().toISOString() }),

    endDate: timestamp({ defaultValue: new Date().toISOString() }), 
    totalTimeUtilized:float({defaultValue: 0,ui: { itemView: { fieldMode: 'read' } }}),
    estimateTime: text(),
    taskType: select({
      defaultValue: "No priority",
      options: [
        { label: "Frontend", value: "Frontend" },
        { label: "Backend", value: "Backend" },
        { label: "Bug", value: "Bug" },
      ],
    }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context,operation }) => {
     if(operation==="create"){
      const milestoneId = resolvedData.milestone?.connect.id;
      const milestone = await context.db.Milestone.findOne({
        where: { id: milestoneId },
      });
      const count = await context.db.Task.count({});
      if (milestone) {
        var milestoneCode = milestone.code;
      }
      const tasks = await context.db.Task.findMany({});
       // If no tasks exist, set the code as "<milestoneCode>-TSK0001"
      if (tasks.length === 0) {
        return {
          ...resolvedData,
          code: `${milestoneCode}-TSK0001`,
        };
      }
      const lastTask = tasks[tasks.length - 1];
      const lastCode: any = lastTask.code;
      let splitCode = lastCode.split("-");
      const taskCode = splitCode[splitCode.length - 1];
      let matches = taskCode.match(/^([a-zA-Z]+)(\d+)$/);
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
        code: `${milestoneCode}-${newCode}`,
      };
     }else{
      return{
        ...resolvedData
      }
     }
    },
  },
  ui: {
    labelField: "name",
  },
});
