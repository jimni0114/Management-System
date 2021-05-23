import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display:'none'
    },
    button: {
        backgroundColor: '#313131',
        color:'#9c9c9c',
        position:'absolute',
        right:25,
    },
    submitButton: {
        backgroundColor: '#313131',
        color:'#9c9c9c',
    }
});

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            address:'', 
            contact:'', 
            fileName:'',
            open:false //dialog 창이 처음에는 열려있지 않게
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                // console.log(response.data);
                this.props.stateRefresh();
            })
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            address:'', 
            contact:'', 
            fileName:'',
            open: false
        })
    }
    
    handleFileChange = (e) => {
        this.setState({
            file:e.target.files[0], // e.target : 이벤트가 발생한 input값 자체
            fileName:e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = ()=>{
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('address', this.state.address);
        formData.append('contact', this.state.contact);
        const config = { //파일이 포함된 데이터를 추가할 때 
            header:{
                'content-type': 'multipart/form-data'
            }    
        }
        return post(url, formData, config); //해당 url에 formdata를 환경설정에 맞춰 보냄
    }

    handleClickOpen =() =>{
        this.setState({
            open:true
        });
    }

    handleClose = () => {
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            address:'', 
            contact:'', 
            fileName:'',
            open: false
        })
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" className={classes.button} onClick={this.handleClickOpen}>
                    고객 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="주소" type="text" name="address" value={this.state.address} onChange={this.handleValueChange}/><br/>
                        <TextField label="연락처" type="text" name="contact" value={this.state.contact} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.submitButton} variant="contained" onClick={this.handleFormSubmit}>추가</Button>
                        <Button className={classes.submitButton} variant="outlined" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);