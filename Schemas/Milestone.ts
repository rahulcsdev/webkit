import { list } from '@keystone-6/core';
import { text, password, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { multiselect ,relationship,timestamp} from '@keystone-6/core/fields';

export default list({
    access: allowAll,

        fields: {
    
          name: text(),
    
          project: relationship({
    
           ref: 'Project',
    
     
    
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
    
         endDate:text(),
    
        },
    
        ui: {
    
          labelField: 'name',
    
        },
    })