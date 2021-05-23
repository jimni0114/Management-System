import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends React.Component{
    
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

    handleClose = () => {
        this.setState({
            open:false
        })
    }

    deleteCustomer(id){
        ///api/customers/7 : 7번 고객 선택
        const url = '/api/customers/'+id;
        fetch(url, {
            method:'DELETE'
        });
        this.props.stateRefresh();
        //삭제 이후 리프레쉬가 일어나 다시 데이터를 불러와야 함
    }
    render(){
        return(
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={(e)=> {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="secondary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        )
    }
}

export default CustomerDelete;