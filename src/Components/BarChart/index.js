import React, { Component } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import {motion} from "framer-motion";
import Tooltip from '@material-ui/core/Tooltip';
import moment from "moment";  

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import _ from "lodash";


import GetAppIcon from '@material-ui/icons/GetApp';

const Container = styled.div`
   display          : flex;
   height          : 100%;
   width           : 100%:
   border-radius   : 2px;
   justify-content : center;
   padding         : 10px;
   flex-direction  : column;
`


const BarsContainer = styled.div`
  display         : flex;
  width           : 100%;
  height          : 100%;
  align-items     : flex-end;
  justify-content : flex-end
  flex-direction  : row;
  padding         : 2px;
`;


const BarsContainerOuter = styled(motion.div)`
  display: flex;
  width  : 100%;
  height : 100%;
  flex-wrap : nowrap;
  overflow-x : auto;
  align-items : flex-end;
  justify-content : space-between;
  flex-direction: row;
  border-bottom: 1px solid white;
  border-left  : 1px solid white;
  padding      : 2px;
  padding-top  : 10px;
  &::-webkit-scrollbar {
    width        : 3px;
    height       : 9px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #1d252d;
    width: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
  
const Bar = styled(motion.div)`
  margin-left     : 2px;
  margin-right    : 2px;
  height          : ${props => props.height};
  display         : flex;
  min-width           : 25px;
  width           : 90%;
  align-self      : flex-end;
  border          : none;
  flex            : 0 0 auto;
  border-radius   : 1px 1px 1px 1px;
  background-color: #dd7171;
  margin-top      : 2px;
`;


const BottomAxis = styled.div`
  width: 100%;
  height: 3px;
  background-color: black;

`;
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.02,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};


const TimeMarker = styled.div`
  display     : flex;
  font-size   : 12px;
  font-weight : 400; 
  opacity: 0.8;
`;

const GraphIntervalSetter = styled(motion.div)`
  display : flex;
  flex-direction : column;
  padding : 5px;
  use-select : none;
  width : fit-content;
  margin-right: 5px;
  align-items :flex-start;
`;

const IntervalButton = styled(motion.div)`
  display           : flex;
  height            : 40px;
  width             : 45px;
  opacity           : 0.8;
  padding           : 10px;
  user-select       : none;
  border-radius     : 2px;
  background-color  : rgba(255, 255, 255, 0.1);
  display           : flex;
  align-items       : center;
  justify-content   : center;
  margin            : 2px;
  font-weight       : 450;
  letter-spacing    : 3px;
`;

const IntervalButtonContainer = styled.div`
  width           : auto;
  height          : auto;
  display         : flex;
  flex-direction  : row;
  justify-content : center;
  align-items     : center;
`;

const IntervalDisplayContainer = styled.div`
  width         : auto;
  height        : auto;
  display       : flex;
  font-family   : Montserrat;
  font-size     : 12px;
  color         : white;
  font-weight   : 450;
  opacity       : 0.7;
`;  
const TimeSlicerContainer = styled.div`
  width           : fit-content;
  display         : flex;
  flex-direction  : column;
  height          : auto;
  justify-content : flex-start;
  align-items     : flex-start;
`;  

const ToolSetContainer = styled.div`
  width  : auto;
  height : auto;
  max-width: fit-contents;
  display : flex;
  flex-direction : row;
  background-color : #ffffff0f;
  border-radius : 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding : 10px;


`;


const ToolSetContainerSub = styled.div`
  padding : 10px;
  display : flex;
  justify-content : center;
  flex-direction : column;
`;


const DownloadButtonContainer = styled.div`
  display : flex;
  flex-direction: row;
`;
//display:"flex", color:"white", fontSize:"10px", fontFamily:"Montserrat", fontWeight:"200", alignItems:"center", justifyContent:"space-between"
const GraphContainerHeader = styled.div`
  
  display         : flex;
  color           : white;
  font-size       : 10px;
  font-family     : Montserrat;
  font-weight     : 300;
  align-items     : center;
  justify-content : space-between;
  padding         : 15px;

