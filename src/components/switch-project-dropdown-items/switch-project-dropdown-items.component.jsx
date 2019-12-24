import React from 'react';

const SwitchProjectDropdownItem = ({ project, changeProject}) => {
    return (
        <a href="javascript:void(0);" className="dropdown-item" onClick={() => changeProject(project.id)}>{project.name}</a>
    )
};

export default SwitchProjectDropdownItem;