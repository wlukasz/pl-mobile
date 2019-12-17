import React from 'react'
import { connect } from 'react-redux'
import UserTag from './UserTag'

export const AllUserTags = ({ tags }) => (
  <div>
    {tags ? 
      tags.map(tag => {
        return <UserTag 
          key={tag.tagid} 
          tagid={tag.tagid} 
          property={tag.property} 
          dashTagBarMsg={tag.dash_tag_bar_msg} 
          dashTagBarColor={tag.dash_tag_bar_color}
          allProps={tag}
        />
      })
    : null}
  </div>
)

const mapStateToProps = (state) => {
  return {
    tags: state.tags.tags
  }
}

export default connect(mapStateToProps)(AllUserTags)
