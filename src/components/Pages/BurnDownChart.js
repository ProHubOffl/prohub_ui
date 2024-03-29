import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BurnDownChart = (props) => {

    const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Burn Down Chart',
          },
        },
        scales: {
          x: {
              title: {
                display: true,
                text: 'Sprint Duration',
                color: 'rgba(3, 34, 46, 0.918)',
                font: {
                  family: 'Times',
                  size: 20,
                  style: 'normal',
                  lineHeight: 1.2,
                  weight: 'bold'
                }
            }
            },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Story points',
              color: 'rgba(3, 34, 46, 0.918)',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2,
                weight: 'bold'
              }
          }
          },
          y1: {
            type: 'linear',
            display: false,
            position: 'right',      
            title: {
              display: true,
              text: 'Story points',
              color: 'rgba(3, 34, 46, 0.918)',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2,
                weight: 'bold'
              }
          },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
      
      const XAxiselements = (date1, date2, sprints, days) => {
        var start = new Date(date1);
        var end = new Date(date2);
        var lastdate = new Date(date1);
        var dates=[]
        var currentsprint=0;
        var dateformat=[]
        dates[0]="Start "+new Date(start).getDate()+"/"+(new Date(start).getMonth()+1)+"/"+new Date(start).getFullYear();
        dateformat[0]=dates[0]
        dates[sprints]="Sprint"+sprints+" : "+(new Date(end).getDate()+"/"+(new Date(end).getMonth()+1)+"/"+new Date(end).getFullYear());
        dateformat[sprints]=dates[sprints]
        for(var i=1; i<sprints ; i=i+1){
            currentsprint=currentsprint+1
            dates[i] = new Date(lastdate.setDate(lastdate.getDate() + days));
            dateformat[i]="Sprint"+currentsprint+" : "+(dates[i].getDate()+"/"+(dates[i].getMonth()+1)+"/"+dates[i].getFullYear())
        }
        
        return dateformat;
    }

    const CalculateExpectedPointsBurn = (total,tasks,sprints) => {
        var expectedpoints=[]
        var totalpoints=total
        expectedpoints[0]=totalpoints;
        for(var j=1; j<=sprints; j=j+1){
            for(var i=0; i<tasks.length ; i=i+1){
                if(tasks[i].sprint===j){
                    totalpoints=totalpoints-tasks[i].storyPoints
                }
            }
            expectedpoints[j]=totalpoints
        }
        return expectedpoints;
    }
    
    const CurrentSprint = (date1, date2, sprints, days) => {
      var start = new Date(date1);
      var end = new Date(date2);
      var today= new Date();
      var lastdate = new Date(date1);
      var dates=[]
      var currentsprint=0;
      dates[0]=start;
      dates[sprints]=end;
      if(today > new Date(end)){
        return sprints
      }
      if(today < new Date(start)){
        return 0;
      }
      for(var i=1; i<sprints ; i=i+1){
          dates[i] = new Date(lastdate.setDate(lastdate.getDate() + days));
      }
      for(var i=1 ; i<=sprints; i=i+1){
          currentsprint = currentsprint + 1
          if(today < dates[i] && today > dates[i-1]){
              var lastdate=dates[i]
              break;
          }
      }
      return currentsprint
    }

    const CalculateActualPointsBurn = (date1,date2,total,tasks,sprints,days) =>{
        var actualpoints=[]
        var totalpoints=total
        actualpoints[0]=totalpoints;
        var currentsprint=CurrentSprint(date1, date2, sprints, days);

        var start = new Date(date1);
        var end = new Date(date2);
        var lastdate = new Date(date1);
        var dates=[]
        dates[0]=start
        dates[sprints]=end
        for(var i=1; i<sprints ; i=i+1){
            dates[i] = new Date(lastdate.setDate(lastdate.getDate() + days));
        }

        for(var j=0; j<currentsprint; j=j+1){
          for(var i=0; i<tasks.length ; i=i+1){
              if(tasks[i].status === 'APPROVED' && new Date(tasks[i].lastUpdated) < dates[j+1] && new Date(tasks[i].lastUpdated) > dates[j]){
                  totalpoints=totalpoints-tasks[i].storyPoints
              }
          }
          actualpoints[j+1]=totalpoints;
      }
        return actualpoints;
    }

      const labels = XAxiselements(props.project.startDate,props.project.endDate,props.project.totalSprints,props.days);
      const Expectedpoints = CalculateExpectedPointsBurn(props.project.storyPoints,props.backlogs,props.project.totalSprints)
      const ActualPoints= CalculateActualPointsBurn(props.project.startDate,props.project.endDate,props.project.storyPoints,props.backlogs,props.project.totalSprints,props.days)
      const data = {
        labels,
        datasets: [
          {
            label: 'Expected Points',
            data: Expectedpoints,
            borderColor: 'rgb(255, 100, 132)',
            backgroundColor: 'red',
            yAxisID: 'y',
          },
          {
            label: 'Actual Points',
            data: ActualPoints,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'blue',
            yAxisID: 'y',
          },
        ],
      };

  return(
    <>
    <div class="chartBox">
        <Line options={options} data={data} />
    </div>
    </>
  );
}
export default BurnDownChart;