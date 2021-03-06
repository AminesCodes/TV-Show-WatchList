import React from 'react'

export default function CommentForm (props) {
    const onEnterPress = (event) => {
        if(event.keyCode === 13 && event.shiftKey === false) {
          event.preventDefault();
          props.handleFormSubmit(event);
        }
    }

    return(
        <form className='form w-100' onSubmit={props.handleFormSubmit}>
            <textarea 
                className='form-control mb-2 mr-sm-1'
                name='comment' 
                id='comment'
                maxLength='10000'
                rows='3'
                placeholder='Enter your comment here'
                value={props.inputValue}
                onChange={props.handleInput}
                onKeyDown={onEnterPress}
            />
            <button className='btn btn-primary mb-2 mx-auto'>Submit</button>
        </form>
    )
}