function UserBox({username}: {username: string}) {
  return (
    <div className="flex items-center gap-5 mt-5">
        <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center font-bold">{username[0].toUpperCase()}</div>
        <h1 className="text-lg">{username}</h1>
    </div>
  )
}

export default UserBox