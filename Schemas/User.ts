import { list } from "@keystone-6/core";
import { text, password, select, file } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { multiselect, relationship, timestamp } from "@keystone-6/core/fields";

// Define the Session type for user role information
type Session = {
  data: {
    role: string[];
  };
}

// Check if the user is an admin based on the session role
async function isAdmin({ session }: { session: Session | undefined }) {
  // Filter the session roles to find admin or userManagement roles
  const admin = session?.data.role.filter((el) =>
    ["admin", "userManagement"].includes(el)
  );

  // If session is not defined, consider the user as admin (assuming no access restrictions)
  if (!session) {
    return true;
  }

  // If admin roles are found, consider the user as admin
  if (admin?.length !== 0) {
    return true;
  }

  // Otherwise, consider the user as a regular user
  return false;
}

// Export the list definition
export default list({

  access: {
    operation: {
      // Set access control rules for create, update, delete, and query operations
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
      query: () => {
        return true; // Allow all users to perform queries
      },
    },
  },
  fields: {
     // Define fields for the user entity
    name: text(),
    email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    code: text({ defaultValue: " ", ui: { itemView: { fieldMode: "read" } } }),
    password: password(),
    designation: text(),
    File: relationship({ ref: "File", many: true }),

    role: multiselect({
      // Define options for the multiselect role field
      options: [
        { label: "Admin", value: "admin" },

        { label: "User Management", value: "userManagement" },

        { label: "Project Management", value: "projectManagement" },
        { label: "Task Management", value: "taskManagement" },

        { label: "Milestone Management", value: "milestoneManagement" },

        { label: "Time Entry Management", value: "timeEntryManagement" },
      ],
    }),

    dateOfJoining: timestamp(),

    reportingManager: relationship({
      ref: "User",
    }),
    createdDate: timestamp({ defaultValue: new Date().toISOString() }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, context,operation }) => {
     if(operation==="create"){
        // Get the count and list of existing users from the database
        const count = await context.db.User.count({});
        const Users = await context.db.User.findMany({});
  
        // Generate a unique code for the new user
        if (Users.length == 0) {
          // If no users exist, set the code as "USR001"
          return {
            ...resolvedData,
            code: "USR001",
          };
        }
       const lastUser = Users[Users.length - 1];
       let lastCode: any = lastUser?.code;
       let matches = lastCode.match(/^([a-zA-Z]+)(\d+)$/);
       let newCode = "";
       if (matches) {
         let prefix = matches[1];
         let numberStr = matches[2];
         let number = parseInt(numberStr);
         number++;
         let newNumberStr = number.toString().padStart(numberStr.length, "0");
         newCode = prefix + newNumberStr;
       }
        // Set the generated code for the new user
       return {
         ...resolvedData,
         code: newCode,
       };
     }else{
      return {
        ...resolvedData
      }
     }
    },
  },
});
