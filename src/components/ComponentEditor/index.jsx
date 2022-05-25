import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class ComponentEditor extends React.Component {
  render() {
    return <CKEditor editor={ClassicEditor} {...this.props} />;
  }
}
