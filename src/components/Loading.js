import React from 'react'

const Loading = ({ inline = false }) => {
  if (inline) {
    return (
      <div className="flex items-center justify-center space-x-2 animate-ping w-20">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center space-x-2 animate-ping my-10">
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
    </div>
  )
}

export default Loading
