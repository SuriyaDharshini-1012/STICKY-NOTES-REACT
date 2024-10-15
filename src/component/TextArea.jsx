import react from 'React';

const TextArea=({placeholder,value,onChange,className})=>{

    return(
        <div>
            <textarea
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}

            
            ></textarea>
        </div>
    )

}
export default TextArea;