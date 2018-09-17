import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle, faClock)


class Episode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayAll : false,
            moreOrLess : "+",
            completed: this.props.Completed,
            opendesc:0
        };
        this.showMoreorLess = this.showMoreorLess.bind(this);
        this.signup = this.signup.bind(this);
      }

    signup () {

    }
    
    showMoreorLess() {
    
        if(!this.state.displayAll){
            this.setState({displayAll:true});
            this.setState({moreOrLess: "-"});
        }
        else{
            this.setState({displayAll:false});
            this.setState({moreOrLess: "+"});
        }
    }
  render() {
    const {EpisodeNumber, EpisodeDescription,EpisodeTitle,id} = this.props
    let completedIcon, completedColor, completedMessage;
    if (this.state.completed === "0"){
        completedIcon = "times-circle"
        completedColor = "#C41465"
        completedMessage = "No Episode Transcription Yet"
    }else if (this.state.completed === "1"){
        completedIcon = "clock"
        completedColor = "#EEAB00"
        completedMessage = "Transcription in Progress"
    }else{
        completedIcon = "check-circle"
        completedColor = "#2EA300"
        completedMessage = "Episode Transcription Available"
    }
    return (
        <div>
        {(!this.state.displayAll ? 
        
        <div key={`${id}-episode-id`} className='row episode'>
            <div className="col-xs-2">
            <img className='img-thumb img-fluid' src={require('./MBMBaM.jpg')} alt="My Brother, My Brother and Me Logo"></img>
            </div>
            <div className="col-7 col-lg-9">
                <div className="episode-info">
                    <h3 className='row name text-truncate'>{EpisodeTitle}</h3>
                </div>
                <div id="cool-hover" className="row col-12" onClick={this.showMoreorLess}>
                    <FontAwesomeIcon className="hideorshow" icon={this.state.moreOrLess === "+" ? "chevron-down":"chevron-up"} vertical-align="middle"/>
                </div>
            </div>
                <div id={`${id}-completed`} className="completed col-1">
                    <FontAwesomeIcon icon={completedIcon} 
                        color={completedColor} size="2x" vertical-align="middle"/>
                </div>
        </div>
        
        : 

        <div key={`${id}-episode-id`} className='row episode-expanded' >
        <div className="row">

            <div className="col-md-4">
                <img className='img-expanded row center-block' src={require('./MBMBaM_lg.png')} alt="My Brother, My Brother and Me Logo"></img>
                <div id={`${id}-completed`} className="completed-expanded row">
                <FontAwesomeIcon icon={completedIcon} 
                        color={completedColor} size="2x" vertical-align="middle"/>
                <div className="completed-message">{completedMessage}</div>
                <button className={this.state.completed==="0" ? "btn-signup btn-primary":"hidden"} id="sortButton" data-toggle="modal" data-target="#exampleModal">Sign up to fix transcript</button>

                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sign Up</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form action="https://formspree.io/podscriptfyi@gmail.com" method="POST">
                        <div className="form-group">
                            <input type="hidden" name="_subject" id="_subject" value="You have a new message from a client!"/>
                            <input type="text" name="_gotcha" className="hidden" />
                            <div className="col">
                            <label  className="col-sm-2 description">Name: </label>
                            <input type="text" name="name" id="name" placeholder="Your Name" className="form-control"/><br></br>
                            </div>
                            <div className="col">
                            <label  className="col-sm-2 description">Email: </label>
                            <input type="email" name="email" placeholder="Your Email" className="form-control" id="email"/><br></br>
                            </div>
    
                            <div className="col">
                            <label  className="col-sm-5 description">Reason for Contact: </label>
                            <textarea name="message" placeholder="Message" className="form-control" id="reason"rows="5"
                            value = {"I'd like to sign up to help transcribe: Episode "+ {EpisodeNumber}+" of MBMBaM"}>
                                        </textarea><br></br>
                            </div>

                            <button type="submit" className="btn btn-primary" value="Send">Send</button>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            
            </div>
            </div>
                
            <div className="episode-info col-md-7">
                <h3 className='row name-expanded'>{EpisodeTitle}</h3>
                <div className="description row expanded">
                {EpisodeDescription}
                </div>
            </div>
        </div>
        <div id="cool-hover" className="row col-md-12 padding-top" onClick={this.showMoreorLess}>
                    <FontAwesomeIcon className="hideorshow" icon={this.state.moreOrLess === "+" ? "chevron-down":"chevron-up"} vertical-align="middle"/>
        </div>
          
        </div>
        )}</div>
    
    );
  }
}

export default Episode;
