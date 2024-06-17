import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getCustomer, updateCustomer } from "../components/services/customerApi";
import "./CSS/EditProfile.css";

const EditProfile = () => {
    const [customer, setCustomer] = useState({});
    const [editMode, setEditMode] = useState({});
    const [formData, setFormData] = useState({});
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Mapping object to convert keys to user-friendly labels
    const fieldLabels = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phoneNumber: "Phone Number",
        address: "Address"
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const customerId = localStorage.getItem('customerId');
                const response = await getCustomer(customerId);
                setCustomer(response.data);
                setFormData(response.data); // Initialize formData with fetched data
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };

        fetchCustomer();
    }, []);

    const handleEditClick = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            // Validate fields
            const v1 = formData.firstName.trim() !== '';
            const v2 = formData.lastName.trim() !== '';
            const v3 = formData.email.trim() !== '' && validateEmail(formData.email);
            const v4 = formData.phoneNumber.trim() !== '';
            const v5 = formData.address.trim() !== '';
            
            if (!v1 || !v2 || !v3 || !v4 || !v5) {
                setErrMsg("Please fill in all fields correctly");
                setTimeout(() => {
                    setErrMsg('');
                }, 500);
                return;
            }

            await updateCustomer(formData); // Update customer data
            setCustomer(formData); // Update local state with new form data
            localStorage.setItem('customerId', formData.id);
            localStorage.setItem('firstName', formData.firstName);
            localStorage.setItem('address', formData.address);
            setEditMode({});
            setSuccessMsg('Profile updated successfully!');

            // Display success message for 0.5 seconds before clearing
            setTimeout(() => {
                setSuccessMsg('');
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error("Error updating customer data:", error);
            setErrMsg('Failed to update profile.');

            // Display error message for 0.5 seconds before clearing
            setTimeout(() => {
                setErrMsg('');
            }, 500);
        }
    };

    const handleCancel = () => {
        setFormData(customer); // Reset form data to original customer data
        setEditMode({});
    };

    const validateEmail = (email) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            {errMsg && <p className="error-msg">{errMsg}</p>}
            {successMsg && <p className="success-msg">{successMsg}</p>}
            <form className="profile-form">
                {Object.keys(customer).map((key) => (
                    // Exclude 'userName', 'password', 'id' from editable fields
                    (key !== 'userName' && key !== 'password' && key !== 'id') && (
                        <div key={key} className="form-group">
                            <label htmlFor={key}>{fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            {editMode[key] ? (
                                <input
                                    type={key === 'email' ? 'email' : 'text'} // Use type="email" for email field
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    onBlur={() => setEditMode({ ...editMode, [key]: false })}
                                    required={key === 'email'} // Require email field
                                />
                            ) : (
                                <span>{customer[key]} <FontAwesomeIcon icon={faPencilAlt} className="pencil" onClick={() => handleEditClick(key)} /></span>
                            )}
                        </div>
                    )
                ))}
            </form>
            <div className="form-buttons">
                <button className="save-btn" type="button" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} /> Save
                </button>
                <button className="cancel-btn" type="button" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
