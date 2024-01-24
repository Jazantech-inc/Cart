import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/main.css"
import App from './App';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <ConfigProvider 
        theme={{
            components: {
                Button : {
                  colorPrimary: "#9B1111",
                  colorPrimaryHover: "#A53434",
                  borderRaduis: '2px',
                }
            },
            token: {
                borderRadius: "2px",
                colorPrimary: "crimson",
            }
        }}>
      <App />
      </ConfigProvider>
  </Provider>

);

