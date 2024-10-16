import React from "react";
import plus from "../assets/plus.jfif";
import '../App';

const Sidebar = ({ onColorSelect }) => {
    const colour = ["#ADD8E6", "#FFC0CB", "#4B5320", "#FFFACD", "#C34A2C"];
    
    return (
        <div className="sidebar">
            <img src={plus} alt="add" />
            <ul className="sidebar_list">
                {colour.map((item, index) => (
                    <li
                        key={index}
                        className="sidebar_list_items"
                        style={{ backgroundColor: item, cursor: 'pointer' }}
                        onClick={() => onColorSelect(item)} // Call the function to select color
                    />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
