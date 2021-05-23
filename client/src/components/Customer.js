import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';


class Customer extends React.Component{
    render(){
        return(
            <TableRow className="tableRow">
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src ={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.address}</TableCell>
                <TableCell>{this.props.contact}</TableCell>
                <TableCell>{this.props.createDate.substring(0,10)}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}

export default Customer;