`;

//style={{color:"white", fontFamily:"Montserrat", fontWeight:"400px", fontSize:"14px", justifySelf:"start"}}

const GraphHeader = styled.div`
  color       : white;
  font-family : Montserrat;
  font-size   :20px;
  justify-self: start;
  align-self  : flex-start;
  font-weight : 300;
  padding     : 15px;
  font-size   : 20px;
 
`;

const GraphHeaderInfo = styled.div`
  display : inline-flex;

`;

//height:"100%", width:"100%", display:"flex", flexDirection:"column", paddingBottom:"30px"
const GraphContainer = styled.div`
  height: 100%;
  width : 100%;
  display: flex;
  flex-direction : column;

`;
const intervalSet = [
  {
    value : "1",
    tag : "All",
    title : "Interval of 1 time unit."
  },
  {
    value : "5",
    tag:  "5",
    title : "Interval of 5 time units."
  },
  {
    value : "10",
    tag : "10",
    title : "Interval of 10 time units"
  },
  {
    value : "15",
    tag : "15",
    title : "Interval of 15 time units."
  }
]

const downloadButton = {
  title_xlxs : "Download xlxs",
  title_csv  : "Dowload csv"
};


const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundCoblor: "black",
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: "Montserrat"
  },
}))(Tooltip);

const RRange = styled(InputRange)`
  backgroundColor : pink;
`;

const RangeStyling = styled.div`
  display : flex;
  height  : 30px;
  width   : 250px;
  border-radius  : none;
  justify-content : center;
  align-items     : center;
  margin          : 15px;
 
