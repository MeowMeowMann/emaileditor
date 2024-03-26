import { ReactNode } from 'react';

export interface DataObject {
  id: string;
  content: ReactNode; // Use ReactNode to allow any JSX content
}

export interface Column {
  id: string;
  title: string;
  objectId: string[]; // Array of object IDs
}

export interface Data {
  objects: Record<string, DataObject>;
  columns: Record<string, Column>;
  columnOrder: string[]; // Array of column IDs
}

export const Data: Data = {
  objects: {
    'object-1': { id: 'object-1', content: <div>Heading</div> },
    'object-2': { id: 'object-2', content: <div>Text</div> },
    'object-3': { id: 'object-3', content: <div>Button</div> },
    'object-4': { id: 'object-4', content: <div>Divider</div> },
    'object-5': { id: 'object-5', content: <div>Image</div> },
    'object-6': { id: 'object-6', content: <div>Row</div> },
   
  },
  columns: {
    'col-1': { id: 'col-1', title: 'Drag', objectId: ['object-1', 'object-2', 'object-3', 'object-4', 'object-5'] },
    'col-2': { id: 'col-2', title: 'Drop', objectId: [] }
  },
  columnOrder: ['col-1', 'col-2']
};

export default Data;
