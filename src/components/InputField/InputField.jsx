import { forwardRef } from "react"

const InputField = ({
  label = '',
  type = 'text',
  placeholder = '',
  className = '',
  ...props
}, ref) => {
  return <div>
    <label className="inline-block mb-1 pl-1">{label}</label>
    <input type={type}
      placeholder={placeholder}
      ref={ref}
      {...props} />
  </div>;
};

export default forwardRef(InputField);