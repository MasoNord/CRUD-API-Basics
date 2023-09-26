export function parseHobbiesArray(hobbies: string[]): string {
  if (typeof hobbies === 'string') return hobbies;
  let result: string = '';

  hobbies.forEach((h, i) => {
    if (i === hobbies.length - 1) result += `${h}`;
    else {
      result += `${h}, `;
    }
  });

  return result;
}
