import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface Input {
  setTags?: React.Dispatch<React.SetStateAction<String[]>>
  name: string
  index?: number
}

function Tag({setTags, name, index}: Input) {
  const navigate = useNavigate()
  return (
    <div
    onClick={(e) => {
      e.stopPropagation()
      navigate(`/tag/${name}`, {state: name})
    }}
    className={`flex gap-4 items-center bg-gray-600/30 rounded-full group transition-all duration-200 ease-in-out
    ${!index ? "text-sm px-2 p-1 h-fit w-fit": "p-2 px-5"}
    `}>
              <span className="">#{name}</span>
              <div
                className={`cursor-pointer
          max-w-0
          opacity-0
          transition-all duration-200 ease-in-out
          group-hover:max-w-6
          group-hover:opacity-100
          ${!index && "hidden"}
`}
              onClick={() => {
                setTags(prev => prev.filter((_, i) => i !== index))
              }}
              >
                <MdDelete />
              </div>
            </div>
  )
}

export default Tag