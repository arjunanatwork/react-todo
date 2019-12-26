import React from 'react';
import {connect} from "react-redux";

import {toggleAddProjectModalHidden} from "../../redux/project/project.action";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AddProjectSidebar = ({toggleAddProjectModalHidden}) => (
    <p onClick={toggleAddProjectModalHidden}>
        <span className="icon has-margin-right-5">
        <FontAwesomeIcon icon="plus"/></span>Add Project
    </p>
);

const mapDispatchToProps = dispatch => ({
    toggleAddProjectModalHidden : () => dispatch(toggleAddProjectModalHidden())
});
export default connect(null, mapDispatchToProps)(AddProjectSidebar);
