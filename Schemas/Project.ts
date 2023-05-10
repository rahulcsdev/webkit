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
 createAt:timestamp({ defaultValue: new Date().toISOString() }),

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

 startDate: timestamp({ defaultValue: new Date().toISOString() }),

 endDate: timestamp({ defaultValue: new Date().toISOString() }), }, ui: {

 labelField: 'name', },
hooks:{
    resolveInput: async({ resolvedData,context }) => {
      const Projects=await context.db.Project.findMany({})
      if(Projects.length===0){
        return {
          ...resolvedData,
          code: 'PROO1'
        }
      }
      const lastProject = Projects[Projects.length-1]
      let  lastCode = lastProject?.code
    let matches = lastCode.match(/^([a-zA-Z]+)(\d+)$/);
if (matches) {
  let prefix = matches[1];
  let number = parseInt(matches[2]);
  number++;
  var newCode = prefix + number.toString().padStart(matches[2].length, '0');
}
      return {
        ...resolvedData,
        code: newCode
      }
    }
  },
})
