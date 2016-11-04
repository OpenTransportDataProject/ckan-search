/* eslint-disable no-param-reassign, no-use-before-define, new-cap */
import React, {
    Component
} from 'react';
import d3 from 'd3';
import _ from 'lodash';
import Dimensions from 'react-dimensions';
import './OntologyGraph.scss';


class OntologyGraph extends Component {

    state = {
        linkDistance: 150,
        charge: -300,
        theta: 0.1,
        gravity: 0.0,
        zoom: {
            min: 0.1,
            max: 0.8
        },
        selectedID: null,
        selected: null,
        center: null,
        currentBoardEdges: null,
        currentBoardNodes: null
    }

    componentDidMount() {

        function getGlobalDistance(svgElement, nodeInSvg) {
            var svgPos = svgElement.attr("transform");
            var svgPosRegEx = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(svgPos);
            var posX = parseFloat(svgPosRegEx[1]);
            var posY = parseFloat(svgPosRegEx[2]);
            if (nodeInSvg != null) {
                posX = nodeInSvg.x + posX;
                posY = nodeInSvg.y + posY;
            }
            return {
                x: posX,
                y: posY
            };
        };
        var keepBoxHovering = false;
        var mouseOnBox = false;





        var _this = this; //ref for functions
        var color = d3.scale.category10();

        var nodeOriginal = _this.props.forceLayoutOntolgies.nodes; //moved jsonTod3 to parent container
        var linksOriginal = _this.props.forceLayoutOntolgies.edges; //moved jsonTod3 to parent container



        var svg = d3
            .select('#ontology-graph')
            .append('svg')
            .attr({
                width: this.props.containerWidth,
                height: 400
            });

        var g = svg.append("g");
        var linkParent = g.append("g").attr("id", "linkParentID");
        var nodeParent = g.append("g").attr("id", "nodeParentID");
        var textParent = g.append("g").attr("id", "textParentID");
        g.attr("transform", "translate(0,0)");
        svg.style("background", "#EEE");
        var force = d3.layout.force()
            .nodes(nodeOriginal)
            .links(linksOriginal)
            .size([this.props.containerWidth, 1000])
            .linkDistance([this.state.linkDistance])
            .charge([this.state.charge])
            .theta(this.state.theta)
            .gravity(this.state.gravity)
            .start();

        var desiredCenterX = this.props.containerWidth / 2;
        var desiredCenterY = 200;
        g.attr("transform", "translate(" + desiredCenterX + "," + desiredCenterY + ")");

        var dragstart = () => {
            force.stop();
        };

        var dragmove = (d) => {
            d.px += d3.event.dx;
            d.py += d3.event.dy;
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            tick();
        };

        var dragend = (d) => {
            tick();
            force.resume();
        };

        var min_zoom = 0.1;
        var max_zoom = 7;
        var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
        var drag = d3.behavior.drag()
            .on('dragstart', function(d, i) {
                if (!d.fixed) {
                    dragstart(d, i)
                }
            })
            .on('drag', function(d, i) {
                if (!d.fixed) {
                    dragmove(d, i)
                }
            })
            .on('dragend', function(d, i) {
                if (!d.fixed) {
                    dragend(d, i)
                }
            });

        var select = (selected) => {




            if (_this.state.selected != null) {

                //DO before new selection takes place
                var oldSelectedNode = d3.select("#oldSelected")
                    .attr("id", "none")
                    .attr("stroke", null)
                    .attr("r", 30)
                    .attr("stroke-width", null);


                var selectedNode = d3.select("#selectedNode")
                    .attr("id", "#oldSelected")
                    .transition()
                    .attr("stroke", "#CCCCCC")
                    .attr("r", 18)
                    .attr("stroke-width", 6);
            }


            //Select
            _this.setState({
                selected: selected
            });
            if(selected != "current_dataset"){
              this.props.onSelect(this.state.selected.id);
            }


            //DO after new selection takes place
            nodes.filter((d) => (d === _this.state.selected)).attr("id", "selectedNode");
            var selectedNode = d3.select("#selectedNode");

            selectedNode.transition()
                .attr("stroke", "#7777FF")
                .attr("r", 19)
                .attr("stroke-width", 8);


            //selectedNode.transition().
            //.delay(1000).attr("r",30);
            //this.props.onSelect(selected);// Funker denne da?

            update();
        };


        // build the arrow.
        g.append("svg:defs").selectAll("marker")
            .data(["end"]) // Different link/path types can be defined here
            .enter().append("svg:marker") // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 7)
            .attr("refY", 0)
            .attr("markerWidth", 4)
            .attr("markerHeight", 4)
            .attr("fill", "#aaa")
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");


        //create nodes
        var nodes = svg.select("#nodeParentID").selectAll('circle')
            .data(nodeOriginal, function(d) {
                return d.id
            })
            .enter().append('circle')
            .attr("d",d3.svg.symbol().size(10).type("square"))
            .attr('class', 'node')
            .attr('r', 15)
            .attr('fill', (d) => color(d.type))
            .attr('class', 'circle')
            .call(drag)
            .on('click', function(d) {
                _this.state.selected.fixed = true;
                select(d)
            }).on('mouseover', function(d, i) {
                //hover(d,i);
            }).on('mouseout', function(d, i) {
                //stopHover(d,i);
            })
            .style("cursor", "pointer");


        //create nodelabels
        var nodelabels = svg.select("#textParentID").selectAll("nodelabel")
            .data(nodeOriginal, function(d) {
                return d.id
            })
            .enter()
            .append("text")
            .attr("x", function(d) {
                return d.x
            })
            .attr("y", function(d) {
                return d.y
            })
            .attr("class", "nodelabel")
            .text(function(d) {
              var label = d.id.substr(d.id.indexOf('#') + 1);
              while(label.indexOf("_") > -1){
                label = label.replace("_", " ");
              }
              return label;
            }).style("pointer-events", "none");
        /**
        //commentBox
        var commentBoxs = g.selectAll("commentBox")
            .data(nodeOriginal, function(d) {
                return d.id
            })
            .enter()
            .append("g")
            .on('mouseover', function(d,i){
              //console.log("mouseOnBox = true")
              mouseOnBox = true;
            })
            .on('mouseout', function(d,i){
              //console.log("mouseOnBox = false")
              mouseOnBox = false;
            });

       commentBoxs.append("rect")
           .attr("width",200)
           .attr("height",100)
           .attr("fill","green")
           .style('display', 'none');

       commentBoxs.append("text")
            .attr("x", function(d) {
                return d.x
            })
            .attr("y", function(d) {
                return d.y
            })
            .attr("class", "commentBox")
            .text(function(d) {
              if(d.comment != null){
                return d.comment.substr(d.id.indexOf('#') + 1)
              }
              return "";
            }).style('display', 'none');
            **/
        //create edgepaths
        var edgepaths = svg.select("#linkParentID").selectAll(".edgepath")
            .data(linksOriginal, function(d) {
                return d.source.id + "-" + d.target.id;
            })
            .enter()
            .append('path')
            .attr('d', function(d) {
                return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
            })
            .attr('class', 'edgepath')
            .attr('id', function(d, i) {
                return 'edgepath' + i
            })
            .attr("fill", "none")
            .attr("stroke", "#AAA")
            .attr("stroke-width", 3)
            .attr("marker-end", "url(#end)")
            .style("pointer-events", "none");

        //create edgeLabels
        var edgeLabels = svg.select("#linkParentID").selectAll(".edgelabel")
            .data(linksOriginal, function(d) {
                return d.source.id + "-" + d.target.id;
            })
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr('class', 'edgelabel')
            .attr('id', function(d, i) {
                return 'edgelabel' + i
            })
            .attr('dx',function(d, i) {
                var label = d.relationType.substr(d.relationType.indexOf('#') + 1);
                return _this.state.linkDistance / 2 - (label.length/2)*8

            })
            .attr('dy', -7)
            .attr('font-size', 15)
            .attr('fill', '#aaa');

        edgeLabels.append('textPath')
            .attr('xlink:href', function(d, i) {
                return '#edgepath' + i
            })
            .style("pointer-events", "none")
            .text(function(d, i) {
                var label = d.relationType.substr(d.relationType.indexOf('#') + 1);
                while(label.indexOf('_') > -1){
                  label = label.replace("_", " ");
                }
                return label;
            });

        /**
            nodes.append('svg:text')
              .attr('class', 'nodetext')
              .attr('dx', 14)
              .attr('dy', '.35em')
              .text((d) => d.id.substr(d.id.indexOf('#') + 1));

        **/

        //Loop through forceLayoutOntolgies and find the initialized selected node in the network
        for (var i = 0; i < nodeOriginal.length; i++) {

              if (nodeOriginal[i]['id'] == this.props.selectedID) {

                  _this.state.selected = nodeOriginal[i];

                  nodes.filter((d) => (d === _this.state.selected)).attr("id", "selectedNode");
                  var selectedNode = d3.select("#selectedNode");
                  selectedNode.transition()
                      .attr("stroke", "#7777FF")
                      .attr("r", 19)
                      .attr("stroke-width", 8);
                  update();
                  break;
              }
          }



        //Overrides old edges and nodes. Called when node is clicked
        function update() {
            var newForceLayoutOntologies = getRelationsOfSelected();

            nodeOriginal = newForceLayoutOntologies.nodes;
            linksOriginal = newForceLayoutOntologies.edges;

            // Restart the force layout.
            force
                .nodes(nodeOriginal)
                .links(linksOriginal)
                .start();


            //update nodes
            nodes = nodes.data(nodeOriginal, function(d) {
                return d.id;
            });
            nodes.exit().remove(); //Remove DOM elements lacking corresponding data
            nodes.enter().append('svg:circle')
                .attr('class', 'node')
                .attr('r', 15)
                .attr("x",0)
                .attr("y",0)
                .attr("cx",0)
                .attr("cy",0)
                .attr("px",0)
                .attr("py",0)
                .attr('fill', (d) => color(d.type))
                .attr('class', 'circle')
                .call(drag)
                .on('click', function(d) {
                    _this.state.selected.fixed = true;
                    select(d)
                }).style("cursor", "pointer");


            /***nodes.filter(function(d) {
                return d == _this.state.selected
            }).insert('svg:circle').
              .attr('class', 'node')
              .attr('r', 20)
              .attr('fill', (d) => color(d.type))
              .attr('class', 'circle')
              .call(drag)
              .on('click', function(d) {
                  _this.state.selected.fixed = true;
                  select(d)
              });
                  ***/
            //update nodelabels
            nodelabels = nodelabels.data(nodeOriginal, function(d) {
                return d.id
            });

            nodelabels.exit().remove();
            nodelabels
                .enter()
                .append("text")
                .attr("x", function(d) {
                    return d.x
                })
                .attr("y", function(d) {
                    return d.y
                })
                .attr("class", "nodelabel")
                .text(function(d) {
                  var label = d.id.substr(d.id.indexOf('#') + 1);
                  while(label.indexOf("_") > -1){
                    label = label.replace("_", " ");
                  }
                  return label;
                });

            //update edgepaths
            edgepaths = edgepaths.data(linksOriginal, function(d) {
                return d.source.id + "-" + d.target.id;
            })
            edgepaths.exit().remove();
            edgepaths.enter()
                .append('path')
                .attr('d', function(d) {
                    return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
                })
                .attr('class', 'edgepath')
                .attr('id', function(d, i) {
                    return 'edgepath' + i
                })
                .attr("fill", "none")
                .attr("stroke", "#AAA")
                .attr("stroke-width", 3)
                .attr("marker-end", "url(#end)")
                .style("pointer-events", "none");

            //add style to _in edgepaths
            edgepaths.filter(function(d){return (d.relationType=="lokalisert_i") })
              .attr("fill", "none")
              .attr("stroke", "#F88")
              .attr("stroke-width", 3)
              .attr("marker-end", "none")
              .style("pointer-events", "none")
              .attr("stroke-dasharray", 5);





            //update edgeLabels
            edgeLabels = edgeLabels.data(linksOriginal, function(d) {
                return d.source.id + "-" + d.target.id;
            })
            edgeLabels.exit().remove();

            var updateEdgelabels = edgeLabels
              .enter()
              .append('text')
              .style("pointer-events", "none")
              .attr('class', 'edgelabel')
              .attr('id', function(d, i) {
                  return 'edgelabel' + i
              })
              .attr('dx',function(d, i) {
                  var label = d.relationType.substr(d.relationType.indexOf('#') + 1);
                  return _this.state.linkDistance / 2 - (label.length/2)*8

              })
              .attr('dy', -7)
              .attr('font-size', 15)
              .attr('fill', '#aaa');

            updateEdgelabels.append('textPath')
              .attr('xlink:href', function(d, i) {
                  return '#edgepath' + i
              })
              .style("pointer-events", "none")
              .text(function(d, i) {
                  var label = d.relationType.substr(d.relationType.indexOf('#') + 1);
                  while(label.indexOf('_') > -1){
                    label = label.replace("_", " ");
                  }
                  return label;
              });


        }
        var tick = () => {


            //tick nodes
            nodes
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                });

