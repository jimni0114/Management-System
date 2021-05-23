import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    hidden: {
        display:'none'
    }
});

class CustomerEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
    }

    handleClickOpen =() =>{
        this.setState({
            open:true
        });
    }

    callApi = async()=>{
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }

    handleClose = () => {
        this.setState({
            open:false
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
    editCustomer(id){
        ///api/customers/7 : 7번 고객 선택
        const url = '/api/customers/'+id;
        fetch(url, {
            method:'Update'
        });
        this.props.stateRefresh();
        //삭제 이후 리프레쉬가 일어나 다시 데이터를 불러와야 함
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>수정</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        수정
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                        <TextField label="이름" type="text" name="userName" value={this.props.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.props.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.props.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.props.job} onChange={this.handleValueChange}/><br/>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=> {this.editCustomer.Customer(this.props.id)}}>수정</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        )
    }
}

export default CustomerEdit;