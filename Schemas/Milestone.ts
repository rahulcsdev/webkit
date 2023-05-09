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
      
          const count = await context.db.Milestone.count({});  
    
          return {
            ...resolvedData,
            code: `${projectCode}-MST00${count+1}`
          }
  },
},
     ui: {
    
      labelField: 'name',
    
     },
    
})