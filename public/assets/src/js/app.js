var mediaLarge = '1440px';
var mediaMedium = '1024px';

// Define App Namespace
var app = {
  // Initializer
  init: function() {
    //app.enquire();
    app.d3();
  },

  enquire : function() {

    enquire.register("screen and (max-width: " + mediaLarge + ")", {
      match : function() {
        console.log('Match');
      },
      setup : function() {
        console.log('Setup');
      },
      unmatch : function() {
        console.log('Unmatch');
      }
    });
  },

  d3: function() {
    var width = 1000;
    var height = 1000;
    var padding = 50;

    var viz = d3.select('#viz-wrapper')
                .append('svg')
                .attr('height', height + (padding * 2))
                .attr('width', width + (padding * 2))
                .append('g')
                .attr('id', 'graph')
                .attr('transform', 
                      'translate(' + padding + ',' + padding + ')');

    var yScale = d3.scaleLinear()
                   .range([height, 0]);
    
    var xScale = d3.scaleLinear()
                   .range([width, 0]);
    
    // Set up the x axis - xAxis is using incorrect data at the moment
    var xAxis = d3.axisBottom().scale(xScale)
                               .ticks(0);
    
    
    // Set up the y axis 
    var yAxis = d3.axisLeft().scale(yScale)
                             .ticks(20);
    
    //var parseTime = d3.timeFormat('%Y-%m-%dT%H:%M:%SZ');

    d3.json('./data/strava-01.json', function(error, data){
      if (error === true) {
        console.error(error);
      }

      console.log(data.gpx.trk.trkseg.trkpt.length);
      
//      yDomain = d3.extent(data.gpx.trk.trkseg.trkpt, function(element){
//        return parseInt(element.ele)
//      });
      
      yDomain = [0, 1000];
      
      xDomain = [4398, 0];

      yScale.domain(yDomain);
      
      xScale.domain(xDomain);

//      dots = viz.selectAll('circle')
//                  .data(data.gpx.trk.trkseg.trkpt)
//                  .enter()
//                  .append('circle');
//      
//      dots.attr('r', function(d, i) {
//        //return Math.abs(d.ele) / 10})
//        return 1 })
//      .attr('cx', function(d, i){
//        //return (i / data.gpx.trk.trkseg.trkpt.length * 100)
//        return xScale(i)
//      })
//      .attr('cy', function(d) {
//        return yScale(d.ele)
//      })
//      .style('stroke', '#ccc')
//      .style('fill', '#ebebeb')
      
      // Specify the function for generating path data
      var d3line2 = d3.line()
        .x(function(d, i){return xScale(i);})
        .y(function(d){return yScale(d.ele);});
        //.interpolate("linear");
        // "linear" for piecewise linear segments

      // Creating path using data in pathinfo and path data generator
      // d3line.
      viz.append("svg:path")
        .attr("d", d3line2(data.gpx.trk.trkseg.trkpt))
        .style("stroke-width", 2)
        .style("stroke", "steelblue")
        .style("fill", "none");
      
      // Append coloured background
      viz.append("svg:path")
        .attr("d", d3line2(data.gpx.trk.trkseg.trkpt) +
             "L1000,1000" +
             "L0,1000")
        .style("fill", "#ebebeb");
        // First M0,976.6
        // Last L999.7726239199636,976.7
      
        // Add the X Axis
      viz.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append('text')
        .style("fill", "black")   // fill the text with the colour black
        .style("color", "black")
        .attr("x", width / 2)           // set x position of left side of text
        .attr("y", 30)
        .text('Time');
      
      viz.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append('text')
          .style("fill", "black")   // fill the text with the colour black
          .style("color", "black")
          .attr("x", -(height / 2))           // set x position of left side of text
          .attr("y", -35)
          .attr("transform", function() {
                return "rotate(-90)"
                })
          .text('Elevation');
    });
  }

};
// Initialize App
jQuery(function($){app.init();});
