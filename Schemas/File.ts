import { list } from '@keystone-6/core';
import { text, password, select ,file} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';



export default list({
    access:allowAll,
    fields: {
        documents:file({ storage: 'my_local_file' })
    }

});