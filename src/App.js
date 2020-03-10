import React from 'react';
import logo from './logo.svg';
import './App.css';
import sector from './sector'
import sortTypes from './sortTypes'
import Porosit from "./Porosit";
import func from "./services/global";

class App extends React.Component {
    state = {
        board: [[0, 2, 3, 0], [2, 2, 1, 0], [0, 0, 0, 0]],
        sortType: 'azaz'
    };

    generatePreferedPoint = (sector, sortType) => {


        let min = 10000
        let pp = {x: 0, y: 0}
        let origin = {}

        console.log("sortType::",sortType)
        switch (sortType) {
            case  "zaaz":

                let firstRowLength = sector.rows[0].places.length;
                origin = {x: firstRowLength, y: 0};

                for (let i = sector.rows.length - 1; i >= 0; i--) {
                    const p = sector.rows[i].places
                    for (let j = p.length - 1; j >= 0; j--) {
                        if (p[j]['placeName'] != null) {
                            let dist = parseFloat(Math.sqrt(((origin.x - j) ** 2) + ((origin.y - i) ** 2)).toFixed(2))
                            if (dist < min) {
                                pp.x = j
                                pp.y = i
                                pp.min = dist
                                min = dist;
                            }
                        }
                    }
                }
                break;
            case  "zaza":

                origin = {x: sector.rows[sector.rows.length - 1].places.length, y: sector.rows.length};

                for (let i = sector.rows.length - 1; i >= 0; i--) {
                    const p = sector.rows[i].places
                    for (let j = p.length - 1; j >= 0; j--) {
                        if (p[j]['placeName'] != null) {
                            let dist = parseFloat(Math.sqrt(((origin.x - j) ** 2) + ((origin.y - i) ** 2)).toFixed(2))
                            if (dist < min) {

                                pp.x = j
                                pp.y = i
                                pp.min = dist
                                min = dist;


                            }
                        }
                    }
                }
                break;
            case  "azaz":

                origin = {x: 0, y: 0};

                for (let i = 0; i < sector.rows.length; i++) {
                    const p = sector.rows[i].places
                    for (let j = 0; j < p.length; j++) {
                        if (p[j]['placeName'] != null) {
                            let dist = parseFloat(Math.sqrt(((origin.x - j) ** 2) + ((origin.y - i) ** 2)).toFixed(2))
                            if (dist < min) {

                                pp.x = j
                                pp.y = i
                                pp.min = dist
                                min = dist;


                            }
                        }
                    }
                }
                break;
            case  "azza":

                origin = {x: 0, y: sector.rows.length};

                for (let i = 0; i < sector.rows.length; i++) {
                    const p = sector.rows[i].places
                    for (let j = 0; j < p.length; j++) {
                        if (p[j]['placeName'] != null) {
                            let dist = parseFloat(Math.sqrt(((origin.x - j) ** 2) + ((origin.y - i) ** 2)).toFixed(2))
                            if (dist < min) {

                                pp.x = j
                                pp.y = i
                                pp.min = dist
                                min = dist;


                            }
                        }
                    }
                }
                break;


            default :

                break;
        }


        return pp;
    }

    getPlacesWithWeight() {

        let minArray = []
        let sectorW = []
        const {sortType} = this.state;
        const primaryCoord = this.generatePreferedPoint(sector, sortType)

        console.log(sortType, primaryCoord)

        sector.rows.map((s, i) => {
            sectorW[i] = []
            let countPlaces = 0
            s.places.map((p, j) => {
                if (p.placeName != null) {
                    let dist = Math.sqrt((primaryCoord.x - j) ** 2 + (primaryCoord.y - i) ** 2).toFixed(2)
                    sectorW[i].push({"x": j, "y": i, weight: parseFloat(dist),name:p.placeName})
                    countPlaces++;
                }


            })
            minArray.push({
                row: i,
                min: func.getMinWeight(sectorW[i]),
                max: func.getMaxWeight(sectorW[i]),
                freePlaces: countPlaces
            })
            //console.log(func.getMinWeight(sectorW[i]))
        })



        return {sectorW,minArray}
    }


    changeSortType = (e) => {

        this.setState({sortType:  e.target.value})
    }

    render() {
        const {sortType} = this.state;
        const primaryCoord = this.generatePreferedPoint(sector, sortType)// kjo eshte per azaz


        const {sectorW,minArray}=this.getPlacesWithWeight()

        console.log("sectorW", sectorW)
        console.log("minArray", minArray)
        return (
            <div>
                <div>
                    <select name="sortType" onChange={this.changeSortType.bind(this)}>
                        <option value={"azaz"}>azaz</option>
                        <option value={"azza"}>azza</option>
                        <option value={"zaaz"}>zaaz</option>
                        <option value={"zaza"}>zaza</option>
                    </select>
                    {JSON.stringify(primaryCoord)}
                </div>
                {sector.rows.map((s, i) => (
                    <div key={i}>
                        {s.places.map((p, j) => (
                            p.placeName != null ?
                                <button key={j} x={j} y={i}
                                        weight={Math.sqrt((primaryCoord.x - j) ** 2 + (primaryCoord.y - i) ** 2).toFixed(2)}>{`${p.placeName} `}</button>
                                : <span key={j}>{`${j < 9 ? "*" : "____"} `}</span>
                        ))}
                    </div>
                ))
                }
                <Porosit minArray={minArray} sectorW={sectorW}/>
            </div>
        );
    }
}


export default App;

