import { TripData } from '@/utils/types';

const createURL = (path: string) => {
  return window.location.origin + path;
}

export const createNewEntry = async (data: TripData) => {
  const url = createURL('/api/trip');
  console.log(url);
  const res = await fetch(new Request(url), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}