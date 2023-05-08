import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';

export default list({
    access:allowAll,
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
      
       
      
          dateOfJoining: text(),
      
          reportingManager:relationship({
      
            ref: 'User',
      
          }),
      
          createdDate: timestamp({ defaultValue: new Date().toISOString() })
      
          },
      
       
});