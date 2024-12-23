import './pages.css'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import DynamicForm from "./dynamicform.jsx";


export const Form = () => {

    return (
        <>
            <div className="backButton" onClick={() => window.history.back()}>
                ← Back
            </div>

            <div>
                <DynamicForm />
            </div>

        </>
    )

}