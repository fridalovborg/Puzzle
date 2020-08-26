import React, { Component } from 'react';
import shuffle from "lodash.shuffle"; // Shuffle by Lodash, a utility library (https://lodash.com/)
import classnames from "classnames"; // Classnames by npm (https://www.npmjs.com/package/classnames), utility for joining classnames together
import { identifyEmptyPosition } from "./identifyEmptyPosition";

const rows = 4;
const columns = 4;
const total = columns * rows;

class Puzzle extends Component {
    constructor(props) {
        super(props);

        // Shuffle the numbers from start
        const items = shuffle([...Array(total).keys()]);

        let initialTiles = [...Array(rows).keys()];

        // Create array of rows and each rows columns
        // For each of the 4 rows create one of each four columns
        for (let i = 0; i < rows; i++) {
            initialTiles[i] = [];

            for (let j = 0; j < columns; j++) {
                initialTiles[i].push(
                    items.pop() // Removes the last item and att that to the array
                );
            }
        }

        this.state = {
            board: initialTiles,
            win: false
        };
    }

    // Shuffle tiles when pressing the shuffle button
    shuffleNumbers = (shuffleTiles) => {
        const newBoard = shuffle(shuffleTiles);
        this.setState({ board: newBoard });
    }

    // If player wants to play again, state win sets to false
    playAgain = (board) => {
        this.setState({ win: false });
        this.shuffleNumbers(board);
    }

    // Identify a tiles position
    identifyPosition = (tile, rows, board) => {
        const x = board.indexOf(rows);
        const y = rows.indexOf(tile);
        const currentPosition = [x, y];

        // Identify closeby tiles
        const positionUp = this.checkPositionUp(x, y);
        const positionDown = this.checkPositionDown(x, y);
        const positionLeft = this.checkPositionLeft(x, y);
        const positionRight = this.checkPositionRight(x, y);
        
        // Check if the close by tiles are the empty tile
        const [row, position] = identifyEmptyPosition(currentPosition, positionUp, positionDown, positionLeft, positionRight, board);

        // Update the tile position is it is close by the empty tile
        if (row) {
            this.updateTilePosition(row, position, currentPosition, board);
        } 
    }

    checkPositionUp = (x, y) => {
        x--;
        const positionUp = [x, y];
        return positionUp;
    }

    checkPositionDown = (x, y) => {
        x++;
        const positionDown = [x, y];
        return positionDown;
    }

    checkPositionLeft = (x, y) => {
        y--;
        const positionLeft = [x, y];
        return positionLeft;
    }

    checkPositionRight = (x, y) => {
        y++;
        const positionRight = [x, y];
        return positionRight;
    }

    // Move tile to it's new position
    updateTilePosition = (row, position, currentPosition, board) => {
        const index = board[currentPosition[0]][currentPosition[1]];
        row[position] = index;
        board[currentPosition[0]][currentPosition[1]] = 0;
        this.setState({ board: board });

        // Check if win game
        this.winGame(board);
    }

    winGame = (board) => {
        const arr = [];
        const currentArray = arr.concat(board[0], board[1], board[2], board[3]);

        // Create winning array
        var newArr = [...Array(16).keys()];
        const winningArray = newArr.sort(function(a, b){return a - b});
        winningArray.push(winningArray.splice(winningArray.indexOf(0), 1)[0]);

        // Compare current array with winning array
        if ( JSON.stringify(currentArray) === JSON.stringify(winningArray) ) {
            console.log('WIN!');
            this.setState({ win: true });
        }
    }

    render() {
        let { board, win } = this.state;

        // Hide winning overlay until the player wins
        const styleWin = win ? {display: 'block'} : {display: 'none'};

        return (
            <div className="puzzle">
                <h1 className="puzzle__title">15 Puzzle</h1>
                <div className="puzzle__board">
                    {
                        board.map(( rows ) => {
                            return (
                                <div key={rows} className="puzzle__rows">
                                {
                                    // Show all columns in each row
                                    rows.map((tile) => {
                                        return (
                                            <div key={tile} className={classnames(
                                                'puzzle__tile',
                                                {'puzzle__tile--empty' : !tile}
                                            )} onClick={() => this.identifyPosition(tile, rows, board)}>
                                                <div className="puzzle__tile--number">
                                                    { tile ? tile : '' }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    }
                    <button
                    className="puzzle__shuffle"
                    onClick={() => this.shuffleNumbers(board)}
                    >Shuffle</button>
                </div>

                <div className="puzzle__overlay" style={styleWin}>
                    <div className="puzzle__win">
                        <h2>You win!</h2>

                        <button
                        className="puzzle__shuffle"
                        onClick={() => this.playAgain(board)}
                        >Play again?</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Puzzle;