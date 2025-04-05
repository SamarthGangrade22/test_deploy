export async function fetchWorkouts(user) {
  const response = await fetch("http://localhost:3000/api/workouts",{
    headers:{
      'Authorization': `Bearer ${user.token}`
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  const resData = await response.json();
  
  return resData;
}
