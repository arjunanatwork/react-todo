import React from 'react';

const SwitchProjectDropdownItem = ({ project, changeProject}) => {
    return (
        <a href="#" className="dropdown-item" onClick={() => changeProject(project.id)}>{project.name}</a>
    )
};

export default SwitchProjectDropdownItem;
