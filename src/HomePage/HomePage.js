import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Chart1 from '../Charts/Chart1'
import Chart2 from '../Charts/Chart2'
import Chart3 from '../Charts/Chart3'
import DatePicker from '../Calender/DatePicker'
import { apiHelper } from '../_helpers/apiHelper';
import './HomePage.css'

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            chart1data:{},
            chart2data:{},
            chart3data:{},
            newstartDate:"",
            newendDate:"",
            isFetching:false
        }


    }
     updateChartdata=async()=>{
         if(this.state.newstartDate !== "" || this.state.newendDate !==""){
             this.setState({isFetching:true})
        let chartdata1;
        let chartdata2;
        let chartdata3;
        let urlarr=[
            {
                url:"https://sigviewauth.sigmoid.io/api/v1/getData",
                chartNumber:1
            },
            {
                url:"https://sigviewauth.sigmoid.io/api/v1/getData",
                chartNumber:2
            },
            {
                url:"https://sigview.sigmoid.io/api/v1/getData",
                chartNumber:3
            }
        ]
         chartdata1 =await apiHelper("https://sigviewauth.sigmoid.io/api/v1/getData",this.state.newstartDate,this.state.newendDate,1),
            chartdata2 =await apiHelper("https://sigviewauth.sigmoid.io/api/v1/getData",this.state.newstartDate,this.state.newendDate,2),
            chartdata3 =await apiHelper("https://sigview.sigmoid.io/api/v1/getData",this.state.newstartDate,this.state.newendDate,3)
            
       this.setState({
        chart1data:chartdata1,
        chart2data:chartdata2,
        chart3data:chartdata3,
        isFetching:false
       })
    }
    }
     componentDidMount() {
        //this.props.getUsers();
        this.updateChartdata();
     
    }
componentDidUpdate(prevProps,prevState){
if(prevState.newstartDate !== this.state.newstartDate || prevState.newendDate !== this.state.newendDate ){
    this.updateChartdata();
}
}

 initdate = (startdate, enddate) => {
     this.setState({
         newstartDate:Math.floor(new Date(startdate._d).getTime() / 1000.0) * 1000,
         newendDate:Math.floor(new Date(enddate._d).getTime() / 1000.0) * 1000
     })
   
  };

selectDateRange = (daterange) => {
    
        if (daterange.end._d) {
          this.setState({
           newstartDate: Math.floor(new Date(daterange.start._d).getTime() / 1000.0) * 1000,
           newendDate: Math.floor(new Date(daterange.end._d).getTime() / 1000.0) * 1000
          });
      
        }
      };
    render() {
        console.log('chart1',this.state.chart1data)
        const { user, users } = this.props;
        const {chart1data,chart2data,chart3data,isFetching}=this.state
        return (
            <div className="col-md-12">
              
              <p>
                    <Link to="/login">Logout</Link>
                </p>
                <div className="col-md-12 ">
                <DatePicker selectDateRange={this.selectDateRange} initdate={this.initdate} />
                </div>
                <div className="col-md-12 ">
                {isFetching ? 
               <h4 className="loader">Updating<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></h4>
            :''}
            </div>
                <div className="col-md-12">
                <Chart1 chartData={chart1data} />
                </div>
                <div className="col-md-12">
                <Chart2 chartData={chart2data} />
                </div>
                <div className="col-md-12">
                <Chart3 chartData={chart3data} />
                </div>

            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };