// DEFINE   CHART   OPTIONS
const chartOptions  =   {
    chart:  {
        type:   'area',
        height: 180,
        toolbar:    {   show:   false   },  // HIDE CHART TOOLBAR
        zoom:   {   enable: false}  //DISABLE CHART ZOOMING
    },
    colors: ['#3498db'],    // SET CHART COLOR
    series: [{  name:   'Views',    data:   [18,    50, 42, 94, 41, 65] }], //SET CHART DATA
    dataLabels: {   enabled:    false   },  //  HIDE CHART DATA LABELS
    stroke: {   width:  3,  curve:  'smooth'    },  //  SET CHART STROKE PROPERTIES
    fill:   {
        type:   'gradient',
        gradient:   {
            shadeIntensity: 1,
            opacityFrom:    0.7,
            opacityTo:  0,
            stops:  [0, 90, 100]    // SET CHART FILL GRADIENT STOPS
        }
    },
    xaxis:  {
        categories: ['Feb', 'April',    'June', 'Aug',  'Oct',  'Dec'], //  SET X-AXIS CATEGORIES
        axisBorder: {   show:   false   },  //  HIDE    X-AXIS  BORDER
        labels: {   style:  {colors:    '#a7a7a7', fontFamily:  'Bad Skizoff'} }    // SET X-AXIS   LABEL PROPERTIES
    },
    yaxis:  {   show:   false   },  //  HIDE    Y-AXIS
    grid:   {
        borderColor:    'rgba(0,    0,  0,  0)',    //  SET GRID BORDER COLOR
        padding:    {   top:    -30,    bottom: -8, left:   12, right:  12  }   //  SET GRID PADDING
    },
    tooltip:    {
        enabled:    true,   //ENABLE CHART TOOLTIP
        y:  {   formatter:  value   =>  `${value}K` },  //  SET Y-AXIS  TOOLTIP LABEL   FORMATTER
        style:  {   fontFamily: 'Bad Skizoff'   }   //  SET TOOLTIP FONT FAMILY
    },
    markers:    {   show:   false   }   //  HIDE CHART MAKERS
};

//  CREATE  NEW APEXCHART   INSTANCE    WITH CHART  OPTIONS AND RENDER  IT
const   chart   =   new ApexCharts(document.querySelector('.chart-area'),   chartOptions);
chart.render();