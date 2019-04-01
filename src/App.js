import React, { Component } from 'react';
import Sidebar from "react-sidebar";
import './App.css';
//import CoolTabs from './React Components/File_Tabs/tabs';
import Header from './React Components/Header/Header';
import Test from './Tableau Components/Tableau-react-1';
import Public_Link from './Tableau Components/Tableau-react-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
     sidebarOpen: true
   };
   this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
     <div className="App">
           <Sidebar
              sidebar={<b>Sidebar content</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
      <Tabs forceRenderTabPanel defaultIndex={1}>
      <Header/>
      
      <TabList>
        <Tab>Dashboard 1</Tab>
        <Tab>Dashboard 2</Tab>
      </TabList>
      <TabPanel>
      <Test/>
      </TabPanel>
      <TabPanel>
      <Public_Link/>       
      </TabPanel>
      </Tabs>
      </div>
    );
  }
}

export default App;
