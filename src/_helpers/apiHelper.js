export const  apiHelper =async(url,startdate,enddate,chartNumber) =>{
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    let email = JSON.parse(localStorage.getItem('email'));
    let response;
    let cm001 = [];
    let CM001_percent = [];
    let advertiserId = [];
    let appSiteId = [];
    let impressions_offered = [];
    let publisherId=[]
    let charttpye=(chartNumber===3? "pie":"table")
    
    let bgc = [
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "red",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
        "blue",
        "green",
        "blue",
        "red",
        "blue",
      ];
    
    let chart1body = [
        {
          _id: "dashboard1516252439345",
          emailId: email,
          orgViewReq: { organization: "DemoTest", view: "Auction" },
          chartObject: {
            metadata: {
              title: "chartobject:1516252439345",
              img_thumbnail: "../img/chart.png",
              chartType: chartNumber===3 ? "pie":"table",
              dataLimit: 50,
            },
            requestParam: {
              granularity: "hour",
              timeZone: { name: "UTC (+00:00)", location: "UTC" },
              dateRange: {
                startDate: startdate.toString(),
                endDate: enddate.toString(),
              },
              xAxis: ["D044"],
              yAxis: ["M002"],
              approxCountDistinct: [],
              specialCalculation: chartNumber===3 ?["CM001"] : [],
              filter: [],
              orderBy:chartNumber===3?{customMetricOrdByList:[{id:"CM001",desc:true}]}: { metricOrdByList: [{ id: "M002", desc: true }] },
              percentCalList: chartNumber===3? [{id:"CM001"}]: [],
            },
          },
        },
      ];
  
      let requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "x-auth-token":token,
        },
  
        body: JSON.stringify(chart1body[0]),
      };
  
      
  
      return await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log('result chart'+chartNumber,res);
          //setChartData1(new Date());
          // console.log(startdate);
  if(chartNumber===1 || chartNumber===2 ){
          for (let dataObj of res.result.data) {
            publisherId.push(dataObj.publisherId);
            impressions_offered.push(parseInt(dataObj.impressions_offered));
          
        
        
        
        }
    
          response={
            labels: publisherId,
            datasets: [
              {
                label: "Data Analysis",
                data: impressions_offered,
                backgroundColor: bgc,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                borderWidth: 4,
              },
            ],
          };
    }
    else if(chartNumber===3){
        for (let dataObj of res.result.data) {
            cm001.push(parseInt(dataObj.cm001));
            CM001_percent.push(dataObj.CM001_percent);
            advertiserId.push(dataObj.publisherId);
          }
          response={
            labels: advertiserId,
            datasets: [
              {
                label: "Data Analysis",
                data: CM001_percent,
                backgroundColor: bgc,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                borderWidth: 4,
              },
            ],
          };

    }
    else if(chartNumber===4){

      for (let dataObj of res.result.data) {
        appSiteId.push(dataObj.appSiteId);
        impressions_offered.push(parseInt(dataObj.impressions_offered));
      }
          response={
            labels: appSiteId,
            datasets: [
              {
                label: "Data Analysis",
                data: impressions_offered,
                backgroundColor: bgc,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                borderWidth: 4,
              },
            ],
          };
    }
    return response;
        })
        .catch((err) => {
          console.log(err);
        });
}