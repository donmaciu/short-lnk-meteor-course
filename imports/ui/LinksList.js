import React from 'react';
import {Links} from './../api/links';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

import {Session} from 'meteor/session';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        }
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}> 
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }

    componentDidMount(){
        this.linksTracker = Tracker.autorun(()=>{
                Meteor.subscribe('links');
                const links = Links.find({
                    visible: Session.get('showVisible')
                }).fetch()
                this.setState({
                    links
                })
        });
    }

    componentWillUnmount(){
        if(this.linksTracker){
            this.linksTracker.stop();
        }
    }

    renderLinksListItems(){
        if(this.state.links.length === 0){
            return (<div className="item">
                        <p className="item__status">No links found</p>
                    </div>);
        } else {
            return this.state.links.map((link) => {
                const shortUrl = Meteor.absoluteUrl(link._id);
                return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
            });
        }
        
    }
}