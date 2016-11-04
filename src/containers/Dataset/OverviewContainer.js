import React from 'react';
import {Container} from '../../components/Layout';

const OverviewContainer = (props) => {
  const organization = props.dataset.organization || {};
  const extras = props.dataset.extras || Array;
  const issued = extras[0] || {};
  const modified = extras[1] || {};
  const email = extras[2] || {};
  const pub_name = extras[3] || {};
  const guid = extras[4] || {};
  const language = extras[5] || {};
  const metadata_created = props.dataset.metadata_created || '';
  const created = metadata_created=='' ? 'Unknown': `${metadata_created.substring(0,16)}`
  const metadata_modified = props.dataset.metadata_modified || '';
  const m_modified = metadata_modified=='' ? 'Unknown': `${metadata_modified.substring(0,16)}`
  const uk = 'Unknown';

  return (
    <div className='box'>
      <Container>
        <table className="table table is-striped">
          <thead>
            <tr>
              <th>Overview</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Title</td>
              <td>{props.dataset.title=='' ? uk: props.dataset.title}</td>
            </tr>
            <tr>
              <td></td>
              <td>State</td>
              <td>{props.dataset.state==null ? uk: props.dataset.state}</td>
            </tr>
            <tr>
              <td></td>
              <td>Source</td>
              <td>{props.dataset.url==null ? uk: props.dataset.url}</td>
            </tr>
            <tr>
              <td></td>
              <td>Publisher</td>
              <td>{pub_name.value=='' ? uk: pub_name.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>Publisher e-mail</td>
              <td>{email.value=='' ? uk: email.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>Issued</td>
              <td>{issued.value=='' ? uk: issued.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>Modified</td>
              <td>{modified.value=='' ? uk: modified.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>Language</td>
              <td>{language.value=='' ? uk: language.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>GUID</td>
              <td>{guid.value=='' ? uk: guid.value}</td>
            </tr>
            <tr>
              <td></td>
              <td>License</td>
              <td>{props.dataset.license_title==null ? uk: props.dataset.license_title}</td>
            </tr>
            <tr>
              <td></td>
              <td>CKAN Organization</td>
              <td>{organization.title}</td>
            </tr>
            <tr>
              <td></td>
              <td>Organization description</td>
              <td>{organization.description}</td>
            </tr>
            <tr>
              <td></td>
              <td>Created in CKAN</td>
              <td>{created}</td>
            </tr>
            <tr>
              <td></td>
              <td>Last update CKAN</td>
              <td>{m_modified}</td>
            </tr>
          </tbody>
        </table>
      </Container>
  </div>)
}

export default OverviewContainer;
