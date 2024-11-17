import React from 'react'

function Index() {
  console.log(8)

 // Generate an array of times starting from 1:00
function generateTimesArray(): string[] {
  const times: string[] = [];
  const startHour = 1; // Start from 1 AM
  const endHour = 23;  // End at 11 PM
  const intervalMinutes = 60; // Hourly intervals

  for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
          const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          times.push(formattedTime);
      }
  }
  return times;
}

const timeToHours = (dateValue: string): number => {
  const date = new Date(dateValue); // Parse the date string
  const hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC
  return hours + minutes / 60; // Convert to fractional hours
};


// Generate an array of ratings (random values from 1 to 5)
function generateRatingsArray(size: number): number[] {
  const ratings: number[] = [];
  for (let i = 0; i < size; i++) {
      const randomRating = Math.floor(Math.random() * 5) + 1; // Random integer between 1 and 5
      ratings.push(randomRating);
  }
  return ratings;
}

// Generate times and ratings arrays
// const timesArray = generateTimesArray();
// const ratingsArray = generateRatingsArray(timesArray.length);

// const timesArray = ["01:00", "01:00", "01:00", "01:00", "01:00", "01:00", "01:00", "01:00",
//   "06:00", "06:00", "06:00", "06:00", "06:00", "06:00", "06:00", "07:00"
// ];
// const ratingsArray = [1, 1, 2, 1, 2, 2, 1, 1,
//   4, 4, 5, 5, 5, 4, 5, 4
// ];

const timesArray = [
  "2024-11-17T01:00:00.000Z", // 1:00 AM UTC
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T01:00:00.000Z",
  "2024-11-17T06:00:00.000Z", // 6:00 AM UTC
  "2024-11-17T06:00:00.000Z",
  "2024-11-17T06:00:00.000Z",
  "2024-11-17T06:00:00.000Z",
  "2024-11-17T06:00:00.000Z",
  "2024-11-17T07:00:00.000Z", // 7:00 AM UTC (latest time)
];
const ratingsArray = [1, 1, 2, 2, 2, 1, 2, 4, 5, 5, 4, 4, 4];

// Combine times and ratings into a single array of objects
const combinedData = timesArray.map((time, index) => ({
  time,
  rating: ratingsArray[index],
}));

// Display the generated data
console.log("Times Array:", timesArray);
console.log("Ratings Array:", ratingsArray);
console.log("Combined Data:", combinedData);

// function algorithmWeight(): number {
//   let weightedSum = 0;
//   let scalingSum = 0;

//   let initDate = new Date().toISOString();
//   console.log(initDate);
//   const timeToHours = (time: string): number => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours + (minutes / 60);
//   };

//   const latestTime = timeToHours(timesArray[timesArray.length - 1]);

//   for (let i = 0; i < timesArray.length; i++) {
//     const time = timeToHours(timesArray[i]);
//     const rating = ratingsArray[i];

//     const scalingFactor = Math.pow(2, time - latestTime); // Factor based on time difference
//     weightedSum += scalingFactor * rating; // Accumulate weighted ratings
//     scalingSum += scalingFactor; // Accumulate scaling factors
//   }

//   return weightedSum / scalingSum; // Normalize by the sum of scaling factors
// }

function algorithmWeight(): number {
  let weightedSum = 0;
  let scalingSum = 0;

  const latestTime = timeToHours(timesArray[timesArray.length - 1]);

  for (let i = 0; i < timesArray.length; i++) {
    const time = timeToHours(timesArray[i]);
    const rating = ratingsArray[i];

    const scalingFactor = Math.pow(2, time - latestTime);
    weightedSum += scalingFactor * rating;
    scalingSum += scalingFactor;
  }
  
  const avgWeight = weightedSum / scalingSum;
  return parseFloat(avgWeight.toFixed(1)); // Round to 1 decimal place
}



const yashBaruah = algorithmWeight();

console.log("Average Weight: ", yashBaruah);



  return (
    <div></div>
  )
}

export default Index