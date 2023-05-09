import React, { FormEventHandler, useState , useEffect } from 'react';
import { Manrope , Roboto } from 'next/font/google';
import { type , role , employeesData } from '../utils/data';
import { useRouter } from 'next/navigation';



  interface Employee {
    id: number;
    name: string;
    phone: string;
    email: string;
    designation : string;
    reportingmanager : string;
    // type: string;
    // role: string;
  }

  interface typeModal {
    showEditModal: Boolean;
    handleCloseModal: any;
    employee: Employee;
  }

const manrope = Manrope({ subsets: ["latin"] });
const roboto = Manrope({ weight:'400', subsets: ["latin"] });

const ModalEditEmployee  = (props:typeModal) => {
const { showEditModal, handleCloseModal , employee } = props;

// const [employeesData, setEmployeesData] = useState<Employee[]>([]);
const [editFullName , setEditFullName] = useState<string>("");
const [editPhone , setEditPhone] = useState<string>("");
const [editemail , setEditEmail] = useState<string>("");
const [editdesignation , setEditDesignation] = useState<string>("");
const [editreportingmanager , setEditReportingManager] = useState<string>("");

const [id , setId] = useState("");
// const [selectedType, setSelectedType] = useState<string>('');
// const [selectedRole, setSelectedRole] = useState<string>('');

const router = useRouter();





// let index = employeesData.findIndex(e => e.id === id);

let index =  employeesData.map((e: { id: number }) => {
  return e.id;
}).indexOf(parseInt(id));


const handleSubmitEditEmployee : FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
  let a = employeesData[index];
 a.name = editFullName;
 a.email = editemail;
 a.phone = editPhone;
 a.designation = editdesignation;
 a.reportingmanager = editreportingmanager;


}


useEffect(()=>{
  setEditFullName(localStorage.getItem('Name') || '');
  setEditEmail(localStorage.getItem('email') || '');
  setEditPhone(localStorage.getItem('Phone') || '');
  setEditDesignation(localStorage.getItem('Designation') ||'');
  setEditReportingManager(localStorage.getItem('Reportingmanager') || '');
  setId(localStorage.getItem('id') || '');
},[]);


  return (
    <>
    {showEditModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg w-[700px] overflow-hidden drop-shadow-md shadow-xl transform transition-all   mx-auto">
              <div className="py-5 border-b-2 border-gray-200">
                <h2 className={`font-semibold mb-2 text-center text-[#140F49] text-2xl ${manrope.className}`}>Update User</h2>
                 
              </div>
              <div className="p-4">
                <form onSubmit={handleSubmitEditEmployee}>
                    <div className="flex flex-col gap-2">
                        <label className={`text-[#01041b] font-medium text-[1.2em] `} >Full Name</label>
                        <input type="text" placeholder="Enter Full name" className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} value={editFullName} onChange={(e)=>setEditFullName(e.target.value)} />
                    </div>
                    <div className="flex flex-row gap-2 mt-5">
                      <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label className={`text-[#01041b] font-medium text-[1.2em] `} >Email</label>
                        <input type="text" placeholder="Email" className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} value={editemail} onChange={(e)=>setEditEmail(e.target.value)} />
                    </div>
                      </div>

                      <div className="basis-1/2">
                    <div className="flex flex-col gap-2">
                    <label className={`text-[#01041b] font-medium text-[1.2em] `} >Phone Number</label>
                        <input type="text" placeholder="Phone Number" className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} value={editPhone} onChange={(e)=>setEditPhone(e.target.value)} />
                    </div>
                    </div>
                                    
                    </div>
                    <div className="flex flex-row gap-2 mt-5">
                      <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label className={`text-[#01041b] font-medium text-[1.2em] `} >Designation</label>
                        <input type="text" placeholder="Designation" className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} value={editdesignation} onChange={(e)=>setEditDesignation(e.target.value)} />
                    </div>
                      </div> 

                      <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                      <label className={`text-[#01041b] font-medium text-[1.2em] `} >Reporting Manager</label>
                        <input type="text" placeholder="Enter Full name" className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} value={editreportingmanager} onChange={(e)=>setEditReportingManager(e.target.value)} />
                      
                    </div>
                      </div>                
                    </div>
                    <div className="flex flex-row gap-2 mt-5">
                      <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label className={`text-[#01041b] font-medium text-[1.2em] `} >Type</label>
                        <select defaultValue='' className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`} >
                          {
                            type.map((item,index)=>(
                              <option disabled={item.value===''} key={index} className={`text-sm text-[#605C8D] py-3 p-2`} value={item.value} >{item.name}</option>
                            ))
                          }
                         
                         
                        </select>
                    </div>
                      </div>

                      <div className="basis-1/2">
                      <div className="flex flex-col gap-2">
                        <label className={`text-[#01041b] font-medium text-[1.2em] `} >Role</label>
                        <select defaultValue='' className={`outline-none bg-[#F8F7F7] border-[1px] px-2 py-3 rounded-lg border-[#E0E2DB]`}  >
                          {
                            role.map((item,index)=>(
                              <option disabled={item.value===''} key={index} className={`text-sm text-[#605C8D] py-3 p-2`} value={item.value} >{item.name}</option>
                            ))
                          }        
                        </select>
                    </div>
                      </div>  
                    </div>
                    <div className="flex items-center justify-center mt-6 mb-4 gap-4 ">
                      <button className={`text-base font-normal ${roboto.className} text-white px-6 bg-[#5773FF] rounded-md py-2 border-none`} onClick={()=>router.push("/employees")}>Save</button>
                      <button className={`text-base font-normal ${roboto.className} text-white px-4 bg-[#5773FF] rounded-md py-2 border-none`}>Cancel</button>
                       
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      )}

      
    </>
  )
}

export default ModalEditEmployee;