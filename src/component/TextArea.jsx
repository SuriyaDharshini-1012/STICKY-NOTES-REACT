

const TextArea=({placeholder,value,onChange,className})=>{

    return(
        <div>
            <textarea
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={onChange}

            
            ></textarea>
        </div>
    )

}
export default TextArea;