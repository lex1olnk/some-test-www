type ComponentNameProps = {
  title: string
}

export const ComponentName = ({ title } : ComponentNameProps) => {
  return (
    <div className="block h-9 bg-primary w-fit mb-4">
      <div className="flex bg-white ml-6 h-9 px-6">
        <div className="my-auto">{title}</div>
      </div>
    </div>
  )
}