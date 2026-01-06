import MainTheme from "../layouts/MainTheme"

function BottomDialog() {
  return (
    <MainTheme>
        <div className="absolute h-fit rounded-2xl bottom-0 bg-gray-900/50 left-1/2 -translate-x-1/2 w-1/2 p-5">
            <h1 className="text-lg">Liked by</h1>
        </div>
    </MainTheme>
  )
}

export default BottomDialog