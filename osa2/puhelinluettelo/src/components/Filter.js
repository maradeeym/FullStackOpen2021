import React from 'react'

const Filter = ({findName, handleFinderChange}) => { 
    return(
    <form>
        <div>
          filter shown with: <input 
          value={findName}
          onChange={handleFinderChange}
          />
     </div>
    </form>
)
}
    export default Filter