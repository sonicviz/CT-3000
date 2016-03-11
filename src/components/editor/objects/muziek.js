import React from 'react';
import { BaseObject } from './_baseObject';

class Muziek extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(!this.props.main) {
      return;
    }

    this.streams =  {
      pop: 'http://icecast.omroep.nl/3fm-sb-mp3',
      easy: 'http://8573.live.streamtheworld.com:80/SKYRADIO_SC',
      classical: 'http://icecast.omroep.nl/radio4-bb-mp3',
      jazz: 'http://icecast.omroep.nl/radio6-bb-mp3'
    };


    this.audio = new Audio();
  }

  componentDidUpdate(){
    if(!this.props.main) {
      return;
    }

    if(this.props.data.object.state === this.prevState) {
      return;
    }
    this.prevState = this.props.data.object.state;

    console.log('paused',this.audio.paused);

    switch(this.props.data.object.state){
      case 'uit':
        if (!this.audio.paused) this.audio.pause();
        break;
      case '3fm':
        this.playStream(this.streams.pop);
        break;
      case 'sky':
        this.playStream(this.streams.easy);
        break;
      case 'klassiek':
        this.playStream(this.streams.classical);
        break;
      case 'jazz':
        this.playStream(this.streams.jazz);
        break;
    }
  }

  playStream (stream) {
    this.audio.src = stream;
    this.audio.play();
  }

  render() {
    return <div className="icon">
      <div className="off"></div>
      <div className="on"></div>
    </div>;
  }
}

export default BaseObject(Muziek, 'muziek');
