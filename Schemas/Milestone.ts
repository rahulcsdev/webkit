import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';

export default list({
    access: allowAll,

 fields: { name: text(), project: relationship({ref: 'Project',
    
    }),
    code:text(),
    status:select({
    
    defaultValue: "New",
    
    options: [
    
    { label: 'New', value: 'New' },
    
    { label: 'Design Developement', value: 'Design Developement' },
    
    { label: 'In Progress', value: 'In Progress' },
    
    { label: 'Testing', value: 'Testing' },
    
    { label: 'Completed', value: 'Completed' },
    
    ],
}),
startDate:text(),
endDate:text() },
hooks:{
    resolveInput: async({ resolvedData,context }) => {
       
      const {id} =  resolvedData.project.connect
       console.log(id)
        const project = await context.db.Project.findOne({
            where: { id: id },
          });
          if(project){
            var projectCode= project.code;
            console.log(projectCode)
          }
          const milestone=await context.db.Milestone.findMany({}) 
          if(milestone.length===0){
            return {
              ...resolvedData,
              code: `${projectCode}-MST001`
            }
          }

          const lastMilestone= milestone[milestone.length-1];
          const lastCode =lastMilestone.code;
          let splitCode = lastCode.split("-")
          const milestoneCode= splitCode[splitCode.length-1]
          let matches = milestoneCode.match(/^([a-zA-Z]+)(\d+)$/);
      if (matches) {
        let prefix = matches[1];
        let number = parseInt(matches[2]);
        number++;
        var newCode = prefix + number.toString().padStart(matches[2].length, '0');
      }
          return {
            ...resolvedData,
            code: `${projectCode}-${newCode}`
          }
  },
},
     ui: {
    
      labelField: 'name',
    
     },
    
})