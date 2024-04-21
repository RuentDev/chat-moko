export function getMessageSentTime(sentTime: string) {

  const date = new Date(sentTime);
  // Extract hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  // Determine whether it's AM or PM
  const period = (hours < 12) ? 'AM' : 'PM';
  
  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  }
  
  // Add leading zero if minutes is less than 10
  // if (minutes < 10) {
  //   minutes = 0 + minutes;
  // }
  
  // Construct the time string
  const timeString = hours + ':' + minutes + ' ' + period;
  
  return timeString;
}