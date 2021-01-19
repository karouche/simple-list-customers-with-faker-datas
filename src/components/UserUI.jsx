 
import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import TableUI from './TableUI'
import Button from 'react-bootstrap/Button'
import ReactMapGL, {Marker} from 'react-map-gl';

const mapboxgl_accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

class UserUI extends Component {

    constructor(props) {        
        super(props);     
        this.address = this.props.location.state.address; 
        this.viewport =  {
            latitude: Number(this.address.latitude),
            longitude: Number(this.address.longitude),
            zoom: 3            
        } ;
        this.state = {
            user : props.location.state, 
            products:[], 
            viewport : this.viewport
        }                
    }
        
    setViewport = (viewport) => {
        this.setState({viewport});
    }

    componentDidMount() {                       
        const address = this.props.location.state.address;        
        const viewport =  {
            latitude: Number(address.latitude),
            longitude: Number(address.longitude),
            zoom: 3            
        }         

        axios.get(`http://localhost:3000/products/?userId=${this.props.match.params.id}`)
        .then(res => {                
              const products = res.data;  
              this.setState({products, viewport});                             
        })
    }

    back= () => {
        this.props.history.push('/users')
    }

    render () { 
 
        return (
            <div>       

                    <Button className="back" onClick={this.back}> Back </Button>    

                    <div className="container-user">
                        <div className="profil-container">

                        <Card  bg="Light"  className="card-user">
                                        <Card.Header></Card.Header>
                                        <Card.Img variant="top" src={this.state.user.avatar} />                                        
                                        <Card.Title>{this.state.user.firstname} { } {this.state.user.lastname}</Card.Title>
                                        <Card.Subtitle>{this.state.user.job}</Card.Subtitle>
                                        <Card.Body>

                                            <p className="custom-infos-user">                                                 

                                                <p className="company">
                                                    Company : {this.state.user.company}
                                                </p>

                                                {this.state.user.address && 
                                                    <p> <i className="fa fa-map-marker"></i>
                                                        { } {this.state.user.address.state}
                                                    </p>
                                                }

                                                <p className="phone">                                                                                                
                                                    <i className="fa fa-phone-square" aria-hidden="true"></i> { }
                                                    {this.state.user.phonenumber}
                                                </p>
 
                                                <p className="social-medias-icon">                                                    
                                                        <span className="social">
                                                            <i className="fa linkedin"/>
                                                        </span>
                                                        <span className="social">
                                                            <i className="fa twitter"/>
                                                            </span>
                                                        <span className="social">
                                                            <i className="fa vimeo"/>
                                                        </span>
                                                        <span className="social">
                                                            <i className="fa facebook"/>
                                                        </span>                                                                                                            
                                                </p> 
                                            </p> 
                                        </Card.Body>
                                </Card>
                        </div>
                        <div className="card-container table-shadow">

                            <div className="custom-card-header">                                  
                            </div>
                            <div className="title">
                                    Delivery address
                            </div>
                            <div className="sub-title">
                            { this.state.user.address && 
                                   <p>{this.state.user.address.streetName}, {this.state.user.address.city} {this.state.user.address.zip}</p>
                                } 

                            </div>
                            <div className="map">
                            <ReactMapGL 
                                                width="40vw"
                                                height="20vw"
                                                mapboxApiAccessToken={mapboxgl_accessToken}
                                                mapStyle="mapbox://styles/mapbox/streets-v11"
                                                 {...this.viewport}
                                     >
                                    
                                    <Marker latitude={this.viewport.latitude} longitude={this.viewport.longitude} offsetLeft={-20} offsetTop={-10}>
                                          <div className="marker"></div>
                                    </Marker>
                                    </ReactMapGL>
                            </div>
                        </div>
                    </div>                      
                  <TableUI products = {this.state.products} />  
            </div>
        )
    }
}

export default  UserUI; 