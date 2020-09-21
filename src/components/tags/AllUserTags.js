import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import UserTag from './UserTag'

export const AllUserTags = ({ tags }) => (
  <div>
    {tags && Object.keys(tags).length > 0 ? 
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
    :  
      <div className="content-container">
        <h2>Searching for your tenancies...</h2>
      </div>
    }
  </div>
)

const mapStateToProps = (state) => {
  return {
    tags: state.tags.tags
  }
}

export default connect(mapStateToProps)(AllUserTags)
