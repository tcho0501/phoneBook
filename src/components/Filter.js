import React from 'react'
const Filter = ({filterValue, handleFilterValueChange}) => {
    return (
      <div>
        filter value:<input value = {filterValue} onChange = {handleFilterValueChange}/>
      </div>
    )
}

export default Filter