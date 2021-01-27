import React from "react";
import originalMoment from "moment";
import DateRangePickerNew from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { extendMoment } from "moment-range";

const moment = extendMoment(originalMoment);

class Example extends React.Component {
  constructor(props) {
    super(props);

    const today = moment();

    this.state = {
      isOpen: false,
      // value: moment.range(today.clone().subtract(7, "days"), today.clone()),
      startDate: null,
      endDate: null,
      visible: false,
      value: "",
    };
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
    this.props.selectDateRange(value);
  };

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  componentDidUpdate(prevProps,prevState) {
    if (prevState !== this.state) {
      this.props.initdate(this.state.startDate, this.state.endDate);
    }
  }
  renderSelectionValue = () => {
    return (
      <div>
        {/* <div>Selection</div> */}
        {/* {this.state.value.start.format("YYYY-MM-DD")} <br />
        {this.state.value.end.format("YYYY-MM-DD")} */}
      </div>
    );
  };

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "x-auth-token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLU04eXViQStHRUlOQ2d2UTNKQTNVM1ZvYzRcL25HNE1EelkwdEp6dTAzS2g5OWoxNWhsQURPVTNLOFljU2pyWWc2XC9rdjIwUHl5aHpSMlp4Z2ZhbWswZGFRZ1wvaHplZEVRQlUwbVp6QnRNZTRaTHVBPT0iLCJpc3MiOiJyYWh1bGt1bWFyIiwiZXhwIjoxNjExNTU2NTg4LCJpYXQiOjE2MTE0NzAxODgsImp0aSI6IjU4OWEyZDYyM2E1ZDNkZDE1NDZmYzYzM2QyZGEzMDBhZTE3MGI1MjBiMDgxOWI3MTllNTRjNTdjMGYwNTlkNjUyY2ZmNzNiMDEwNjk5ZmRiMzBjZDQyMDQ4NTQ4ZWFlN2M3YWY2YmU3NjNmMTFiODllNTQyNGY5ZjdiOWUxODYwNWQ4YTI0ZGU3ZTg2NGUzNTNhYjhkMWE5OTY2OGFjOTgyNTQ1OGEwZGM3M2NjNzcxYTNjN2VkNjlhMmU4YWQwYjVlMGZlNmRkZGQ4N2ViNzJjMzcyMTg5MzAxZmNjMjZjZjIwMDU5MjA2NjRlNTViZmYxZTg3NWMwOWIwN2ZjNTEifQ.XZU5ztI82f914PCSM-uHfMFsJ1e5lggrxmnHJZxh2FU",
      },

      body: JSON.stringify({ organization: "DemoTest", view: "Auction" }),
    };
    fetch("https://sigviewauth.sigmoid.io/api/v1/getDateRange", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("date result", res.result.startDate);

        this.setState({
          startDate: moment(new Date(parseInt(res.result.startDate))),
          endDate: moment(new Date(parseInt(res.result.endDate))),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>{this.renderSelectionValue()}</div>

        {/* <div>
          <input
            type="button"
            value="Toggle date picker"
            onClick={this.onToggle}
          />
        </div> */}
        {this.state.startDate !== null ? (
          <DateRangePickerNew
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={false}
            minimumDate={new Date(this.state.startDate)}
            maximumDate={new Date(this.state.endDate)}
            initialDay={this.state.startDate._d.getDate()}
            initialMonth={this.state.startDate._d.getMonth()}
            initialYear={this.state.startDate._d.getFullYear()}
          />
        ) : (
            ""
          )}
       
      </div>
    );
  }
}

export default Example;
