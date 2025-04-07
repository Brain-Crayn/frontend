import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./pages.css";

const DynamicForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
    diploma: "",
    gpa: "",
    subject: "",
    message: "",
    file: null,  // Image or PDF URL will be stored here
    action: "",  // New field to store the selected option (e.g., "contribute", "question", etc.)
  });
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Fetch CSRF token on component mount
    // getCSRFToken().then((csrftoken) => {
	// 	Cookies.set("csrftoken", csrftoken);  // Store the token in a cookie
	// });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  // Add this function to handle changes in the "What would you like to do?" dropdown
  const handleActionChange = (e) => {
    setSelectedOption(e.target.value);
    setFormData({
      ...formData,
      action: e.target.value,  // Update the action field in formData
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check if file type is valid (PDF or image)
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        setFormData({
          ...formData,
          file: file,  // Store the file locally for now
        });
      } else {
        alert("Please upload a valid image or PDF file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data to send to Django
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("school", formData.school);
    formDataToSend.append("diploma", formData.diploma);
    formDataToSend.append("gpa", formData.gpa);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("file", formData.file); // Send the file as well
    formDataToSend.append("action", formData.action); // Include the action field

    // API URL for the Django backend
    const apiUrl = import.meta.env.VITE_API_URL;

	const csrfToken = await getCSRFToken();  // Get the CSRF token from the cookie

    // VERIFY TOKEN
    // console.log("CSRF Token:", csrfToken);

    await fetch(`${apiUrl}/contributeRequest/requestform/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken,  // CSRF token from the cookie
      },
      body: formDataToSend,
	  credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // console.log("SUCCESS:", data);
        setSubmitMessage("Your form has been successfully submitted!");

        // Reset form data after successful submission
        setFormData({
          fullName: "",
          email: "",
          school: "",
          diploma: "",
          gpa: "",
          subject: "",
          message: "",
          file: null,
          action: "",  // Reset the action field
        });

        setSelectedOption("");  // Reset the selected option

        // Reset the success message after 3 seconds
        setTimeout(() => {
          setSubmitMessage("");
        }, 3000);
      })
      .catch((error) => {
        console.error("FAILED:", error);
        setSubmitMessage("There was an error submitting your form. Please try again.");
      });
  };

  const getCSRFToken = async () => {
    // console.log("Fetching CSRF token...");
	const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/getCSRFToken/`, {
		method: "GET",
		credentials: "include",
	  });
    const data = await response.json();
    // DEBUG - PRINT TOKEN
    // console.log(data.csrfToken);
    return data.csrfToken;  // Use this token in your requests
};

  const renderAdditionalFields = () => {
    switch (selectedOption) {
      case "contribute":
        return (
          <>
            <div className="form-group">
              <label htmlFor="diploma">What diploma is your study guide for?</label>
              <select
                id="diploma"
                name="diploma"
                value={formData.diploma} // Bind value
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="AP">AP</option>
                <option value="IB">IB</option>
                <option value="High School">High School</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="gpa">Your current GPA:</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={formData.gpa} // Bind value
                onChange={handleChange}
                placeholder="Enter your GPA"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="school">What school do you go to?</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school} // Bind value
                onChange={handleChange}
                placeholder="Enter your school name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">What subject does your study guide cover?</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject} // Bind value
                onChange={handleChange}
                placeholder="Enter the subject"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload your study guide (PDF, write your name, subject, and units):</label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                required
              />
            </div>
          </>
        );
      case "question":
        return (
          <>
            <div className="form-group">
              <label htmlFor="school">What school do you go to?</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school} // Bind value
                onChange={handleChange}
                placeholder="Enter your school name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your question:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message} // Bind value
                rows="5"
                onChange={handleChange}
                placeholder="Enter your question"
                required
              />
            </div>
          </>
        );
      case "join":
        return (
          <div className="google-form">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfhloWZ-xwWNjJJNQ6XRpYPTGEIbouvu48qUxkg34obpUKQiw/viewform?embedded=true"
              width="640"
              height="1091"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Join Form"
            >
              Loading…
            </iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Join Us or Contribute!</h1>
        <div className="form-group">
          <label htmlFor="fullName">First and Last Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName} // Bind value
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email} // Bind value
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="action">What would you like to do?</label>
          <select
            id="action"
            name="action"
            value={selectedOption} // Bind value
            onChange={handleActionChange}  // Call the new handler
            required
          >
            <option value="">Select an option</option>
            <option value="contribute">Contribute a Study Guide</option>
            <option value="question">Ask a Question</option>
            <option value="join">Join the Club</option>
          </select>
        </div>
        {renderAdditionalFields()}
        <button type="submit">Submit</button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default DynamicForm;
