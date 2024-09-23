import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 30) % 360); // Increment rotation angle
    }, 100); // Adjust the interval duration for desired spinning speed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div style={styles.container}>
      <p style={styles.description}>Please wait while we prepare everything for you.</p>
      <div style={{ ...styles.loader, transform: `rotate(${rotation}deg)` }}></div>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            h1 {
              font-size: 2em;
            }

            p {
              font-size: 1em;
            }

            .loader {
              width: 40px;
              height: 40px;
              border-width: 12px;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 1.5em;
            }

            p {
              font-size: 0.9em;
            }

            .loader {
              width: 30px;
              height: 30px;
              border-width: 8px;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
    color: '#ddd',
    fontFamily: '"Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    textAlign: 'center',
    padding: '2%',
    boxSizing: 'border-box',
  },
  description: {
    fontSize: '1.2em',
    margin: '0.5em',
    color: '#ccc',
    animation: 'fadeIn 2s ease-in-out 1s',
  },
  loader: {
    border: '16px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '16px solid #3498db',
    width: '60px',
    height: '60px',
    animation: 'spin 1.5s linear infinite',
    margin: '2em',
  },
};

export default Loading;
