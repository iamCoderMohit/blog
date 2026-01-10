import MainTheme from "../layouts/MainTheme"

function Landing() {
  return (
    <MainTheme>
      <div className="flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-1 justify-center items-center flex-col">
        <div className="dark:text-white text-black text-6xl font-bold">
          <h1 className="text-center">Found something interesting</h1>
          <h1 className="text-center">tell the community!!</h1>
        </div>
        <h1 className="text-gray-400 mt-10 text-xl text-center">OpenBlog is a platform where you can write and find about things you see in internet but not very often</h1>
    </div>
    </MainTheme>
  )
}

export default Landing