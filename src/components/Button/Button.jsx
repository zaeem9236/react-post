
const Button = ({
    btnText,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) => {

    return <button
    onClick={()=> alert('abcd')}
        className={`${bgColor} ${textColor} hover:bg-blue-700 font-bold py-2 px-4 rounded ${className}`} {...props}>
        {btnText}
    </button>

};

export default Button;