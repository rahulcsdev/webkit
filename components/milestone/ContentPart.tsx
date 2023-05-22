 
 
import dynamic from 'next/dynamic';
const MsCardGrid = dynamic(() => import("./MsCardGrid"));
const MsCardCol = dynamic(() => import('./MsCardCol'));
 
interface props {
  viewMode: Boolean;
  openDetails: any;
  loading:Boolean;
  milestones:any;
  }
const ContentPart:React.FC<props> = ({  viewMode,
 openDetails,loading,milestones
    }) => {
   
  return (
    <div>
         <div className="mt-5">
          {loading?<h1 className="">Loading...</h1>: milestones?.length===0?<h1 className="">No Data found</h1>:viewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
             {
               milestones?.map((item:any,index:any)=>(
                <MsCardGrid key={index} openDetails={openDetails} data={item} />

              ))
             }
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
                {
               milestones?.map((item:any,index:any)=>(
                <MsCardCol key={index} openDetails={openDetails} data={item} />

              ))
             }
            </div>
          )}
        </div>
              
  
    </div>
  )
}

export default ContentPart