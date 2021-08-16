import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import "./App.css";
import Stefan from "./images/Stefan.jpg";
import Dani from "./images/Dani.jpg";
import Alex from "./images/Alex.jpg";
import Denisa from "./images/Denisa.jpg";
import LogInPanel from "./LoginPanel/LogInPanel.js";
import ChatBox from "./ChatBox/ChatBox.js";
import ChatList from "./ChatList/ChatList.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LoggedIn : false, 
            user : "",
            contacts : ["Stefan", "Alex", "Dani", "Denisa", "Dorel", "Dragos", "Radu", "Andreea", "Paul", "Dave", "Estebanu Hulio Ricardo Montoia de la Rosa Ramirez", "Robert", "Catalin"],
            filteredContacts : ["Stefan", "Alex", "Dani", "Denisa", "Dorel", "Dragos", "Radu", "Andreea", "Paul", "Dave", "Estebanu Hulio Ricardo Montoia de la Rosa Ramirez", "Robert", "Catalin"],
            profilePictures : {
                "Stefan" : Stefan, 
                "Alex" : Alex,
                "Dani" : Dani, 
                "Denisa" : Denisa
            },
            chatHistory : {
                "Stefan" : [],
                "Alex" : [],
                "Dani" : [], 
                "Denisa" : []
            },
            activeChat : "Denisa"
        }
        this.handleLogIn = this.handleLogIn.bind(this);
        this.changeChat = this.changeChat.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.filterContacts = this.filterContacts.bind(this);
    }

    handleLogIn () {
        this.setState({LoggedIn : !this.state.LoggedIn, user : document.getElementById("usernameInput").value});
    }

    changeChat (contact) {
        console.log(contact, typeof contact, contact.length)
        this.setState({activeChat : contact});
    }

    handleNewMessage(e) {
        e.preventDefault();
        let updatedChatHistory = Object.assign({}, this.state.chatHistory)
        updatedChatHistory[this.state.activeChat].push([this.state.user, document.getElementById("messageInput").value, new Date()]);
        console.log(document.getElementById("messageInput").value);
        document.getElementById("messageInput").value = "";
        console.log(document.getElementById("messageInput").value);
        this.setState({chatHistory : updatedChatHistory});
    }

    filterContacts(e) {
        e.preventDefault();
        let filterText = document.getElementsByClassName("searchChat")[0].value.toLowerCase();
        let newFilteredContacts = [];
        console.log(filterText.value);

        for(let contact of this.state.contacts) {
            if(contact.toLowerCase().includes(filterText))
                newFilteredContacts.push(contact);
        }
        this.setState({filteredContacts : newFilteredContacts});
    }

    render () {
        return (
            <div className = "App">
                <div className = "siteContent">
                    {this.state.LoggedIn &&
                        <div className = "ChatWrapper">
                            <ChatList 
                                    contacts = {this.state.filteredContacts} 
                                    profilePictures = {this.state.profilePictures}  
                                    changeChat = {this.changeChat}
                                    filterContacts = {this.filterContacts}
                             />
                            <ChatBox 
                                    user = {this.state.user}
                                    activeChat = {this.state.activeChat} 
                                    profilePicture = {this.state.profilePictures[this.state.activeChat]} 
                                    chatHistory = {this.state.chatHistory[this.state.activeChat]}
                                    handleNewMessage = {this.handleNewMessage}
                            />
                        </div>
                    }
                    {!this.state.LoggedIn &&
                        <LogInPanel LoggedIn={this.state.LoggedIn} handleLogIn={this.handleLogIn} />
                    }
                </div>
                </div>
        )
    }
}

export default App;
