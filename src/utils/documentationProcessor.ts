import { Document } from '@/types/documentation';

// Simple TF-IDF implementation
const calculateTFIDF = (term: string, doc: string, allDocs: string[]) => {
  const tf = doc.toLowerCase().split(' ').filter(word => word === term.toLowerCase()).length;
  const docsWithTerm = allDocs.filter(doc => doc.toLowerCase().includes(term.toLowerCase())).length;
  const idf = Math.log(allDocs.length / (docsWithTerm || 1));
  return tf * idf;
};

export const findRelevantDocs = (query: string, docs: Document[]): Document[] => {
  console.log('Processing query:', query);
  
  const terms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  const scores = docs.map(doc => {
    const score = terms.reduce((sum, term) => {
      return sum + calculateTFIDF(term, doc.content, docs.map(d => d.content));
    }, 0);
    return { ...doc, score };
  });

  console.log('Found matches:', scores.filter(doc => doc.score > 0).length);
  
  return scores
    .sort((a, b) => b.score - a.score)
    .filter(doc => doc.score > 0)
    .slice(0, 3);
};

// Mock documentation data - replace with real data later
export const mockDocumentation: Document[] = [
  {
    id: '1',
    title: 'Segment Integration',
    content: 'To integrate Segment, first create an account and obtain your write key. Then initialize the analytics object with your write key.',
    url: 'https://segment.com/docs/getting-started',
    source: 'segment'
  },
  {
    id: '2',
    title: 'mParticle Setup',
    content: 'Setting up mParticle requires creating a workspace and configuring your data inputs. Start by creating an input and getting your API credentials.',
    url: 'https://docs.mparticle.com/setup',
    source: 'mparticle'
  },
  {
    id: '3',
    title: 'Lytics Configuration',
    content: 'Configure Lytics by setting up your data streams and creating a new project. You\'ll need to set up authentication using your API token.',
    url: 'https://docs.lytics.com/config',
    source: 'lytics'
  }
];