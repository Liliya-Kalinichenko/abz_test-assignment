import { RandomObject } from '../types';
import { client } from './fetchClient';

export const getBlocks = () => {
  return client.get<RandomObject[]>(`/objects`);
};

export const addBlock = ({ name, data }: Omit <RandomObject, 'id'>) => {
  return client.post<RandomObject>('/objects', { name, data });
};

export const deleteBlock = (blockId: string) => {
  return client.delete(`/objects/${blockId}`);
};

