'use client'

import React, { useEffect, useState } from 'react';

import PDF from './PDF'

export type Data = {
  url: string;
  title: string;
}

type ViettrungCardProps = {
  data: Data
}

const ViettrungCard: React.FC<ViettrungCardProps> = ({ data }: ViettrungCardProps) => {

  return (
    <PDF url={data.url} />
  );
  
}

export default ViettrungCard;


