import FeaturesTable from '../../components/FeaturesTable';

export default function TrainingAndProficiencies() {
  return (
    <div className="overflow-x-auto max-h-[500px]">
      <h2 className="text-3xl text-secondary text-outline-secondary-content font-bold font-fantasy mb-5 text-center underline">Equipment Training & Proficiencies</h2>
      <div className='border-2 rounded-lg'>
      <table className="table  bg-primary/60 gap-2 table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr className='bg-primary'>
            <td className="text-center text-primary-content font-fantasy font-extrabold text-2xl underline ">Type</td>
            <td className="text-center text-primary-content font-fantasy font-extrabold text-2xl underline">Content</td>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-xl underline text-outline-secondary font-fantasy font-extrabold w-full text-center">Weapons</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-md font-bold w-full"
                placeholder="Enter weapons you are proficient with"
              />
            </td>
          </tr>

          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-xl underline text-outline-secondary font-fantasy font-extrabold w-full text-center">Tools</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-md font-bold w-full"
                placeholder="Enter tools you are proficient with"
              />
            </td>
          </tr>

          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-xl underline text-outline-secondary font-fantasy font-extrabold w-full text-center">Languages</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-md font-bold w-full"
                placeholder="Enter languages you are familiar with"
              />
            </td>
          </tr>

          
        </tbody>
        <tfoot>

        </tfoot>
      </table>
      </div>
    </div>
  );
}