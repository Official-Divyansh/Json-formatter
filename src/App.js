import React, { useEffect, useState } from 'react'
import Format from './Format'

function App() {
  const [data, setData] = useState()
  const [jsonData, setJsonData] = useState()
  const [error, setError] = useState(false)
  const [parentCollapse, setParentCollapse] = useState()


  function isValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  function callbackFunction() {

    if (isValidJSONString(data)) {
       let s = data.replaceAll('.', '')
       console.log(s)
      setJsonData(JSON.parse(data))
      console.log(Object.keys(JSON.parse(data)).length)
      let arr = []
      for (var i = 0; i <= Object.keys(JSON.parse(data)).length; i++) {
        arr.push({
          key: i,
          watch: false,
        });
      }
      setParentCollapse(arr)
      setError(false)
    } else {
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex items-center justify-center mr-10 mb-2 mt-2'>

        <button className='bg-red-500 pl-8 pr-8 pt-2
   pb-2 rounded-md font-semibold text-white' onClick={(e) => callbackFunction(e)}>Format</button>
        <button className='bg-green-500 pl-8 pr-8 pt-2
   pb-2 rounded-md font-semibold text-white ml-10' onClick={() => {
            setJsonData('')
            setData('')
            setError('')
          }}>Clear </button>
      </div>
      <div className='flex'>
        <textarea type='text' className='bg-gray-200 w-[50vw] h-[90vh] resize-none border-2 border-gray-300 outline-none' placeholder='ENTER YOUR VALID JSON DATA' value={data} onChange={(e) => setData(e.target.value)} />
        <div className='h-[90vh] overflow-auto w-[50vw] '>

          <Format datas={jsonData} error={error} parentCollapse={parentCollapse} setParentCollapse={setParentCollapse} />
        </div>
      </div>
    </>
  )
}

export default App