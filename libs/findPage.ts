import fs from 'fs';
import path from 'path';
import { NextPage } from 'next';
import { Data } from '@/components/viettrung-card';

type Index = {
  page: number;
  start: string;
  end: string;
};

type Page = {
  page: number;
}

let idxs: Index[] = [];

const collator = new Intl.Collator('vi', { sensitivity: 'base' });

const trim = (s: string): string => s.trim();

const min = (a: number, b: number): number => (a < b ? a : b);


const less = (a: string, b: string): boolean =>
  collator.compare(a.replaceAll('-', ' '), b.replaceAll('-', ' ')) < 0;

const equal = (a: string, b: string): boolean =>
  collator.compare(a.replaceAll('-', ' '), b.replaceAll('-', ' ')) === 0;

const myLess = (a: string, b: string): boolean => {
  const s1 = a.split(' ');
  const s2 = b.split(' ');
  const minLength = Math.min(s1.length, s2.length);

  for (let i = 0; i < minLength; i++) {
    if (less(s1[i], s2[i])) return true;
    if (less(s2[i], s1[i])) return false;
  }

  return s1.length < s2.length;
};

const myLesse = (a: string, b: string): boolean => {
  a = a.replaceAll('-', ' ');
  b = b.replaceAll('-', ' ');
  return myLess(a, b) || equal(a, b);
};

const find = async (target: string): Promise<Data> => {
  for (const idx of idxs) {
    if (myLesse(idx.start, target) && myLesse(target, idx.end)) {
      return { url: `${process.env.PDF_URL}/${idx.page}.pdf`, title: target};
    }
  }
  return { url: "", title: target };
};

const loadIndexes = async (): Promise<void> => {
  try {
    const filePath = path.join(process.cwd(), 'public/index.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    idxs = lines.map((line) => {
      const [page, start, end] = line.split(',').map(trim);
      return { page: parseInt(page, 10), start, end };
    });

    console.info('Load index.csv success');
  } catch (err) {
    console.error('Error loading index.csv:', err);
  }
};

// 加载数据
loadIndexes();

  
const page = find('can');
console.log(`Page found: ${page}`);

export default find;
