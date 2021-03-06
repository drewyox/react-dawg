import React from 'react';
import PropTypes from 'prop-types';
import WrongGuess from './WrongGuess';
import '../Select.scss';

function DogSelect(props){
  let wrongGuess = null;
  if (props.showFail) {
    wrongGuess = <WrongGuess />
  }


    return(
      <div className='background'>
        <div className='Column'>
          <div className='row'>
            <h1 className='textDog'>Dog Select</h1>
            <select className='textDog' id="dogInput">
            {props.dogList.map((dogs) =>
              <option value={dogs}>{dogs}</option>
            )}
            </select>
            <button className='textDog' type='button' onClick={() => {
              let dogGuess = document.getElementById('dogInput');
              let dogCompare = dogGuess.options[dogGuess.selectedIndex].value;
              console.log(dogCompare);
              props.compareGuess(dogCompare);
            }}>Choose</button>
          </div>
          {wrongGuess}
        </div>
      </div>
    )
}


DogSelect.propTypes = {
  dogList: PropTypes.array,
  compareGuess: PropTypes.func,
  showFail: PropTypes.bool
}

export default DogSelect

// onClick=({props.onChoice(dogChoice)})
