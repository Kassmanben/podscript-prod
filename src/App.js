import React, { Component } from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo';
import './app.css';
import Episode from './Episode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faTimesCircle,faChevronDown,faChevronUp);

const EpisodesQuery = gql`{
  episodes {
  EpisodeNumber
	EpisodeTitle
	EpisodeDescription
  Completed
  id
}
}`
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      oldestFirst: false,
      completedFilter: "All Eps.",
      showFilterBool: true,
      showInfoBool: false,
      showPodcastsBool: false,
      showBioBool: false,
      showContactBool: false,
      showSupportBool:false,
      windowWidth: window.innerWidth,
      showMenuBool: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.sortEpisodes = this.sortEpisodes.bind(this);
    this.filterCompleted = this.filterCompleted.bind(this);
    this.showFilters = this.showFilters.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showPodcasts = this.showPodcasts.bind(this);
    this.showBio = this.showBio.bind(this);
    this.showContact = this.showContact.bind(this);
    this.showSupport = this.showSupport.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }

  sortEpisodes() {
    this.setState({oldestFirst:!this.state.oldestFirst})
    document.getElementById("sortButton").style.backgroundColor=this.state.oldestFirst? "#CA9AFF": "#A67FD1"
  }

  showFilters(){
    this.setState({showFilterBool: !this.state.showFilterBool})
  }
  showInfo(){
    this.setState({showInfoBool: !this.state.showInfoBool})
    this.setState({showPodcastsBool: false})
    this.setState({showBioBool: false})
    this.setState({showContactBool: false})
    this.setState({showSupportBool: false})
  }
  showPodcasts(){
    this.setState({showInfoBool: false})
    this.setState({showPodcastsBool: !this.state.showPodcastBool})
    this.setState({showBioBool: false})
    this.setState({showContactBool: false})
    this.setState({showSupportBool: false})
  }
  
  showBio(){
    this.setState({showInfoBool: false})
    this.setState({showPodcastsBool: false})
    this.setState({showBioBool: !this.state.showBioBool})
    this.setState({showContactBool: false})
    this.setState({showSupportBool: false})
  }

  showContact(){
    this.setState({showInfoBool: false})
    this.setState({showPodcastsBool: false})
    this.setState({showBioBool: false})
    this.setState({showContactBool: !this.state.showContactBool})
    this.setState({showSupportBool: false})
  }

  showSupport(){
    this.setState({showInfoBool: false})
    this.setState({showPodcastsBool: false})
    this.setState({showBioBool: false})
    this.setState({showContactBool: false})
    this.setState({showSupportBool: !this.state.showSupportBool})
  }

  showMenu(){
    this.setState({showMenuBool: !this.state.showMenuBool})
  }

  filterCompleted() {
    if(this.state.completedFilter==="All Eps."){
      this.setState({completedFilter:"Completed Eps."})
      document.getElementById("filterCompletedButton").style.backgroundColor="#BAFF71"
    }else if(this.state.completedFilter==="Completed Eps."){
      this.setState({completedFilter:"Uncompleted Eps."})
      document.getElementById("filterCompletedButton").style.backgroundColor="#FF8B77"
    }else if(this.state.completedFilter==="Uncompleted Eps."){
      this.setState({completedFilter:"In Progress Eps."})
      document.getElementById("filterCompletedButton").style.backgroundColor="#FFEE00"
    }else{
      this.setState({completedFilter:"All Eps."})
      document.getElementById("filterCompletedButton").style.backgroundColor="#CA9AFF"
    }
  }

  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  } 

  
  render() {
    var {data: {loading, episodes}} = this.props
    if(loading){
      return(<div>Loading</div>)
    }
    episodes = this.state.oldestFirst ? Array.from(episodes): Array.from(episodes).reverse()
    return (
      <div className="App">
      <nav className="menu row">
        <div className="menuButton col-sm-12"><a onClick={this.showMenu} >Menu</a></div>
        <div className={this.state.windowWidth > 1000 || this.state.showMenuBool ? "col-sm-12 col-lg-2 menu-item":"col-sm-12 col-lg-2 menu-item hidden"}><a onClick={this.showInfo} >Info</a></div>
        <div className={this.state.windowWidth > 1000 || this.state.showMenuBool ? "col-sm-12 col-lg-2 menu-item":"col-sm-12 col-lg-2 menu-item hidden"}><a onClick={this.showPodcasts} >Podcasts</a></div>
        <div className={this.state.windowWidth > 1000 || this.state.showMenuBool ? "col-sm-12 col-lg-2 menu-item":"col-sm-12 col-lg-2 menu-item hidden"}><a onClick={this.showBio} >Who am I?</a></div>
        <div className={this.state.windowWidth > 1000 || this.state.showMenuBool ? "col-sm-12 col-lg-2 menu-item":"col-sm-12 col-lg-2 menu-item hidden"}><a onClick={this.showContact} >Contact Me</a></div>
        <div className={this.state.windowWidth > 1000 || this.state.showMenuBool ? "col-sm-12 col-lg-2 menu-item":"col-sm-12 col-lg-2 menu-item hidden"}><a onClick={this.showSupport} >Support Project</a></div>
      </nav>
      <div className={this.state.showInfoBool && (this.state.showMenuBool || this.state.windowWidth > 1000) ?"info":"hidden"}>
      <div>
        <h3>Background</h3>
        <div>I have written some code that can transcribe speech to text with about 95% accuracy. This makes it possible to feed in an epsiode of a podcast and get a transcript much faster than typing it out by hand<br/>
          While this is very helpful for the transcription process, there are four main issues that keep this from being perfect:
          <ul>
            <li>Proper nouns are hard to distinguish (i.e. "Shia LaBouef" is transcribed as "Shaila buffs")</li>
            <li>Made up or uncommon words are also tricky ("Crocoswine" is transcribed as "crock of swing")</li>
            <li>Mumbling or 'unorthodox' pronunciations (Unorthodox in terms of what the speech engine is trained on, not as a negative description of someone's accent or voice)</li>
            <li>The software can identify between speakers when they have clearly different voices (it would have an easy time with Kristin Schall and Tom Waits, for example), but when people sound very similar (like the McElroy brothers), it has more difficulty.</li>
          </ul>
        <h4>That's where you come in!</h4> 
          If you pick an episode of a show that you'd like to help fix up, I can send you the software-generated transcript, and you can help clean it up. Once it's ready to go, we can attach it to the episode for everyone to see!</div>
      </div>
      </div>
      <div className={this.state.showPodcastsBool && (this.state.showMenuBool || this.state.windowWidth > 1000)?"podcasts":"hidden"}>
      <div>
        <h3>Podcasts</h3>
        <div>At the moment, I am only working on My Brother, My Brother and Me! The more community members get involved on this project, the more podcasts I can add.</div>
        <h4>Can you provide transcriptions for my podcast?</h4> 
          <div>Absolutely! If you want to reach out to me about providing transcriptions for your podcast, send me a message <a onClick={this.showContact}>from this page</a> and we can talk about the logistics of that!</div>
      </div>
      </div>
      <div className={this.state.showBioBool && (this.state.showMenuBool || this.state.windowWidth > 1000)?"bio":"hidden"}>
      <div>
        <h3>Who am I?</h3>
        <div>Hi! My name is Ben Kassman. I'm a software devloper, based out of Portland, OR! I am really passionate about accessiblity in all things. The code that I use for this project was started while I was working on research with the National Technical Institute for the Deaf in Rochester NY.</div>
          <h5>Social Media</h5>
          <div className="container-fluid">
            <a href="https://www.facebook.com/KassmanBen/" className="fa fa-facebook"><span>Facebook</span></a>
            <a href="https://www.linkedin.com/in/ben-kassman/" className="fa fa-linkedin"><span>LinkedIn</span></a>
            <a href="https://www.instagram.com/benkassman/" className="fa fa-instagram"><span>Instagram</span></a>
            <a href="https://twitter.com/kassman_ben" className="fa fa-twitter"><span>Twitter</span></a>
            <a href="https://github.com/kassmanben" className="fa fa-github"><span>Github</span></a>
          </div>
          <h5>Website: <a href="https://www.kassmanben.com" >kassmanben.com</a></h5>
      </div>
      </div>
      <div className={this.state.showContactBool && (this.state.showMenuBool || this.state.windowWidth > 1000)?"contact":"hidden"}>
      <div>
        <h3>Contact Me</h3>
          <div>Contact Me about providing transcripts for your podcast: <a href="mailto:podscriptfyi@gmail.com">podscriptfyi@gmail.com</a></div>
      </div>
      </div>

      <div className={this.state.showSupportBool && (this.state.showMenuBool || this.state.windowWidth > 1000)?"Support":"hidden"}>
      <div>
        <h3>Support Me</h3>
          <div>There are costs associated with this, from hosting the website to per-minute-transcription costs (roughly 3 cents per minute of audio transcribed, it adds up quickly). I'd like to continue providing this service for free! In terms of transcription, an average hour-long podcast will cost roughly $1.24 to transcribe. Just a little bit a month would really help me to cover these costs and continue to expand to more podcasts in the future! <h3><a href="https://www.patreon.com/podscript">My Patreon Page</a></h3></div>
      </div>
      </div>
        <h1 className="logo text-center">Podscript</h1>
        <h2 className="logo-subtitle">Transcripts for all your favorite podcasts</h2>
      <div className="row" id="sticky">
        <input type="text" className="form-control form-control-lg" id="search" placeholder="Search" value={this.state.title} onChange={this.handleChange}/>
        <div className="filters"> 
        <span className={this.state.showFilterBool ? "hidden":""}>Filters:</span> 
        <input className={this.state.showFilterBool ? "hidden":"btn"} id="sortButton" type="button" onClick={this.sortEpisodes} value={this.state.oldestFirst ? "Oldest First ▲":"Newest First ▼"}  />
        <input className={this.state.showFilterBool ? "hidden":"btn"} id="filterCompletedButton" type="button" onClick={this.filterCompleted} value={this.state.completedFilter} />
        <div id="filterarrow" className="row col-12" onClick={this.showFilters}>
          <FontAwesomeIcon className="hideorshow" icon={this.state.showFilterBool? "chevron-down":"chevron-up"} vertical-align="middle"/>
        </div>
        </div>
      </div>
        {
          episodes.filter(function(episode) {
            if (episode.EpisodeDescription.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1||
            episode.EpisodeTitle.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1) {
              if(this.state.completedFilter==="All Eps."){
                return episode;
              }else if(this.state.completedFilter==="Completed Eps." && episode.Completed === "2"){
                return episode
              }else if(this.state.completedFilter==="Uncompleted Eps."&& episode.Completed === "0"){
                return episode
              }else if(this.state.completedFilter==="In Progress Eps."&& episode.Completed === "1"){
                return episode
              }
            }
        }, this).map(episode =>{
            return(

              <Episode
                key = {`${episode.id}-episode-id`}
                EpisodeDescription = {episode.EpisodeDescription}
                EpisodeTitle = {episode.EpisodeTitle}
                EpisodeNumber = {episode.EpisodeNumber}
                Completed = {episode.Completed}
                id = {episode.id}
                />
            )
          })
        }
      </div>
    );
  }
}

export default graphql(EpisodesQuery)(App);
