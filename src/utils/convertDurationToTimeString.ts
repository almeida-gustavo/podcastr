export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // padstart eh para que ele tenha sempre dois digitos... 1 vira 01 e 10 continua 10
  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');

  return timeString;
}
