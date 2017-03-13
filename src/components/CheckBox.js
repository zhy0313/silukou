import React from 'react'


const CheckBox = ( {checkbox} ) => (
    
<li  onClick={ alert('sdfs')}>
    <label className="checkbox" htmlFor={checkbox.id}>
        <input type="checkbox" defaultValue="" id={checkbox.id} data-toggle="checkbox" className="custom-checkbox" />
        <span className="icons">
        <span className="icon-unchecked"></span>
        <span className="icon-checked"></span>
        </span>
        {checkbox.text}
    </label>
</li>
)

export default CheckBox
