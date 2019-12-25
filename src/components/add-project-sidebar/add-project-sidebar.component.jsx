import React from 'react';
import {connect} from "react-redux";

import {toggleAddProjectModalHidden} from "../../redux/project/project.action";

const AddProjectSidebar = ({toggleAddProjectModalHidden}) => (
    <p onClick={toggleAddProjectModalHidden}>
        <span className="icon has-margin-right-5">
        <i className="fa fa-plus"></i></span>Add Project
    </p>
);

const mapDispatchToProps = dispatch => ({
    toggleAddProjectModalHidden : () => dispatch(toggleAddProjectModalHidden())
});
export default connect(null, mapDispatchToProps)(AddProjectSidebar);
