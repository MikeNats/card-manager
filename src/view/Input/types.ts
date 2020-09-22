export type InputProps = {
  id: string,
  type: string,
  name: string
  required?: boolean,
  checked?: boolean
  onChangeHandler: React.EventHandler<any>
  className?: string,
  title: string,
  label?: string,
  placeholder?: string
  error?:boolean;
  errorMessage?:string
  value?: string
  defaultValue?: string
  autoComplete?: string
  maxLength?:number
  onBlur?: React.EventHandler<any>
}    