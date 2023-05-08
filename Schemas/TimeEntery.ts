import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';

export default list({
    access: allowAll,

          fields: {
    
  project:relationship({ ref: 'Project', }),
         task: relationship({ ref: 'Task',}),
          activities: text(),
    
          code:text(),
    
          duration: text(),
    
          projectType:    select({
    
           options: [
    
             { label: 'Internal project', value: 'Internal project' },
    
             { label: 'Hourly cost project', value: 'Hourly cost project' },
    
             { label: 'Fixed cost project', value: 'Fixed cost project' },
    
           ],
    
         }),        
    
          projectManager: text(),
    
          userName:relationship({ ref: 'User',}),
    
          reviewStatus: select({
    
           options: [
    
             { label: 'Approved', value: 'Approved' },
    
             { label: 'Pending', value: 'Pending' },
    
             { label: 'Rejected', value: 'Rejected' },
    
           ],
    
         }),
    
          remarks: text(),
    
           reviewedBy:relationship({
    
             ref: 'User',
    
           }),
    
           reviewedAt:text(),
    
           date:text(),
    
          },
    
         
    
       })