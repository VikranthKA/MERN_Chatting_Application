import React from 'react'

export const GenderCheckBox = () => {
    const genders = [{
        id:1,name:"Male",
    },{

        id:2,name:"Female"
    }
]
  return (
    <div className='flex'>
        
        <div className="form-control">
            {genders.map((gender)=>{
return(
            <label htmlFor="" className={`label gap-2 cursor-pointer`} key={gender.id}>
                <span className="label-text">
                    {gender.name}
                </span>
                <input type="text" className="checkbox border-slate 900" />
            </label>
)
            })}

        </div>
        <div>

        </div>
    </div>
  )
}
