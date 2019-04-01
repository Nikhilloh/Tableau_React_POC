
import React, { Component } from 'react';  
import tableau from 'tableau-api';  
  
  
class Test extends Component {  
  componentDidMount() {  
    this.initViz()  
  }  
  
  
  initViz() {  
    const vizUrl = 'https://public.tableau.com/views/WorldIndicators/GDPpercapita';  
    const vizContainer = this.vizContainer;
    let viz = new window.tableau.Viz(vizContainer, vizUrl)
  }  
  
  render() {  
    return (  
      <div>
      <div ref={(div) => { this.vizContainer = div }}></div>
      </div> 
    )  
  }  
}  
  
  
export default Test;  