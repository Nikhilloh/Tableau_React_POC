
import  React, {Component}  from  'react';
import CoolTabs from 'react-cool-tabs';

class Content1 extends Component {
  render() {
    return <div>
      this is Content1
    </div>
  }
}
class Content2 extends Component {
  render() {
    return <div>
      this is Content2
    </div>
  }
}

export  default  class  Example  extends  React.Component {
    render() {
       return (
         <div>
             <CoolTabs
               tabKey={'1'}
               style={{ width:  550, height:  500, background:  'white' }}
               activeTabStyle={{ background:  'red', color:  'white' }}
               unActiveTabStyle={{ background:  'green', color:  'black' }}
               activeLeftTabBorderBottomStyle={{ background:  'blue', height:  4 }}
               activeRightTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
               tabsBorderBottomStyle={{ background:  'orange', height:  4 }}
               leftContentStyle={{ background:  'lightgreen' }}
               rightContentStyle={{ background:  'lightblue' }}
               leftTabTitle={'Left title'}
               rightTabTitle={'Right title'}
               leftContent={<Content1/>}
               rightContent={<Content2/>}
               contentTransitionStyle={'transform 0.6s ease-in'}
               borderTransitionStyle={'all 0.6s ease-in'}/>
         </div>
    );
    }}