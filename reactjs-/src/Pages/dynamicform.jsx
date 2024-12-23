import React, { useState } from "react";
import emailjs from "emailjs-com";
import { CloudinaryContext, Image, Video, Transformation } from 'cloudinary-react';
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
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file.type === "application/pdf") {
        // Cloudinary Upload Configuration for PDF
        const uploadPreset = "ml_default"; // Replace with your Cloudinary upload preset

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        // Upload the PDF file
        fetch("https://api.cloudinary.com/v1_1/dbzvjueuy/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("PDF uploaded:", data);
            setFormData({
              ...formData,
              file: data.secure_url, // Save the uploaded PDF URL
            });
          })
          .catch((err) => {
            console.error("Error uploading PDF:", err);
          });
      } else if (file.type.startsWith("image/")) {
        // Cloudinary Upload Configuration for Images
        const uploadPreset = "ml_default"; // Replace with your Cloudinary upload preset

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        // Upload the Image file
        fetch("https://api.cloudinary.com/v1_1/dbzvjueuy/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Image uploaded:", data);
            setFormData({
              ...formData,
              file: data.secure_url, // Save the uploaded image URL
            });
          })
          .catch((err) => {
            console.error("Error uploading image:", err);
          });
      } else {
        alert("Please upload a valid image or PDF file.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      fullName: formData.fullName,
      email: formData.email,
      school: formData.school,
      diploma: formData.diploma,
      gpa: formData.gpa,
      subject: formData.subject,
      message: formData.message,
      file: formData.file, // Add file URL (image or PDF) to the email data
    };

    emailjs
      .send(
        "service_xwoq3ao", // Replace with your EmailJS service ID
        "template_ubixrph", // Replace with your EmailJS template ID
        emailData,
        "zOnQXPVJOwRpFda7C" // Replace with your EmailJS public API key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
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
          });

          setSelectedOption(""); // Reset the selected option

          // Reset the success message after 3 seconds
          setTimeout(() => {
            setSubmitMessage("");
          }, 3000);
        },
        (error) => {
          console.error("FAILED...", error);
          setSubmitMessage("There was an error submitting your form. Please try again.");
        }
      );
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
              <label htmlFor="file">Upload your study guide (PDF):</label>
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
            onChange={(e) => setSelectedOption(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="contribute">Contribute a Study Guide</option>
            <option value="question">Ask a Question</option>
            <option value="join">Join the Club</option>
          </select>
        </div>
        {renderAdditionalFields()}
        <div className="form-group">
          <label htmlFor="file">Upload your image or PDF:</label>
          <input
            type="file"
            name="file"
            onChange={handleFileUpload}
            accept="image/*,application/pdf"
          />
        </div>
        <button type="submit">Submit</button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default DynamicForm;