`;
const spring = {
  duration:0.1,
  type: "spring",
  damping: 13,
  stiffness: 200
}
export default class PratBar extends Component {
    constructor() {
        super();
        this.state={
          colors: ["#667ef0", "#dd7171", "#ff7829", "#ff2525", "#f225ff", "#25ff86"  ],
          data  : [{data : [{x:0, y:0}], maxValue: 2}],
          toggle: true,
          ready : true,
          maxCount : 20,
          initialData: [{data : [{}]}],
          minDate    : "",
          maxDate    : "",
          interval   : 5,
          dataLength : 0,
          sampledLength : 0,
          domain     : [0, 10],
          dataSetType : 0,
        }
    }


    componentDidMount() {

      console.log(this.props.dataSet);
      if (this.props.dataSet[0]["data"].length === 0) {
        console.log(this.props.dataSet);
        console.log("No data error!");
        return;
      }
      console.log(this.props.dataSet)
      this.setState({
        interval      : 5,
        initialData   : this.props.dataSet,
        sampledLength : (this.props.dataSet[0]["data"].length / 5),
        title         : this.props.graphTitle,
        cabinetName   : this.props.cabinetName,
        dataLength    : this.props.dataSet[0]["data"].length ,
        domain        : [0, this.props.dataSet[0]["data"].length],
        sliceLength : this.props.dataSet[0]["data"].length,
        dataSetType   : this.props.dataSetType
      }, () => {
        this.setState({
          data: this.cleanDataLinear(this.props.dataSet),
          
          ready : false
        })
      });
      
    }
  
    componentWillReceiveProps(nextProps) {
  
      if (nextProps.dataSet[0]["data"].length === 0) {
        console.log("No data error!");
        return;
      }
      


      let interval = 5;
      
  
      this.setState({
        interval      : interval,
        title         : nextProps.graphTitle,
        initialData   : nextProps.dataSet,
        sampledLength : (nextProps.dataSet[0]["data"].length / 5 ),
        dataLength    : nextProps.dataSet[0]["data"].length ,
        cabinetName   : nextProps.cabinetName,
        domain        : [0, nextProps.dataSet[0]["data"].length],
        sliceLength : nextProps.dataSet[0]["data"].length,
        dataSetType   : nextProps.dataSetType
      }, () => {
        this.setState({
          data: this.cleanDataLinear(nextProps.dataSet),
          sliceLength : this.state.dataLength
        })
      });
    }

   cleanDataLinear = ( data ) => {
    let interval = 0;
    if(this.state.interval === "1" || this.state.dataSetType ) {
      interval = 1;
    }
    else {
      interval = Math.round(this.state.sliceLength / this.state.interval);
    }

    let bbuffer = [];
    for(let i = 0; i < data.length; i++) {
      let buffer   = [];
      let outerBuf = {};
      let innerBuf = {};
      for(let j = this.state.domain[0]; j < this.state.domain[1]; j++) {
        if ( j % interval === 0) { // Every nth interval.
          innerBuf = {
            x : new Date( data[i]["data"][j]["x"] ).toLocaleString('default', {month:'short', day:'numeric', hour:'numeric', minute:'numeric'}),
            y : data[i]["data"][j]["y"]
          }
          buffer.push( innerBuf );
        }
      }
      outerBuf = {
        pname : data[i]["id"],
        data : buffer,
        maxValue : data[i]["max_count"]
      }
      bbuffer.push( outerBuf );
    };

    if(bbuffer[0]["data"].length === 0) {
      console.log("No date to slice");
      return [{data:[{x:0,y:0}], maxValue:10}];
    }

    this.setState({
      minDate : (bbuffer[0]["data"][0]["x"]),
      maxDate : (bbuffer[0]["data"][ bbuffer[0]["data"].length - 1 ]["x"])
    });
    return bbuffer;
  }

  handleTootip = (data) => {
    console.log(data);
  }

  handleSliderAfterChange = (e) => {
    let minDomain = 0;
    let maxDomain = 0;
    if (e["min"] < 1) {
      minDomain = 0;
    }
    else {
      minDomain = e["min"]
    }

    if (e["max"] > this.state.dataLength) {
      maxDomain = this.state.dataLength
    }
    else {
      maxDomain = e["max"]
    }
    

    try {
      let slicedData = _.slice(this.state.initialData[0]["data"], minDomain, maxDomain);
      //This contains the sliced data, within the date range, assigns the minDate, maxDate of the domains.
      this.setState({
        domain : [minDomain, maxDomain],
        sliceLength : slicedData.length,
        minDate    : new Date(slicedData[0]["x"]).toLocaleString('default', {month:'short', day:'numeric', hour:'numeric', minute:'numeric' }),
        maxDate    : new Date(slicedData[ slicedData.length - 1 ]["x"]).toLocaleString('default', {month:'short', day:'numeric', hour:'numeric', minute:'numeric' })
      }, () => {
        this.setState({
          data : this.cleanDataLinear( this.state.initialData ),
        });
      });
    }
    catch(err) {
      console.log(err);
    }
    
  }

  handleSliderChange = (e) => {
    let minDomain = 0;
    let maxDomain = 0;
    if (e["min"] < 1) {
      minDomain = 0;
    }
    else {
      minDomain = e["min"]
    }

    if (e["max"] > this.state.dataLength) {
      maxDomain = this.state.dataLength
    }
    else {
      maxDomain = e["max"]
    }
    this.setState({
      domain : [minDomain, maxDomain]
    });
    try {
      let slicedData = _.slice(this.state.initialData[0]["data"], minDomain, maxDomain);
      this.setState({
        sliceLength: slicedData.length,
        minDate    : new Date(slicedData[0]["x"]).toLocaleString('default', {month:'short', day:'numeric', hour:'numeric', minute:'numeric' }),
        maxDate    : new Date(slicedData[ slicedData.length - 1 ]["x"]).toLocaleString('default', {month:'short', day:'numeric', hour:'numeric', minute:'numeric' })
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  handleInterval = (index) => {
    if(this.state.dataSetType) {
      //EoD Data set detected.

      console.log("No interval change in EOD state");
      return;
    };

    if(this.state.sliceLength > 350 && index.value === "1") {
      //Slice size is too big(>350 points). Causes performance issues on some browsers.

      console.log("No interval change in EOD state");
      return;
    };

    let interval = index.value;
    
    this.setState({
      interval : interval,
    }, () => {
      this.setState({ 
        data : this.cleanDataLinear( this.state.initialData ),
        sampledLength :(this.state.sliceLength / this.state.interval)
      });
    })
  };


  handleDownload = ( type ) => {
    this.props.handleExport( type )
  }
    renderBarInGroups = (buffer) => {
      console.log(buffer);
      let renderDivs = [];
      for(let i = 0; i <buffer[0]["data"].length; i++ ) {
        
        renderDivs.push(
          <div style={{display:"flex", flexDirection:"column", height:"100%", width:"100%", marginLeft:"10px", marginRight:"10px", alignItems:"center"}}>
            <div style={{width : "100%", height:"100%", marginLeft:"10px", marginRight:"10px", padding:"1px", flexDirection:"row", display:"flex", borderBottom:"1px solid white"}}>
              {
                buffer.map((value, index) => ( 
                  
                    <div style={{width: "100%", height:"auto", display:"flex", flexDirection:"row",  margin:"1px"}}>
                      <LightTooltip title={( value["data"][i]["x"]) +" : "+ value["data"][i]["y"] } placement="top-start">
                      {
                        buffer[0]["data"].length < 40
                        ?
                        <Bar
                          style= {{ 
                            height: (value["data"][i]["y"]/22) * 100 + "%",
                            backgroundColor :this.state.colors[index],
                            transition :   "height 0.2s ease-out",
                            transform  : "scaleY(1)",
                            transformOrigin : "bottom"
                          }}
                          whileHover={{backgroundColor:"#71ddb0"}}/>
                        :
                        <Bar
                          style= {{ 
                            height: (value["data"][i]["y"]/22) * 100 + "%",
                            backgroundColor :this.state.colors[index],
                          }}
                          whileHover={{backgroundColor:"#71ddb0"}}/>
                      }
                      </LightTooltip>
                    </div>
                  )
                )
              }
              </div>
              <div style={{display:"flex", height:"10px", width:"auto", color:"white", fontSize:"8px", fontFamily:"Montserrat", justifyContent:"center"}}>
              {
                ( buffer[0]["data"][i]["x"] )
              }
              </div>
          </div>
          )  
        }
      return renderDivs;
    }

    render() {
        return (    
          <GraphContainer>
            <GraphContainerHeader> 
              <GraphHeader>
                { this.props.header } 
              </GraphHeader>
              <ToolSetContainer>
                {
                  !this.state.dataSetType ? 
                    <GraphIntervalSetter>
                    <IntervalButtonContainer>
                      {
                        intervalSet.map((value, index) => (
                        <LightTooltip key={index} title={value.title} placement="top-start">
                          <IntervalButton 
                            onClick={() => {this.handleInterval(value)}}
                            animate={this.state.interval == value.value ? {backgroundColor:"#58ecb5", color:"black"} :{backgroundColor : "#3b4349", color:"white", opacity:0.8}}
                            
                            whileHover={{backgroundColor:"#58ecb5", color: "black"}} 
                            transition={{duration : 0.1}}
                            >
                            +{value.tag}
                          </IntervalButton>
                        </LightTooltip>
                        ))
                      }
                    </IntervalButtonContainer>
                    <IntervalDisplayContainer>
                      Sampling {Math.round(this.state.sliceLength / this.state.interval)} points out of {this.state.sliceLength} points.
                    </IntervalDisplayContainer>
                  </GraphIntervalSetter>
                  :
                  <ToolSetContainerSub>
                    <LightTooltip
                        title={downloadButton.title_xlxs}
                        placement="left"
                      >  
                        <IntervalButton
                          onClick={()=>this.handleDownload( "xlsx" )}
                          whileHover={{backgroundColor:"#58ecb5", color: "black"}} 
                          transition={{duration : 0.1}}
                        >
                          <GetAppIcon/>
                        </IntervalButton>
                    </LightTooltip>
                    <LightTooltip
                        title={downloadButton.title_csv}
                        placement="left"
                      >  
                        <IntervalButton
                          onClick={()=>this.handleDownload( "csv" )}
                          whileHover={{backgroundColor:"#58ecb5", color: "black"}} 
                          transition={{duration : 0.1}}
                        >
                          <GetAppIcon/>
                        </IntervalButton>
                    </LightTooltip>
                  </ToolSetContainerSub>
                }
                
                <TimeSlicerContainer>
                  <RangeStyling>
                    <RRange
                      draggableTrack
                      maxValue={this.state.dataLength}
                      minValue={0}
                      allowSameValues={false}
                      value={{min:this.state.domain[0], max:this.state.domain[1]}}
                      onChange={value => this.handleSliderChange(value)}
                      onChangeComplete={value => this.handleSliderAfterChange(value)} />
                  </RangeStyling>
                  <div style={{marginTop:"5px", width: "100%", display : "flex", fontSize:"12px", fontFamily:"Montserrat", fontWeight:"450", wordSpacing:"5px"}}>
                      Showing { this.state.sliceLength } points out of {this.state.dataLength}
                  </div>
                  <TimeMarker>
                  <div style={{fontWeight:"450", marginRight:"2px"}}>From:  {(this.state.minDate)} </div > <div style={{fontWeight:"450", marginLeft:"2px"}} >  To: {(this.state.maxDate)}</div>
                </TimeMarker>
                </TimeSlicerContainer>
                </ToolSetContainer>
            </GraphContainerHeader>
                
            <Container>
              <div style={{display:"flex", width:"100%", height:"100%", flexDirection:"column",padding:"2px"}}>
                <div style={{display:"flex", color:"white", fontSize:"10px", fontFamily:"Montserrat", fontWeight:"450", alignItems:"center", justifyContent:"space-between", }}>
                    Count
                    <div style={{display:"flex", flexDirection:"column", width:"auto", height:"auto", maxHeight:"75px", overflowY:"auto", flexWrap:"nowrap"}}>
                    {
                      this.state.data.map((value, index) =>(
                        <div style={{display:"flex", width:"fit-content", height:"fit-auto", justifyContent:"flex-end", flexDirection:"row", alignItems:"center", color:"white", fontSize:"10px", fontFamily:"Montserrat", padding:"5px"}}>
                          <div style={{display:"flex", width:"7px", height:"7px", borderRadius:"2px", backgroundColor: this.state.colors[index], marginRight:"5px" }}>
                          </div>
                          {value["pname"]}
                      </div>
                      ))
                    }
                    </div>

                </div>
                <div style={{width:"100%", color:"white", height:"100%", display:"flex", flexDirection:"row"}}>
                
                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"22px"}}>
                  {
                    [...Array(22/2 + 1)].map((value, index) => (
                      <div style={{borderTop:"none", borderLeft:"none", borderRight:"non", borderBottom:"1px solid white", width:"15px",fontSize:"10px", opacity:"0.6", height:"auto", color:"white",  display:"flex", padding:"2px", justifyContent : "center", alignItems:"center", fontWeight:"450"}}>
                        { 22- index * 2} 
                      </div>
                    ))
                  }
                </div>
                <BarsContainerOuter >
                {
                    this.renderBarInGroups(this.state.data)
                }
                </BarsContainerOuter>  
                </div>
                <div style={{ display:"flex", flexDirection:"row", color:"white", width:"100%", height:"auto", fontSize:"12px", fontFamily:"Montserrat", fontWeight:"450", justifyContent:"space-between"}}> 
                    <div style={{display:"flex", justifySelf:"center", fontWeight:"400"}}>
                      2019
                    </div>
                    <div style={{display:"flex", justifySelf:"center", fontWeight:"400"}}>
                      Time
                    </div>
                </div>
              </div>
            </Container>
          </GraphContainer> 
        )
    }
}
