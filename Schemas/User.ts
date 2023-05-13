import { list } from '@keystone-6/core';
import { text, password, select ,file} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';
import type { Context } from '.keystone/types';
type Session = {
  data: {
    role: string[];
  };
};
async function isAdmin({ session }: { session: Session | undefined }) {
  const admin = session?.data.role.filter((el) => ["admin", "userManagement"].includes(el));
 
  if (!session) {
    return true;
  }
  
  if (admin?.length !== 0) {
    return true;
  }
  return false;
}


export default list({
    access:{operation: {
      create:isAdmin,
      update:isAdmin,
      delete:isAdmin,
      query:()=>{return true}
    }},
    fields: {
      name: text(),
     email:  text({ validation: { isRequired: true }, isIndexed: 'unique' }),
     code:text({defaultValue: ' ',ui: { itemView: { fieldMode: 'read' } }}),
     password: password(),
      designation: text(),
      File: relationship({ ref: 'File', many: true }),
      
role: multiselect({
      
    options: [
      
       { label: 'Admin', value: 'admin' },
      
       { label: 'User Management', value: 'userManagement' },
      
       { label: 'Project Management', value: 'projectManagement' },
       { label: 'Task Management', value: 'taskManagement' },
      
       { label: 'Milestone Management', value: 'milestoneManagement' },
      
       { label: 'Time Entry Management', value: 'timeEntryManagement' },
      
      
      
   ],
      
}),
  
       dateOfJoining: timestamp(),
      
reportingManager:relationship({
      
    ref: 'User',
      
}),
       createdDate: timestamp({ defaultValue: new Date().toISOString() })
      
},
hooks:{
  resolveInput: async({ resolvedData,context }) => {
    const count = await context.db.User.count({});
    const Users=await context.db.User.findMany({})
    if(Users.length==0){
      return {
        ...resolvedData,
        code: "USR001"
      }
    }
    const lastUser = Users[Users.length-1]
    let  lastCode:any = lastUser?.code
    let matches = lastCode.match(/^([a-zA-Z]+)(\d+)$/);
    let newCode="";
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
  }
},
});