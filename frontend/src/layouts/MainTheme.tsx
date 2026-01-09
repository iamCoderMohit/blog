function MainTheme({children}: {children: any}) {
  return (
    <div className="w-1/2 mx-auto dark:text-white text-black">
        {children}
    </div>
  )
}

export default MainTheme