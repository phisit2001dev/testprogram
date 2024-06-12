import React, { useState, useEffect } from 'react'
import axios from 'axios';  
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function Table() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/user').then(res => {
            setRecords(res.data);
        });
    }, []);

const switch_Gender = (gender) => {
  switch (gender){
    case 'M':
        return 'Male';
    case 'F':
        return 'Female';
    case 'U':
        return 'Unknow';
  }
};
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <table style={{ padding: '2px', border: '5px solid #3949ab ', textAlign: 'center',background:"#5677fc" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th></th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <Link to={`/editform/${d.id}`}><EditIcon /></Link>
                            <td>{d.firstname}</td>
                            <td>{d.lastname}</td>
                            <Tooltip title={switch_Gender(d.gender)} arrow>
                                 <span>{d.gender}</span>
                            </Tooltip>
                            <td>{parseFloat(d.score).toFixed(2)}</td>
                            
                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    )
}

export default Table	