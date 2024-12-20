import { useNavigate } from 'react-router-dom';

export const StudyGuides = () => {

    const navigate = useNavigate();
    return (

        <>
            <nav style={styles.navbar}>
                <ul style={styles.navList}>
                    <li style={styles.navItem} onClick={() => navigate('/AboutUs')}>About Us</li>
                    <li style={styles.navItem} onClick={() => navigate('/ContactUs')}>Contact Us</li>
                    <li style={styles.navItem} onClick={() => navigate('/Main')}>Main</li>
                </ul>
            </nav>   
            <h1>Study Guides Here</h1>
        </>    
    );
};

const styles = {
    navbar: {
        backgroundColor: '#000000',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between', // Evenly distribute the items
        alignItems: 'center', // Vertically center the items
        borderRadius: '30px', // Uniform rounded edges for all corners
        position: 'fixed',
        top: 0,
        left: 0, // Make sure it starts from the left edge
        right: 0, // Make sure it stretches to the right edge
        width: '100%', // Full width of the viewport
        zIndex: 1000,
        boxSizing: 'border-box', // Ensures padding doesn't affect width
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'space-around', // Distribute the items evenly within the list
        width: '100%', // Ensure the list takes the full width of the navbar
    },
    navItem: {
        color: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    navItemHover: {
        color: '#61dafb',
    },
};