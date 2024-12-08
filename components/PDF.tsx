'use client'

import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { isMobile } from 'react-device-detect';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


type PDFViewProps = {
  url?: string
}


const PDFView: React.FC<PDFViewProps> = ({ url }: PDFViewProps) => {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowInnerWidth, setWindowInnerWidth] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    setWindowInnerWidth(window.innerWidth)
  }, [])

  return (
    <div>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {!isMobile && <Page renderMode="canvas" renderTextLayer={false} width={windowInnerWidth * 0.9} pageNumber={pageNumber} />}
        {isMobile && <Page renderMode="canvas" renderTextLayer={false} scale={0.9} pageNumber={pageNumber} />}
      </Document>
      {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
    </div>
  );
  
}

export default PDFView;