            //tick nodelabels
            nodelabels
                .attr('x', function(d) {
                    return d.x
                })
                .attr('y', function(d) {
                    return d.y
                });


            //tick edgepaths
            edgepaths.attr('d', function(d) {
                var distSrcTargX = (d.target.x - d.source.x);
                var distSrcTargY = (d.target.y - d.source.y);
                var euclDist = Math.sqrt(Math.pow(distSrcTargX, 2) + Math.pow(distSrcTargY, 2));
                var cos = (distSrcTargX / euclDist);
                var sin = (distSrcTargY / euclDist);
                var offsetLineStartX = -cos * 25;
                var offsetLineStartY = -sin * 25;
                var offsetLineEndX = cos * 20;
                var offsetLineEndY = sin * 20;
                var path = `M ${d.source.x+offsetLineEndX} ${d.source.y+offsetLineEndY} L ${d.target.x+offsetLineStartX} ${d.target.y+offsetLineStartY}`
                return path
            });



            edgeLabels.attr('transform',function(d,i){
              var distSrcTargX = (d.target.x - d.source.x);
              var distSrcTargY = (d.target.y - d.source.y);
                if (d.target.x<d.source.x){
                    return `rotate(180 ${d.source.x+distSrcTargX/2} ${d.source.y+distSrcTargY/2} )`;
                    }
                else {
                    return 'rotate(0)';
                    }
            });

