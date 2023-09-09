// import React from 'react';

// function ImageComponent(props) {
//   console.log(props.imageURL);
//   return (
//     <div className="image-container">
//       <img src={props.imageURL} alt="My Form" className="img-fluid" />
//     </div>
//   );
// }

// export default ImageComponent;

// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';

// function PDFComponent(props) {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <Document
//         file={props.pdfUrl}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={props.pageNumber} />
//       </Document>
//       <p>
//         Page {props.pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }

// export default PDFComponent;

// import React, { Component } from 'react';
// import { Document } from 'react-pdf';

// class PDFComponent extends Component {
//   render() {
//     console.log(this.props.pdfUrl);
//     return (
//       <Document
//         file={{ url: this.props.pdfUrl }}
//         pageNumber={this.props.pageNumber}
//       />
//     );
//   }
// }

// export default PDFComponent;


// import React from 'react';

import React from 'react';
import "./PDFComp.css"

function PDFComponent(props) {
  console.log(props.pdfUrl);
  const pageNumber= props.pageNumber;
  const pdf = props.pdfUrl+ "#toolbar=0&navpanes=0scrollbar=0&page=" + pageNumber;
  return (
    <>
    <div>
      <iframe class= "no-scroll" id="pdfForm" scrolling='no' src={pdf} loading="eager" width= "100%" height="850px" ></iframe>
    </div>
    </>
  );
}

export default PDFComponent;
