import { list } from "@keystone-6/core";
import { text, password, select } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { multiselect, relationship, timestamp ,float} from "@keystone-6/core/fields";

// Define the session object type
type Session = {
  data: {
    role: string[];
  };
};
// Helper function to check if the user is an admin or milestone manager
function isAdmin({ session }: { session: Session | undefined }) {
  const admin = session?.data.role.filter((el) =>
    ["admin", "milestoneManagement"].includes(el)
  );

  if (!session) return false;
  if (admin?.length != 0) return true;
  return false;
}

export default list({
  // Set access control rules
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
    name: text(),
    project: relationship({ ref: "Project" }),
    code: text({ defaultValue: " ", ui: { itemView: { fieldMode: "read" } } }),
    File: relationship({ ref: "File", many: true }),
    status: select({
      defaultValue: "New",

      options: [
        { label: "New", value: "New" },

        { label: "Design Developement", value: "Design Developement" },

        { label: "In Progress", value: "In Progress" },

        { label: "Testing", value: "Testing" },

        { label: "Completed", value: "Completed" },
      ],
    }),
    startDate: timestamp({ defaultValue: new Date().toISOString() }),

    endDate: timestamp({ defaultValue: new Date().toISOString() }),
    totalTimeUtilized:float({defaultValue: 0,ui: { itemView: { fieldMode: 'read' } }}),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context,operation }) => {
      if(operation==="create"){
        const { id } = resolvedData.project.connect;

      const project = await context.db.Project.findOne({
        where: { id: id },
      });
      if (project) {
        var projectCode = project.code;
      }
      const milestone = await context.db.Milestone.findMany({});
        // If no time entries exist, set the code as "<projectCode>-MST001"
      if (milestone.length === 0) {
        return {
          ...resolvedData,
          code: `${projectCode}-MST001`,
        };
      }

      const lastMilestone = milestone[milestone.length - 1];
      const lastCode: any = lastMilestone.code;
      let splitCode = lastCode.split("-");
      const milestoneCode = splitCode[splitCode.length - 1];
      let matches = milestoneCode.match(/^([a-zA-Z]+)(\d+)$/);
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
        code: `${projectCode}-${newCode}`,
      };
      }else{
        return {
          ...resolvedData,
        }
      }
    },
  },
  ui: {
    labelField: "name",
  },
});
