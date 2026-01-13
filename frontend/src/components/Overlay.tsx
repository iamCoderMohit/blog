function Overlay({children}) {
  return (
    <div className="absolute w-full h-full bg-red-500">
        {children}
    </div>
  )
}

export default Overlay