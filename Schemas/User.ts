import { list } from '@keystone-6/core';
import { text, password, select ,file} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';

type Session = {
  data: {
    role: string[];
  };
};
function isAdmin({ session }: { session: Session | undefined }) {
   
   const admin= session?.data.role.filter((el) => el=== "admin"||"userManagement")
   console.log(admin)
  if (!session) return false;
  if (admin?.length!=0) return true;
  return false;
}


export default list({
    access:{operation: {
      create: isAdmin,
      query:isAdmin,
      update:isAdmin,
      delete:isAdmin
    }},
    fields: {
      name: text(),
     email:  text({ validation: { isRequired: true }, isIndexed: 'unique' }),
     code:text(),
     password: password(),
      designation: text(),
      
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
        code: "USRO1"
      }
    }
    const lastUser = Users[Users.length-1]
    let  lastCode:any = lastUser?.code
    let matches = lastCode.match(/^([a-zA-Z]+)(\d+)$/);
    let newCode="";
if (matches) {
  let prefix = matches[1];
  let number = parseInt(matches[2]);
  number++;
  newCode = prefix + number.toString().padStart(matches[2].length, '0');
}
      return {
        ...resolvedData,
        code: newCode
      }
  }
},
});