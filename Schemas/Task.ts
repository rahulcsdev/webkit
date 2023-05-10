import { list } from "@keystone-6/core";
import { text, password, select } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";
import { multiselect, relationship, timestamp } from "@keystone-6/core/fields";

export default list({
  access: allowAll,
  fields: {
    name: text(),

    code: text(),

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

    startDate: text(),

    endDate: text(),
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
    resolveInput: async ({ resolvedData, context }) => {
      const milestoneId = resolvedData.milestone?.connect.id;
      const milestone = await context.db.Milestone.findOne({
        where: { id: milestoneId },
      });
      const count = await context.db.Task.count({});
      if (milestone) {
        var milestoneCode = milestone.code;
      }
      return {
        ...resolvedData,
        code: `${milestoneCode}-TSK000${count + 1}`,
      };
    },
  },
  ui: {
    labelField: "name",
  },
});
