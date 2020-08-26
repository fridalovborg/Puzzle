export const identifyEmptyPosition = (currentPosition, positionUp, positionDown, positionLeft, positionRight, board) => {
    // Up
    const checkPosUp = board[positionUp[0]];
    const identifyPosUp = positionUp[1];

    // Down
    const checkPosDown = board[positionDown[0]];
    const identifyPosDown = positionDown[1];

    // Left & Right
    const checkLeftRight = board[currentPosition[0]];
    const identifyPosLeft = positionLeft[1];
    const identifyPosRight = positionRight[1];

    // Check if the empty tile is at top, bottom, left and right positions
    if ( checkPosUp && checkPosUp.includes(0) ) {
        if ( checkPosUp[identifyPosUp] === 0 ) {
            return [checkPosUp, identifyPosUp];
        }
    } else if ( checkPosDown && checkPosDown.includes(0) ) {
        if ( checkPosDown[identifyPosDown] === 0 ) {
            return [checkPosDown, identifyPosDown];
        }
    } else if ( checkLeftRight && checkLeftRight.includes(0)) {
        if ( checkLeftRight[identifyPosLeft] === 0 ) {
            return [checkLeftRight, identifyPosLeft];
        } else if ( checkLeftRight[identifyPosRight] === 0 ) {
            return [checkLeftRight, identifyPosRight];
        }
    }

    return [];
}
