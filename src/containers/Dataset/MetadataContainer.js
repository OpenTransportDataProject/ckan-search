import React from 'react';
import {Container} from '../../components/Layout';

const MetadataContainer = (props) => {
  const extras = props.dataset.extras || Array;
  const activity = extras[6] || {};
  const aList = activity.value || '';
  const content = aList.length > 0 ? `${aList.substring(2, aList.length)} ` : aList

  return (
    <div className='box'>
      <Container>
          {content.split("{").map(item =>
            <article className="message is-info">
              <div className="message-header">
                Activity
              </div>
              <div className="message-body">
                {item.substring(0,item.length-3).split(",").map(text =>
                  <p>{text.replace(/"/gi, '')}</p>
                )}
              </div>
            </article>
          )}
      </Container>
  </div>
  )
}

export default MetadataContainer;
