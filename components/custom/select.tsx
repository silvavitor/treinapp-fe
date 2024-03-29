export type SelectOptions = {
  value: string,
  text: string,
}

type SelectProps = {
  onChange: any,
  options: SelectOptions[]
}

export default function Select({ onChange, options }: SelectProps) {
  return (
    <select 
      onChange={onChange} 
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {options.map((option, i) => (
        <option 
          key={i} 
          value={option.value}
          className=""
        >{option.text}</option>
      ))}
    </select>
  )
}
