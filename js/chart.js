



// Cards obj
var Cards = {
    num: 6,
    data: [ 
        {
            title: "Title1",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 5
        },
        {
            title: "Title2",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 20
        },
        {
            title: "Title3",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 100
        },
        {
            title: "Title4",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 15
        },
        {
            title: "Title5",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 35
        },
        {
            title: "Title6",
            timeSaving: 10,
            valueTimeSaved: 10,
            directCost: 10,
            totalSave: 75
        }
    ]
};

// Initial javascript object holding chart data
var objectToPass = {
    type:'bar', // What kind of chart do we want
    data:{
        labels:[],
        datasets:[{
            label:'population',
            data:[],
            //backgroundColor:'green'
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth:1,
            borderColor: '#777',
            hoverBorderWidth:1,
            hoverBorderColor:'#000'
        }]
    },
    options:{
        title:{
            display:true,
            text:'Largest Cities in Massachusetts',
            fontSize:25
        },
        legend:{
            // position:'right'
        },
        layout:{
            padding:{
                left:0,
                right:0,
                bottom:0,
                top:0    
            }
        },
        tooltips:{
            enabled:true
        }
    }
}




// Global Options
Chart.defaults.global.defaultFontColor = '#777';
Chart.defaults.global.defaultFontSize = 18;

// Create the chart with the updated chart data
function createChart(chartId) {

    let savingsChart = document.getElementById(chartId).getContext('2d');

    // Pass chart by id variable, type of chart, and two JS objects
    let massPopChart = new Chart(savingsChart, objectToPass);
}


// Update chart with the data we want
function loadChart() {
    
    var cardDataArray = Cards.data;

    for(var i = 0; i < cardDataArray.length; i++) {
        console.log(cardDataArray[i].totalSave);
        objectToPass.data.datasets[0].data.push(cardDataArray[i].totalSave);
        objectToPass.data.labels.push(cardDataArray[i].title);
    }
    
}
