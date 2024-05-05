export function getMessageSentTime(sentTime: string) {
  try {
    if (!sentTime) {
      throw new Error('Sent time cannot be null or empty');
    }

    const date = new Date(sentTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = (parseInt(hours) < 12) ? 'AM' : 'PM';
    const formattedHours = (parseInt(hours) === 12) ? '12' : (parseInt(hours) < 12 ? hours : (parseInt(hours) - 12).toString());

    const timeString = `${formattedHours}:${minutes} ${period}`;

    return timeString;
  } catch (error) {
    console.error('Error formatting sent time:', error);
    return '';
  }
}