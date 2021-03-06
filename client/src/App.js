import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  root:{
    marginTop:20,
    width:'100%',
    minWidtn : 1080
  },
  menu:{
    marginTop:15,
    marginBotton:15,
    display:'flex',
    justifyContent:'center'
  },
  tableWrap:{
    marginLeft:18,
    marginRight:18,
    marginTop:48,
    marginBottom:18,
    backgroundColor:'#e1e1e1',
    minWidth:'604px',
  },
  tableHead : {
    fontSize:'1rem'
  },
  progress: {
    margin:theme.spacing.unit*2
  },
  title: {
    flexGrow: 1,
    display: 'none',
    fontSize:'2rem',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color:'white'
    },
  },
  search: {
    position: 'relative',
    borderRadius:16,
    backgroundColor: '#313131',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#3d3d3d'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color:'white',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});


class App extends Component {
//customer ????????? ????????? ??? ???????????? state
//circularprogress ??? 0~100% ????????? ?????? ?????????
  //?????? ?????????????????? ????????????????????? ????????? props ????????? ?????? > react??? single page applicateion(spa) ????????? ????????? > ????????? ????????? ??????????????? ??? ????????? ??????!
  //????????????????????? ?????? ????????? state??? ???????????? ??????
  constructor(props){
    super(props);
    this.state = {
      customers:'',
      completed:0,
      searchKeyword:''
    }
  }

  stateRefresh = ()=>{
    this.setState({
      customers:'',
      completed:0,
      searchKeyword:''
    });
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
  }

  
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
  }
  
  callApi = async()=>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = ()=>{
    const{completed} = this.state;
    this.setState({completed : completed>=100 ? 0 : completed+1});
  }

  handleValueChange = (e) =>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c)=>{
        return c.name.indexOf(this.state.searchKeyword) > -1;  //???????????? ???????????? ?????????
      });
      return data.map((c)=>{
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} address={c.address} contact={c.contact} createDate={c.createDate}/>
      });
    }
    const {classes } = this.props;
    const cellList = ["??????", "?????????", "??????", "????????????", "??????", "??????", "?????????", "?????????", "??????" ];
    return(
      <div className={classes.root}>
        <div position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              People
            </Typography>
            <li className={classes.search}>
              <li className={classes.searchIcon}>
                <SearchIcon />
              </li>
              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </li>
          </Toolbar>
        </div>
        <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/> 
        </div>
        <div className={classes.tableWrap}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.TableRow}>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody className={classes.TableBody}>
            {/* this.state.customers ?????? ???????????? ??????? */}
              {this.state.customers ? 
              filteredComponents(this.state.customers) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}
export default withStyles (styles)(App);
