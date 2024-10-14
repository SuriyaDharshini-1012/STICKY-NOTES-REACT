
const Label=(className,children,htmlFor)=>
{
  return (
       <div>
         <label htmlFor={htmlFor} className={className}>
          {children}
        </label>
       </div>
      );

} 
export default Label;