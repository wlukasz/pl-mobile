import React from 'react'
import { connect } from 'react-redux'
import UserTag from './UserTag'

export const AllUserTags = ({ tags }) => {

    return (
      <div>
        {tags.map((tag) => {
          return <UserTag 
            key={tag.tagid} 
            property={tag.property} 
            dashTagBarMsg={tag.dash_tag_bar_msg} 
            dashTagBarColor={tag.dash_tag_bar_color}
          />
      })}
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags.tags
  }
}

export default connect(mapStateToProps)(AllUserTags)
