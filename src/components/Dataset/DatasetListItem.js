import React from 'react';

const createMarkup = (html) => {
  let content = '';
  if (html) content = html.length > 120 ? `${html.substring(0, 120)}...` : html
  return { __html: content }
};


const DatasetListItem = (props) => (
  <div className='box' onClick={props.onClick}>
    <article className='media'>
      <div className='media-content'>
        <div className='content'>
          <p>
            <strong>{props.title}</strong>
            <br />
            <span dangerouslySetInnerHTML={createMarkup(props.notes)} />
            {props.node.map(node =>
              <span className="tag is-info">{node.name}</span>
            )
            }
          </p>
        </div>
      </div>
    </article>
  </div>
);

export default DatasetListItem;