            //tick scene
            var scenePos = getGlobalDistance(g, null);

            var scenePosX = scenePos.x;
            var scenePosY = scenePos.y;


            var globalPosSelectedX = scenePos.x + _this.state.selected.x;
            var globalPosSelectedY = scenePos.y + _this.state.selected.y;

            var distanceToCenterX = desiredCenterX - (globalPosSelectedX);
            var distanceToCenterY = desiredCenterY - (globalPosSelectedY);

            var updateScenePosX = scenePosX + distanceToCenterX / 10;
            var updateScenePosY = scenePosY + distanceToCenterY / 10;
            g.attr("transform", "translate(" + updateScenePosX + "," + updateScenePosY + ")");


        };
        force.on('tick', tick);




        //Finds and returns child nodes of clicked node
        function getRelationsOfSelected() {

            var edges = [];
            var nodes = [];
            _this.props.forceLayoutOntolgies.edges.forEach(function(entry) {
                if ((entry['source']['id'] == _this.state.selected['id']) || (entry['target']['id'] == _this.state.selected['id'])) {
                    //Found a relationship connected to current node




                    //Put in new edge list
                    edges.push(entry);

                    //check if nodes contain this entry
                    var found = false;
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i]['id'] == entry['source']['id']) {
                            found = true;
                        }
                    }
                    if (!found) {
                        //Put into nodes
                        //entry['source'].x = _this.state.selected.x;
                        //entry['source'].y = _this.state.selected.y;
                        nodes.push(entry['source']);
                    }
                    var found = false;
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i]['id'] == entry['target']['id']) {
                            found = true;
                        }
                    }
                    if (!found) {
                        //Put into nodes
                        //entry['target'].x = _this.state.selected.x;
                        //entry['target'].y = _this.state.selected.y;
                        nodes.push(entry['target']);
                    }
                }
            });
            return {
                nodes,
                edges
            };
        }

    }



    render() {
        return ( <
            div id = 'ontology-graph' / >
        );
    }
}



export default Dimensions()(OntologyGraph);
