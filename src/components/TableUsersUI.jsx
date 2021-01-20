import React, { Component } from 'react' 
import './TableUI.css'
import  axios, { async  }  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import paginate from 'paginate-array';
import { Spinner } from 'react-bootstrap';
import avatars from '../assets/images/av-customers.jpg'
import { USER_URL} from './helpers'
   

class TableUsersUI extends Component {

    constructor(props){
        super(props);
        this.state = {
            show : false,
            loading : true, 
            user : '',           
            size: 5,
            page: 1,
            currPage: null,
            users : [],
            initialUsers : [], 
            searchField : ''
        }

      
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleShow = this.handleShow.bind(this); 
        this.filterList = this.filterList.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        
    }

    componentDidMount() {      
      
        axios.request({
            method: "get",
            url: USER_URL
        })        
        .then((res) => {                
               const users = res.data;               
               const { page, size } = this.state;
               const currPage = paginate(users, page, size);
               this.setState({
                  ...this.state,
                  loading : false, 
                  users,
                  initialUsers: users,
                  currPage
              });               
        })  
 
    } 

    async  handleShow(id) {        
      await axios.request({
        method: "get",
        url: USER_URL+`/${id}`        
      })  
        .then(res => {                
               const user = res.data;                                 
               this.setState({
                 show : true, 
                 user : user
               }); 
        })  
    }
    
  previousPage() {
    const { currPage, page, size, users } = this.state;


    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(users, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }
  
  nextPage() {
    const { currPage, page, size, users } = this.state;    
    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(users, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }
 
  openUserPage= (row) => {               
    this.props.history.push({ 
        pathname: `/users/${row.id}`,
        state: row
     });
  }

  filterList =(event) => {    
     
    var inVal = event.target.value; 
    var updatedList = this.state.initialUsers;         
    updatedList = updatedList.filter(
      function(item){                
          return item.firstname.toLowerCase().search(inVal.toLowerCase()) !== -1
              || item.lastname.toLowerCase().search(inVal.toLowerCase()) !== -1
      });                      
       
      const users = updatedList;      
      const { page, size } = this.state;
      const currPage = paginate(users, page, size);
      
      this.setState({
             ...this.state,
             searchField : inVal,
             users,
             currPage
       });       
  }

  resetFilter =() => {    
      const users = this.state.initialUsers;
      const { page, size } = this.state;
      const currPage = paginate(users, page, size);      
      this.setState({
             ...this.state,
             searchField : '',
             users,
             currPage
       }); 
  }

  render() {       
    
      const { page, size, currPage } = this.state;
      
      return (
        <>
        
        <div className="av">
            <img src={avatars} alt=""/>
            <span>customers & sales</span>
        </div>
        <div className="search-filter">
        <form>
        <fieldset className="form-group">
          <input type="text" className="form-control form-control-lg" value={this.state.searchField}
                placeholder="Search customer" onChange={this.filterList}/>
                <span className="btn-clear fa fa-times-circle"  onClick={this.resetFilter}></span>
          </fieldset>
        </form>        
        </div>
 
        
          <Table striped bordered hover size="sm"  width="60%" className="table-shadow">
                <thead className="thead-dark ">
                   <tr>
                            <th>firstname</th>
                            <th>lastname</th> 
                            <th>job</th>  
                            <th>company</th>  
                            <th>phonenumber</th> 
                            <th>  </th>
                   </tr>
                </thead>
                
                
                <tbody>
                 {currPage &&
                   currPage.data.map(row=> (                                 
                         <tr key={row.id}>
                            <td>{row.firstname}</td>
                            <td>{row.lastname}</td>
                            <td>{row.job}</td>  
                            <td>{row.company}</td>  
                            <td>{row.phonenumber}</td> 
                            <td> 
                                 <Button variant="info"  size="sm"  onClick={() => this.openUserPage(row)}>Edit</Button>                                                          
                              </td>
                          </tr>   
                    ))}                                      

                    <tr>
                            <td colSpan="6" className="sp-loading">
                               {this.state.loading &&  
                                <Button variant="success" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                </Button>
                              }                              
                           </td>                            
                    </tr>  
                  </tbody>
                  
                  <tfoot>                  
                    <tr>
                      <td colSpan="5">                        
                      { this.state.users.length > 5 && ( 
                          <span className="btns">
                              <Button disabled={page===1} className="previous" onClick={this.previousPage}>Previous Page</Button> 
                              <Button disabled={page===currPage.totalPages} className="next" onClick={this.nextPage}>Next Page</Button>                                                      
                           </span>
                           )} 
                      </td>                       
                    </tr> 
                  </tfoot>
                    
             </Table>                     
              </>
      );
    }
  }

  export default TableUsersUI;