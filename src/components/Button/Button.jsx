
const Button = ({
    btnText,
    type = 'button',
    bgColor = 'bg-green-600',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    const bgColorSplit = bgColor.split('-')
    return <button
        className={`${textColor} ${bgColor} hover:bg-${bgColorSplit[1]}-${Number(bgColorSplit[2])+200} font-bold py-2 px-4 rounded ${className}`} {...props}>
        {btnText}
    </button>

};

export default Button;
