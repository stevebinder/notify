import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';
import { WithHover } from 'src/popup/hocs';

const styles = {
  button: hovered => ({
    background: hovered ? '#2768ef' : '#3b76f1',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '#a9a9a9 0px 0px 9px',
    color: '#fff',
    cursor: 'pointer',
    display: 'block',
    fontSize: '13px',
    outline: 'none',
    padding: '13px 25px',
    transition: 'all 80ms ease-out',
    userSelect: 'none',
  }),
  container: {
    alignItems: 'center',
    background: '#e9e9e9',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  graphics: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '40px',
  },
  icon: {
    fill: '#cacaca',
    height: '60px',
    marginLeft: '10px',
  },
  layout: {
    alignItems: 'center',
    background: '#fff',
    borderRadius: '9999px',
    boxShadow: '0 0 22px #c5c5c5',
    display: 'flex',
    flexDirection: 'column',
    height: '250px',
    justifyContent: 'center',
    padding: '50px',
    width: '250px',
  },
  logo: {
    fill: '#24292e',
    height: '60px',
  },
};

export default () => {
  const { launchAuth } = useContext(Context);
  return (
    <div style={styles.container}>
      <div style={styles.layout}>
        <div style={styles.graphics}>
          <svg style={styles.logo} viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47
              7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
              1.08.58 1.23.82.72 1.21 1.87.87
              2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
              2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04
              2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
              2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
              1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16
              8c0-4.42-3.58-8-8-8z" />
          </svg>
          <svg style={styles.icon} viewBox="0 0 490.1 490.1">
            <path d="M473.15,376.625c22.6-22.6,22.6-59.3,0-81.8c-22.6-22.6-59.3-22.6-81.8,0l-30.7,30.7c-8.5,8.5-22.4,8.5-30.9,0l-54.8-54.9
              c-3.4-3.4-8-5.3-12.7-5.3c-4.8,0-9.4,1.9-12.7,5.3c-15,15-34.9,23.3-56.2,23.3c-21.3,0-41.2-8.3-56.2-23.3l-49.6-49.6l112.3-112.3
              l49.6,49.6c13.8,13.8,22,32.1,23.1,51.5c0.6,9.6,8.5,17,18,17c0.3,0,0.7,0,1.1,0c9.9-0.6,17.5-9.1,16.9-19
              c-1.6-28.3-13.6-54.9-33.6-74.9l-49.6-49.6l5.5-5.5c7-7,7-18.4,0-25.5c-7-7-18.4-7-25.5,0l-35.3,35.3l-61.2-61.2
              c-7-7-18.4-7-25.5,0c-7,7-7,18.4,0,25.5l61.2,61.2l-52.6,52.6l-61.2-61.2c-7-7-18.4-7-25.5,0c-7,7-7,18.4,0,25.5l61.3,61.2
              l-35.3,35.3c-7,7-7,18.4,0,25.5c3.5,3.5,8.1,5.3,12.7,5.3c4.6,0,9.2-1.8,12.7-5.3l5.5-5.5l49.6,49.6
              c21.8,21.8,50.8,33.8,81.6,33.8c24.7,0,48.3-7.7,67.9-22.1l43.1,43.1c11.3,11.3,26.1,16.9,40.9,16.9s29.6-5.6,40.9-16.9l30.7-30.7
              c8.5-8.5,22.4-8.5,30.9,0s8.5,22.4,0,30.9l-30.7,30.7c-10.9,10.9-16.9,25.4-16.9,40.9s6,30,16.9,40.9c3.5,3.5,8.1,5.3,12.7,5.3
              c4.6,0,9.2-1.8,12.7-5.3c7-7,7-18.4,0-25.5c-4.1-4.1-6.4-9.6-6.4-15.4s2.3-11.3,6.4-15.4L473.15,376.625z"
            />
          </svg>
        </div>
        <WithHover>
        {hovered => (
          <button onClick={launchAuth} style={styles.button(hovered)}>
            Launch GitHub Authorization
          </button>
        )}
        </WithHover>
      </div>
    </div>
  );
};