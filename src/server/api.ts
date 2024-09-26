export const submitEntry = async (data: any) => {
    const response = await fetch('https://json-server.typicode.com/typicode/demo/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };
  