import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import DogPic from './components/DogPic';
import DogSelect from './components/DogSelect';
import Score from './components/Score';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      picture: '',
      list: [],
      breed: '',
      score: 0,
      showFail: false

    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.compareGuess = this.compareGuess.bind(this);
  }

  componentWillMount(){
    this.getNewPicture();
    fetch('https://dog.ceo/api/breeds/list/all').then(response => response.json()).then(
      (json) => {
        let test = json.message;
        let dropDownArr = [];
        Object.keys(test).forEach((element) => {
        if(test[element].length > 0) {
          let dogSub = test[element];
          dogSub.forEach(function(element2) {
            let join = element + " " + element2;
            dropDownArr.push(join);
        }); }
        else {
          dropDownArr.push(element);
          }
        });
        this.setState({list: dropDownArr});
      }
    )
  }

  getNewPicture(){
    let url = 'https://dog.ceo/api/breeds/image/random';
    fetch(url).then(response => response.json()).then(
      (json) => {
        this.setState({picture: json.message})
        let picString = json.message;
        let breaked = picString.split('/');
        let dogTest = breaked[4].replace('-', ' ');

        this.setState({breed: dogTest})
        this.setState({showFail: false})
      }
    )
  };


  compareGuess(yourGuess){
    if(yourGuess === this.state.breed){
      console.log('You did it bud')
      let scoreAdd = this.state.score + 1;
      this.getNewPicture();
      this.setState({score: scoreAdd})


    } else {
      console.log('Oh no, you don\'t know dogs')
      this.setState({showFail: true})

    }
  }




  render(){
    return (
      <div id='container' className="App">
        <DogPic className='dogShot' dogPicture = {this.state.picture}/>
        <Score score = {this.state.score}/>
        <DogSelect dogList = {this.state.list} compareGuess = {this.compareGuess} showFail={this.state.showFail}/>
        
      </div>
    );
  }
}


export default App;
