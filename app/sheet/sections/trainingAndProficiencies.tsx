import FeaturesTable from './featuresTable';

export default function TrainingAndProficiencies() {
  return (
    <div className="overflow-x-auto  max-h-[500px]">
      <h2 className="text-2xl font-bold mb-5 text-center underline">Equipment Training & Proficiencies</h2>
      <table className="table border-2 bg-secondary/20 gap-2 table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr className='bg-secondary/40'>
            <td className="text-center text-xl underline">Type</td>
            <td className="text-center text-xl underline">Content</td>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-lg underline text-bold w-full text-center">Weapons</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-sm text-bold w-full"
                placeholder="Enter weapons you are proficient with"
              />
            </td>
          </tr>

          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-lg underline text-bold w-full text-center">Tools</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-sm text-bold w-full"
                placeholder="Enter tools you are proficient with"
              />
            </td>
          </tr>

          <tr>
            <td className="pt-5 w-[25%]">
              <p className="text-lg underline text-bold w-full text-center">Languages</p>
            </td>
            <td className="w-[65%] py-2">
              <textarea
                className="textarea textarea-sm text-bold w-full"
                placeholder="Enter languages you are familiar with"
              />
            </td>
          </tr>

          
        </tbody>
        <tfoot>

        </tfoot>
      </table>
    </div>
  );
}