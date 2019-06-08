import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { TimeSeries, Index } from "pondjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    styler,
    Resizable,
    BarChart
} from "react-timeseries-charts";
import MessageRow from './MessageRow'
import '../styles/styles.css'
import '../styles/viewMessages.css'

class Thread extends Component {
  constructor (props) {
    super(props)
    this.state = {
      threadId: this.props.threadId,
      users: this.props.users,
      messages: this.props.messages,
      series: {},
      max: 1
    }
  }

  componentWillMount () {
    var messagesObj = this.props.messages;
    var users = Object.values(this.props.users);
    var usersStr = users[0];
    usersStr = (users.length > 1) ? usersStr + " and " + users[1] : "";
    if (!usersStr) {
      usersStr = "(Unlabeled Chat)"
    }

    var byDay = {};
    var messages = Object.entries(messagesObj)
    var max = 1;
    for (var i in messages) {
      var message = messages[i]
      var timestamp = message[1].timestamp
      var d = new Date(timestamp).setHours(0,0,0,0)
      byDay[d] = byDay[d] || 0
      byDay[d] = byDay[d] + 1
      if (byDay[d] > max) max = byDay[d]
    }

    var data = Object.keys(byDay).map(function(key) {
      return [parseInt(key), byDay[key]];
    });
    var series = null
    if (Object.keys(data).length == 1) {
      data = [[data, data]]
    }
    if (Object.keys(data).length > 1) {
      series = new TimeSeries({
          name: "hilo_messages",
          columns: ["index", "msgs"],
          points: data.map(([d, value]) => [Index.getIndexString("1d", new Date(d)), value])
      });
    }

    this.setState({users: usersStr})
    this.setState({messages: messagesObj})
    this.setState({series: series})
    this.setState({max: max})
  }

  render() {
    var result = []
    var empty = true
    for (var messageId in this.state.messages) {
      empty = false
      var message = this.state.messages[messageId]
      result.push(<MessageRow
        key={messageId}
        message={message.message}
        sender={message.sender}
        timestamp={message.timestamp}
      />)
    }

    var style = styler([
        { key: "msgs", color: "#A5C8E1"},
    ]);

    if (empty || !this.state.series) {
      return null;
    } else {
      return (
        <div>

          <p className="spacer-100">{}</p>
          <h key={this.state.key} className="pairHeader">{this.state.users}</h>
          <p className="spacer-20">{}</p>
          <div>
                  <div className="row">
                      <div className="col-md-12">
                          <b>Messages Per Day</b>
                      </div>
                  </div>
                  <hr />
                  <div className="row">
                      <div className="col-md-12">
                          <Resizable>
                              <ChartContainer timeRange={this.state.series.range()}>
                                  <ChartRow height="150">
                                      <YAxis
                                          id="count"
                                          label="Count"
                                          min={0}
                                          max={this.state.max}
                                          format=".2f"
                                          width="150"
                                          type="linear"
                                      />
                                      <Charts>
                                          <BarChart
                                              axis="count"
                                              style={style}
                                              spacing={1}
                                              columns={["msgs"]}
                                              series={this.state.series}
                                              minBarHeight={2}
                                              infoWidth={150}
                                          />
                                      </Charts>
                                  </ChartRow>
                              </ChartContainer>
                          </Resizable>
                      </div>
                  </div>
              </div>
          <ListGroup>
            {result}
          </ListGroup>
        </div>
      )
    }
  }
}

export default Thread
