import React from 'react';

import './App.css';
import sector from "./sector";


class Porosit extends React.Component {
    state = {
        sasia: 0
    };

    submit = () => {
       const {sasia}=this.state;
       const test = this.props.minArray.filter(row => row.freePlaces >= sasia).reduce((row, nextRow) => row.min < nextRow.min ? row : nextRow);
       console.log(sasia, this.props.sectorW[test.row].slice(0, sasia))
    }

    addSasia = (e) => {

        this.setState({sasia: e.target.value})
    }
    render() {


        return (
            <div>

                <input type="number" max={5} min={1} name="sasia" onChange={this.addSasia.bind(this)}/>
                <button value="Ok" onClick={this.submit.bind(this)}>Ok</button>


            </div>
        );
    }
}


export default Porosit;
