import React from "react";
import { Layout } from 'antd';
import './css/style.css';

import SiderPanel from "./components/SiderPanel";
import MapComponent from "./components/MapComponent1";

const { Content } = Layout;

function App() {
   return (
      <div className="main" >
         <Layout className="main-app" >
         <SiderPanel />
         <Layout>
           {/* <Header style={{ background: '#fff', width: "100vw" }} /> */}
            <Content className="main-map">
               <MapComponent />
            </Content>
         </Layout>
         </Layout>
      </div>
   );
}

export default App;