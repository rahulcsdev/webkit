import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp,float } from '@keystone-6/core/fields';

// Define the session object type
type Session = {
  data: {
    role: string[];
  };
};

// Helper function to check if the user is an admin or project manager
function isAdmin({ session }: { session: Session | undefined }) {
   
   const admin= session?.data.role.filter((el) => ["admin","projectManagement"].includes(el))
  
  if (!session) return false;
  if (admin?.length!=0) return true;
  return false;
}

export default list({
  // Set access control rules
  access:{operation: {
    create: isAdmin,
    update:isAdmin,
    delete:isAdmin,
    query:()=>{return true}
  }},
  // Define the fields of the list
     fields: {
     name: text(),
   member: relationship({ref: 'User',many: true,}),
 createAt:timestamp({ defaultValue: new Date().toISOString() }),

 projectManager: relationship({ref: 'User',
ui: {hideCreate: true,},}),

 code:text({defaultValue: ' ',ui: { itemView: { fieldMode: 'read' } }}),
 File: relationship({ ref: 'File', many: true }),

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

 endDate: timestamp({ defaultValue: new Date().toISOString() }), 
 totalTimeUtilized:float({defaultValue: 0,ui: { itemView: { fieldMode: 'read' } }}),
},
 ui: {labelField: 'name', },

 

 // Define a hook to generate project codes
hooks:{
    resolveInput: async({ resolvedData,context,operation }) => {
    if(operation==="create"){
      const Projects=await context.db.Project.findMany({})
      if(Projects.length===0){
        return {
          ...resolvedData,
          code: 'PRJ001'
        }
      }
      const lastProject = Projects[Projects.length-1]
      let  lastCode:any = lastProject?.code
    let matches = lastCode.match(/^([a-zA-Z]+)(\d+)$/);
    let newCode = '';
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
        code: newCode
      }
    }else{
      return{
        ...resolvedData
      }
    }
    }
  },
})