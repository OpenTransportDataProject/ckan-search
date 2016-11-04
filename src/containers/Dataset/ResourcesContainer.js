import React from 'react';
import Tag from '../../components/Tag';
import {Container} from '../../components/Layout';

const ResourcesContainer = (props) => {
  const resources = props.dataset.resources;

  return (
    <div className='box'>
      <Container>
        <table className='table'>
          <thead>
            <tr>
              <th>Resources</th>
            </tr>
          </thead>
        </table>
      </Container>
      <Container>
          {resources.map(resource =>
            <div className='box'>
              <Tag key={resource.id} color='success'>{resource.format}</Tag>
              <a href={resource.url}>Go to resource</a>
            </div>
          )}
      </Container>
    </div>
  )
}

export default ResourcesContainer;
