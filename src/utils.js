module.exports.millisToMinutesAndSeconds = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return { minutes, seconds };
}

module.exports.millisToMinutes = milis => this.millisToMinutesAndSeconds(milis).minutes;
