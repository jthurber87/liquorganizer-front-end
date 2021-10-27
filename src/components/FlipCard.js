import React from 'react';
import ReactCardFlip from 'react-card-flip';
import { Link } from 'react-router-dom';
class FlipCard extends React.Component {
  constructor() {
    super();
      this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  };

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <div className="flipCard" onClick={this.handleClick}>
            <img src={this.props.item.img} /><br/>
            <div className="bot_item">
              <Link to={`/bottles/${this.props.item._id}/edit`}>{this.props.item.brand}</Link>
            </div>
          </div>
          <div className="flipCard" onClick={this.handleClick}>
            <h3><strong>{this.props.item.spirit}</strong></h3>
            <h4>Notes:</h4>
            <h6><i>{this.props.item.notes}</i></h6>
          </div>
      </ReactCardFlip>
    )
  }
};

export default FlipCard;
