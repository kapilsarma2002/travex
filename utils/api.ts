import { TripData } from '@/utils/types';

const createURL = (path: string) => {
  return window.location.origin + path;
}

export const createNewEntry = async (data: TripData) => {
  const url = createURL('/api/trip');
  const res = await fetch(new Request(url), {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}

export const updateEntry = async (id: string, experience: string) => {
  const url = createURL(`/api/trip/${id}`);
  const res = await fetch(new Request(url), {
    method: 'PATCH',
    body: JSON.stringify({ experience })
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
}

export const askQuestion = async (question: string) => {
  try {
    const url = createURL('/api/question')
    const res = await fetch(new Request(url), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })

    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid response format from server')
    }
    throw error
  }
}