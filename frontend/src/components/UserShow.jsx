import React from 'react'
import axios from 'axios'

import Feedback from './Feedback'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import UserShowCard from './UserShowCard'

export default class UserShow extends React.PureComponent{
    state = {
        showId: 0,
        showTitle: '',
        showImage: '',
        showGenreId: 0,
        showGenre: '',
        targetUserId: 0,
        targetUsername: '',
        showComments: [],
        comment: '',
        networkErr: null
    }

    getShowInfo = async (showId, userId) => {
        try {
            const promises = []
            promises.push(axios.get(`/api/shows/show/${showId}/${userId}`))
            promises.push(axios.get(`/api/comments/show/${showId}`))

            const [ showData, commentsData ] = await Promise.all(promises)
            const show = showData.data.payload
            const comments = commentsData.data.payload

            this.setState({
                showId: show.show_id,
                showTitle: show.title,
                showImage: show.img_url,
                showGenreId: show.genre_id,
                showGenre: show.genre,
                targetUserId: show.user_id,
                targetUsername: show.username,
                showComments: comments,
            })
        } catch (err) {
            this.setState({ networkErr: err })
        }
    }

    componentDidMount() {
        const showId = (this.props.match.url).split('/')[2]
        const userId = (this.props.match.url).split('/')[4]
        this.getShowInfo(showId, userId)
    }

    handleFormSubmit = async (event) => {
        event.preventDefault()

        if (this.props.loggedUser && this.state.comment && this.state.showId) {
            const requestBody = { 
                comment_body: this.state.comment, 
                // user_id: localStorage.getItem('#TV#$how@Watch&List#_UID'), 
                user_id: this.props.loggedUser.id, 
                show_id: this.state.showId
            }

            try {
                await axios.post('/api/comments', requestBody)
                this.setState({comment: ''})
                this.getShowInfo(this.state.showId, this.state.targetUserId)

            } catch (err) {
                this.setState({ networkErr: err })
            }
        }
    }

    handleInput = event => {
        this.setState({ comment: event.target.value})
    }

    hideFeedbackDiv = () => {
        this.setState({networkErr: null})
    }

    render() {
        if (this.state.networkErr) {
            return < Feedback err={this.state.networkErr} hideFeedbackDiv={this.hideFeedbackDiv}/>
        }

        return(
            <div className='container'>
                <div className='container'>
                    <UserShowCard 
                        showId={this.state.showId}
                        title={this.state.showTitle}
                        imageUrl={this.state.showImage}
                        userId={this.state.targetUserId}
                        username={this.state.targetUsername}
                        genreId={this.state.showGenreId}
                        genre={this.state.showGenre}
                        commentsCount={this.state.showComments.length}
                    />
                </div>

                <div className='w-75 mx-auto mx-5'>
                    <CommentForm 
                        handleFormSubmit={this.handleFormSubmit}
                        handleInput={this.handleInput}
                        inputValue={this.state.comment}
                    />
                    {this.state.showComments.map(comment => 
                        <CommentCard 
                            key={comment.targetUsername+comment.title+comment.comment_body}
                            userId={comment.user_id}
                            username={comment.username}
                            avatarUrl={comment.avatar_url}
                            comment={comment.comment_body}
                        />
                    )}
                </div>
            </div>
        )
    }
}