import React from 'react';
import { useDispatch } from 'react-redux';
import { setIsChatbox } from '../reducers/chatboxSlice';
import { setIsApiKey,setApiKey } from '../reducers/apiSlice'; 


function WelcomeTemplate() {
    const dispatch = useDispatch();

    const onGetStarted = async () => {
        let apiKey = await window.electronAPI.checkApiKey()
        console.log(apiKey)
        if(apiKey===false) dispatch(setIsApiKey(false))
        else{
            dispatch(setIsApiKey(true))
            dispatch(setApiKey(apiKey))
            dispatch(setIsChatbox(true))
        }
        
    };

    return (
        <div style={{ fontFamily: '"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#ddd', padding: '0 20px', background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <header style={{ textAlign: 'center', padding: '20px 0', boxSizing: 'border-box' }}>
                <h1 style={{ fontSize: '3em', color: '#fff', letterSpacing: '1.5px' }}>Template Generator</h1>
                <p style={{ fontSize: '1.2em', color: '#ccc' }}>Streamlining React Component Development</p>
            </header>

            <main style={{ maxWidth: '800px', width: '100%', margin: '20px auto', backgroundColor: '#333', borderRadius: '15px', padding: '40px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
                <h2 style={{ fontSize: '2em', color: '#fff', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Introducing Template Generator</h2>
                <p style={{ fontSize: '1.1em', lineHeight: '1.6', textAlign: 'justify', color: '#ccc' }}>
                    Template Generator is a LLM-based application that streamlines your React component development process like never before!
                    With Template Generator, you can now transform a simple text prompt into a fully-fledged React component template in just a matter of seconds!
                </p>

                <section style={{ marginTop: '40px' }}>
                    <h3 style={{ fontSize: '1.5em', color: '#fff', marginTop: '20px', fontWeight: 'bold' }}>🌟 Key Features:</h3>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', boxSizing: 'border-box' }}>
                        <li style={{ fontSize: '1.2em', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                            <span style={{ backgroundColor: '#4ca1af', borderRadius: '50%', width: '25px', height: '25px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: '10px' }}>1️⃣</span>
                            <span>Effortless Template Creation: Simply input your component's specifications, and let Template Generator do the heavy lifting for you.</span>
                        </li>
                        <li style={{ fontSize: '1.2em', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                            <span style={{ backgroundColor: '#4ca1af', borderRadius: '50%', width: '25px', height: '25px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: '10px' }}>2️⃣</span>
                            <span>Instant Download: Generate your components and download them instantly for use in your projects.</span>
                        </li>
                        <li style={{ fontSize: '1.2em', margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                            <span style={{ backgroundColor: '#4ca1af', borderRadius: '50%', width: '25px', height: '25px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: '10px' }}>3️⃣</span>
                            <span>Customizable Templates: Tailor the templates to fit your specific needs and project requirements effortlessly.</span>
                        </li>
                    </ul>
                </section>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button
                        style={{
                            backgroundColor: '#4ca1af',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            fontSize: '1.1em',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            fontWeight: 'bold'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3b6978'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4ca1af'}
                        onClick={onGetStarted}
                    >
                        Get Started
                    </button>
                </div>
            </main>
            
            <style jsx="true">{`
                @media (max-width: 768px) {
                    header h1 {
                        font-size: 2.5em;
                    }
                    header p {
                        font-size: 1em;
                    }
                    main {
                        padding: 20px;
                    }
                    main h2 {
                        font-size: 1.5em;
                    }
                    main p {
                        font-size: 1em;
                    }
                    section h3 {
                        font-size: 1.2em;
                    }
                    ul li span:last-child {
                        font-size: 1em;
                    }
                }

                @media (max-width: 480px) {
                    header h1 {
                        font-size: 2em;
                    }
                    header p {
                        font-size: 0.9em;
                    }
                    main {
                        padding: 10px;
                    }
                    main h2 {
                        font-size: 1.2em;
                    }
                    main p {
                        font-size: 0.9em;
                    }
                    section h3 {
                        font-size: 1em;
                    }
                    ul li span:last-child {
                        font-size: 0.9em;
                    }
                }
            `}</style>
        </div>
    );
}

export default WelcomeTemplate;
