function MainTheme({children}: {children: any}) {
  return (
    <div className="md:w-1/2 mx-auto h-full dark:text-white text-black">
        {children}
    </div>
  )
}

export default MainTheme