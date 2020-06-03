import React from "react";
import { Layout } from "antd";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "./Styles/App.css";
const { Content } = Layout;

function App() {
  return (
    <div className='App'>
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar />
        <Layout className='site-layout'>
          <TopBar />
          <Content style={{ margin: "0 16px" }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
