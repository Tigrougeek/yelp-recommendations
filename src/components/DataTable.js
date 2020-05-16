import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class DataTable extends React.Component {
    render() {
        const columnDefs = [
            { headerName: "User", field: "user_id" },
            { headerName: "Restaurant", field: "business_id" }
        ];

        const rowData = [{user_id: this.props.user, business_id: this.props.restaurants}];
        console.log(rowData)
        return (
            <div className="ag-theme-balham" style={ {height: '400px', width: '300px'} }>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default DataTable;
