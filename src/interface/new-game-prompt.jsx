import React from "react";

export default class NewGamePrompt extends React.Component {
  constructor(props) { // expects render (bool), game (Game object) and onClose (handler function)
    super(props);
    this.state = ({
      input_value: ""
    });
    this.onValueChange = this.onValueChange.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }
  onValueChange(event) {
    this.setState({
      input_value: event.target.value
    })
  }
  keyDown() {
    if (event.key == "Enter" && !event.shiftKey) {
      if (this.state.input_value == "") {
        this.props.onClose("NewGamePrompt");
        return;
      }
      let seed = parseInt(this.state.input_value);
      if (isNaN(seed) || seed == Infinity) {
        console.log("Not a valid number");
        return;
      }
      this.props.game.newGame(seed);
      this.props.onClose("NewGamePrompt");
      console.log("valid number");
    }
    if (event.key == "Escape") {
      this.props.onClose(); // this doesnt seem right, will test it out later
    }
  }
  render(){
    if (this.props.render) {
      return (
        <div id="new_game_prompt" className="new_game_prompt">
          <div>Set the seed</div>
          <input type="text" id="seed" className="input_standard" onChange={this.onValueChange} onKeyDown={this.keyDown} autoFocus wrap="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" autoComplete="off"/>
        </div>
      )
    } else return null;
  }
}