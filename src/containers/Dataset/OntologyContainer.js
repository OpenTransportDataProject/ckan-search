import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import OntologyGraph from '../../components/OntologyGraph';
import { Container } from '../../components/Layout';
import DatasetListItem from '../../components/Dataset/DatasetListItem';
import Loader from '../../components/Loader'

export default class OntologyContainer extends Component {

  state = {
    selected: null,
    forceLayoutOntolgies: null,
    nodesFromCurrentDataset: [],
    ontologies: []
  }

  componentWillMount = () => {
    this.props.getNodesByDataset(this.props.dataset.id);

  }
  componentWillUpdate = (newProps,newState) => {

    /**


    HER SLITER JEG MED Å FÅ DEN TIL VENTE PÅ resultNodesByDataset FOR Å SÅ RENDER().
    EN RENDER() FØR GET_NODES_BY_DATASET_SUCCESS.
    DET SKAL DEN JO IKKE!


    **/
    if(newProps.resultNodesByDataset.length > 0){
      if(this.state.nodesFromCurrentDataset.length <= 0){
        this.setState({nodesFromCurrentDataset: newProps.resultNodesByDataset});

      }
    }
    if(newProps.ontologies.length > 0){
      if(this.state.ontologies.length <= 0){
        this.setState({ontologies: newProps.ontologies});

      }
    }
    if(newState.ontologies.length > 0){
      if(this.state.nodesFromCurrentDataset.length > 0){
        if(this.state.forceLayoutOntolgies == null){
          var ontologyForceLayout = this.convertOntologiesToD3(newState.ontologies);

          this.setState({forceLayoutOntolgies: ontologyForceLayout });

        }
      }


    }

  }




  convertOntologiesToD3(ontolgies) {
    var _this = this;
    const nodes = [];
    const edges = [];

    function isDatasetInNode(dataSetNode,nodeID){
      //TODO get dataset from API
      //loop through all
      var found = false;
      for (var i = 0; i < _this.props.resultNodesByDataset.length; i++) {
          var nodeData = _this.props.resultNodesByDataset[i];
          var str = nodeData.node.URI+"#"+nodeData.node.name;
          if(nodeID == str){
            found = true;
            break;
          }
      }
      return found

    }
    function isDatasetInSubclass(dataSetNode,nodeID){

      //TODO get dataset from API
      if(0.9<Math.random()){
        return true;
      }
      return false;

    }


    //adding home dataset to nodes
    var dataSetNode = { id: "current_dataset", type: "dataset" };
    nodes.push(dataSetNode);


      // Create all nodes
      ontolgies.forEach(ontology => ontology.json.forEach(block => {
        // Extract type and id
        var thisType = block['@type'][0];
        if(thisType.indexOf("ObjectProperty") >= 0){

        }else{
          const node = { id: block['@id'], type: block['@type'] };

          // Extract comment
          if (Object.keys(block).join('').indexOf('#comment') !== -1) {
            Object.keys(block).forEach(key => {
              if (key.indexOf('#comment') !== -1) {
                node.comment = block[key][0]['@value'];
              }
            });
          }
          nodes.push(node);
        }

      }));

      // Create all edges
      ontolgies.forEach(ontology => ontology.json.forEach(block => {
        // Extract type and id
        var node = { id: block['@id'], type: block['@type'] };


        //get relations
        if(node.type[0].indexOf("ObjectProperty") >= 0){
          //delete block['@id'];
          //delete block['@type'];
          const rangeIndex = _.findIndex(nodes, (o) => o.id === node.id);
          var domainParents = [];
          var rangeChildren = [];
          Object.keys(block).forEach(key => {
            if(key.indexOf("domain") >= 0){
              block[key].forEach(domainParent => {
                domainParents.push(domainParent);
              });
            }
            else if(key.indexOf("range") >= 0){
              block[key].forEach(rangeChild => {
                rangeChildren.push(rangeChild);
              });
            }
          });
          domainParents.forEach(domainParent => {
            const parentIndex = _.findIndex(nodes, (o) => o.id === domainParent["@id"]);
            rangeChildren.forEach(rangeChild => {

              const childId = rangeChild["@id"];
              const childIndex = _.findIndex(nodes, (o) => o.id === childId);

              if (childIndex >= 0) {
                const edge = { source: parentIndex, target: childIndex, relationType: node.id , weight: 1 };
                edges.push(edge);

                //if viewing a dataset, add dataset node
                /**if(dataSetNode.id != null){
                  if(isDatasetInNode(dataSetNode.id,childId)){
                    var edge = { source: 0, target: childIndex, relationType: "lokalisert_i", weight: 1 };
                    edges.push(edge);
                  }
                }**/
              }

            });
          });

        }else{
          //get subclasses
        //  delete block['@id'];
        //  delete block['@type'];
          const parentIndex = _.findIndex(nodes, (o) => o.id === node.id);


          // Extract comment
          if (Object.keys(block).join('').indexOf('#comment') !== -1) {
            Object.keys(block).forEach(key => {
              if (key.indexOf('#comment') !== -1) {
                node.comment = block[key][0]['@value'];
                delete block[key];
              }
            });
          }

          Object.keys(block).forEach(key => {
            if (block[key][0]['@id']) {
              const childId = block[key][0]['@id'];
              const childIndex = _.findIndex(nodes, (o) => o.id === childId);
              const relationType = null;

              if (childIndex >= 0) {
                var edge = { source: parentIndex, target: childIndex, relationType: key, weight: 1 };
                edges.push(edge);

                //if viewing a dataset, add dataset node
                /**if(dataSetNode.id != null){
                  if(isDatasetInNode(dataSetNode.id,childId)){
                    var edge = { source: 0, target: childIndex, relationType: "lokalisert_i", weight: 1 };
                    edges.push(edge);
                  }
                }**/
              }
            }
          });
        }

      }));


    // find dataset to node relations
    for (var i = 0; i < nodes.length; i++) {
      for (var j = 0; j < this.state.nodesFromCurrentDataset.length; j++) {
          var nodeData = this.state.nodesFromCurrentDataset[j];
          var str = nodeData.node.URI+"#"+nodeData.node.name;
          if(nodes[i].id == str){
            //var thisNode = nodes[i];
            //const childIndex = _.findIndex(nodes, (o) => o.id === thisNode.id);

            //thisNode.index = i;
            const edge = { source:  0, target: i, relationType: "lokalisert_i" , weight: 1 };
            edges.push(edge);
            break;
          }
      }
    }


    return { nodes, edges };
  }
  render() {
    if(this.state.forceLayoutOntolgies != null){
      if(this.state.forceLayoutOntolgies.nodes.length > 0){
        return (
          <div>
            <div>
              <OntologyGraph
                forceLayoutOntolgies = {this.state.forceLayoutOntolgies}
                selectedID = {"current_dataset"}
                onSelect={(selection) => {
                  this.setState(
                    { selected: selection },
                    () => this.props.searchByNode(this.state.selected.substr(this.state.selected.indexOf('#') + 1))
                  );
                }}
              />
            </div>
            <Container>
              {this.props.resultByNode.map(dataset => <DatasetListItem
                title={dataset.title}
                onClick={() => this.props.push(`/dataset/${dataset.id}`)}
                notes={dataset.notes}
                node={[]}
                />)
              }
            </Container>
          </div>);
      }

    }
    return <div><h1>LOADING</h1></div>


  }
}
