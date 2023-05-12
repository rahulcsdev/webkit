import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';
type Session = {
  data: {
    role: string[];
  };
};
function isAdmin({ session }: { session: Session | undefined }) {
   
   const admin= session?.data.role.filter((el) =>["admin","milestoneManagement"].includes(el))
   console.log(admin)
  if (!session) return false;
  if (admin?.length!=0) return true;
  return false;
}



export default list({
  access:{operation: {
    create: isAdmin,
    update:isAdmin,
    delete:isAdmin,
    query:()=>{return true}
  }},

 fields: { name: text(), project: relationship({ref: 'Project',
    
    }),
    code:text({defaultValue: ' ',ui: { itemView: { fieldMode: 'read' } }}),
    File: relationship({ ref: 'File', many: true }),
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
startDate: timestamp({ defaultValue: new Date().toISOString() }),

 endDate: timestamp({ defaultValue: new Date().toISOString() })},
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
          const lastCode:any =lastMilestone.code;
          let splitCode = lastCode.split("-")
          const milestoneCode= splitCode[splitCode.length-1]
          let matches = milestoneCode.match(/^([a-zA-Z]+)(\d+)$/);
          let newCode=""
      if (matches) {
        let prefix = matches[1];
        let numberStr = matches[2];
        let number = parseInt(numberStr);
        number++;
        let newNumberStr = number.toString().padStart(numberStr.length, '0');
       newCode= prefix + newNumberStr;
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