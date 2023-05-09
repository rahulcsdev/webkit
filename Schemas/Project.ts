import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp } from '@keystone-6/core/fields';

export default list({
    access: allowAll, fields: {
   name: text(),

    member: relationship({

  ref: 'User',

  many: true,

 }),

 projectManager: relationship({

  ref: 'User',

 ui: {

  hideCreate: true,

  },

 }),

 code: text(),

 status: select({

  defaultValue: "New",
  options: [

  { label: 'New', value: 'New' },

  { label: 'Design Developement', value: 'Design Developement' },

  { label: 'In Progress', value: 'In Progress' },

  { label: 'Testing', value: 'Testing' },

  { label: 'Completed', value: 'Completed' },

 ],

 }),

 projectType: select({

  options: [{ label: 'Internal project', value: 'Internal project' },

  { label: 'Hourly cost project', value: 'Hourly cost project' },

  { label: 'Fixed cost project', value: 'Fixed cost project' }]

 }),

 projectDiscription: text(),

 startDate: text(),

 endDate: text(), }, ui: {

 labelField: 'name', },
hooks:{
    resolveInput: async({ resolvedData,context }) => {
      const count = await context.db.Project.count({});
      
      return {
        ...resolvedData,
        code: `PROO${count+1}`
      }
    }
  },
})
